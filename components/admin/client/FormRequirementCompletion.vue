<template>
  <div>
    <div
      v-if="
        !requirement.payments ||
        !requirement.agreed_negotiation ||
        paidAmount < requirement.agreed_negotiation.last_agreed_price
      "
      class="p-8 bg-yellow-100 rounded-lg h-20 flex item-center"
    >
      {{ $t('client_payment.message.payment_is_not_completed') }}
    </div>
    <div
      v-else-if="!editable"
      class="p-8 bg-green-100 rounded-lg h-20 flex item-center"
    >
      This requirement is already closed.
    </div>
    <div v-else class="p-8 bg-gray-100 rounded-lg">
      <h1 class="text-3xl mb-2">{{ $t('common.summary') }}</h1>
      <div class="text-base">
        <div class="grid grid-cols-1 md:grid-cols-4">
          <text-block
            :label="$t('client.model.name')"
            :description="requirement.client.contact.name"
          />
          <text-block
            :label="$t('contact_person.model.owner')"
            :description="requirement.property.owner_contact.name"
          />
          <text-block
            :label="$t('property.label')"
            :description="requirement.property.code"
          />
          <text-block
            :label="$t('common.price')"
            :description="
              formatMoney(requirement.agreed_negotiation.last_agreed_price)
            "
          />
        </div>
        <div class="mx-auto">
          <div class="mt-8 mb-4 flex items-center">
            <checkbox
              id="agreed"
              v-model="agreed"
              name="agreed"
              :binary="true"
            />
            <label class="ml-2" for="agreed">
              By clicking on button transfer, you agree to update property
              {{ requirement.property.code }} owner from
              {{ requirement.client.contact.name }} to
              {{ requirement.property.owner_contact.name }}. Do you want to
              proceed?
            </label>
          </div>
          <pv-button
            :label="$t('common.transfer')"
            :disabled="!agreed"
            :icon="saving ? 'pi pi-spin pi-spinner' : undefined"
            class="p-button-lg p-button-success"
            @click="closeRequirement(requirement)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  ref,
  useContext,
  useFetch
} from '@nuxtjs/composition-api'
import useFormatter from '@/composables/useFormatter'
import { RequirementResult } from '@/enums/RequirementResult'

export default defineComponent({
  props: {
    requirementId: {
      type: String,
      required: true
    }
  },
  setup({ requirementId }) {
    const { $service } = useContext()

    const agreed = ref(false)
    const saving = ref(false)
    const requirement = ref({
      client: {
        contact: {}
      },
      property: {
        owner_contact: {}
      },
      agreed_negotiation: {}
    })

    useFetch(async () => {
      const { data } = await $service.clientRequirement.find(requirementId, {
        relations:
          'property.owner_contact,client.contact,agreedNegotiation,payments'
      })
      requirement.value = data
    })

    const paidAmount = computed(() => {
      if (!requirement.value.payments) {
        return 0
      }

      return requirement.value.payments.reduce(
        (amount, i) => amount + i.amount,
        0
      )
    })

    const { formatMoney } = useFormatter()

    return {
      formatMoney,
      agreed,
      saving,
      requirement,
      paidAmount
    }
  },

  computed: {
    editable() {
      return (
        this.requirement.result === RequirementResult.IN_PROGRESS ||
        this.requirement.result === RequirementResult.PENDING
      )
    }
  },

  methods: {
    async closeRequirement(requirement) {
      try {
        this.saving = true
        const { data } = await this.$service.clientRequirement.close(
          requirement
        )
        if (data) {
          this.$router.push(
            this.localePath(
              `/admin/clients/${requirement.client_id}/requirements`
            )
          )
        }
      } catch (error) {
        this.showErrorMessage()
        this.saving = false
      }
    },
    showErrorMessage() {
      this.$toast.add({
        severity: 'error',
        summary: this.$t('common.failed'),
        detail: this.$t('message.error_saving'),
        life: 3000
      })
    }
  }
})
</script>
