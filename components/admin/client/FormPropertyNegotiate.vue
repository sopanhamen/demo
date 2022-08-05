<template>
  <div>
    <div class="text-lg font-bold my-2">
      {{ $t('property_negotiation.title.list') }}
    </div>
    <div v-if="!hasVisitedProperty" class="p-10 bg-yellow-100">
      {{ $t('property_negotiation.message.no_visited') }}
    </div>
    <table v-else class="table-auto w-full">
      <thead>
        <tr>
          <th>{{ $t('property_negotiation.model.code') }}</th>
          <th>
            {{ $t('property_negotiation.model.negotiated_at') }}
          </th>
          <th>
            {{ $t('property_negotiation.model.assignee') }}
          </th>
          <th>
            {{ $t('property_negotiation.model.last_owner_price') }}
          </th>
          <th>
            {{ $t('property_negotiation.model.last_buyer_price') }}
          </th>
          <th>
            {{ $t('property_negotiation.model.last_agreed_price') }}
          </th>
          <th>
            {{ $t('property_negotiation.model.status') }}
          </th>
          <th>
            {{ $t('property_negotiation.model.note') }}
          </th>
          <th>{{ $t('common.action') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="negotiation in requirement.negotiations"
          :key="negotiation.id"
        >
          <td>{{ negotiation.property.code }}</td>
          <td>{{ formatDateTime(negotiation.negotiated_at) }}</td>
          <td>{{ negotiation.assignee.name }}</td>
          <td>
            {{
              negotiation.last_buyer_price
                ? formatMoney(negotiation.last_owner_price)
                : ''
            }}
          </td>
          <td>
            {{
              negotiation.last_buyer_price
                ? formatMoney(negotiation.last_buyer_price)
                : ''
            }}
          </td>
          <td>
            <form-field-input
              v-show="editable && !hasAgreedStatus"
              v-model="negotiation.last_agreed_price"
              type="number"
            />
            <span v-show="!editable || hasAgreedStatus">
              {{
                negotiation.last_agreed_price
                  ? formatMoney(negotiation.last_agreed_price)
                  : ''
              }}
            </span>
          </td>
          <td>
            <form-field-select
              v-show="editable && !hasAgreedStatus"
              :key="negotiation.id"
              v-model="negotiation.status"
              :options="negotiationStatus"
              :show-clear="false"
              :disabled="negotiation.last_agreed_price <= 0"
              option-label="label"
              option-value="value"
              @change="saveNegotiation(negotiation)"
            />
            <span
              v-show="!editable || hasAgreedStatus"
              :class="{
                'text-green-500 font-bold':
                  negotiation.status === NegotiationStatus.AGREED
              }"
            >
              {{ negotiationStatusLabel(negotiation.status) }}
            </span>
          </td>
          <td>{{ negotiation.note }}</td>
          <td>
            <!-- <pv-button
              v-if="negotiation.status === NegotiationStatus.AGREED && editable"
              :label="$t('common.cancel')"
              icon="pi pi-trash"
              class="p-button-danger"
            />
            <pv-button
              v-else-if="editable"
              :label="$t('common.save')"
              icon="pi pi-save"
              disabled
            /> -->
          </td>
        </tr>
        <tr v-if="!hasAgreedStatus && editable">
          <td>
            <form-field-select
              v-model="selectedProperty"
              :options="visitedProperties"
              :errors="v$.selectedProperty && v$.selectedProperty.$errors"
              :show-clear="false"
              option-label="code"
              @change="handlePropertyChanged"
            />
          </td>
          <td>
            <form-field-datepicker
              v-model="date"
              :show-time="true"
              :errors="v$.date && v$.date.$errors"
            />
          </td>
          <td>
            <form-field-select
              v-model="assignee"
              :options="users"
              :errors="v$.assignee && v$.assignee.$errors"
              :placeholder="$t('common.select') + '...'"
              :filter="true"
              :show-clear="false"
              option-label="name"
              @filter="searchUser($event)"
            />
          </td>
          <td>
            <form-field-input
              v-model="lastOwnerPrice"
              type="number"
              :placeholder="
                $t('property_negotiation.model.last_owner_price') + '...'
              "
              :errors="v$.lastOwnerPrice && v$.lastOwnerPrice.$errors"
            />
          </td>
          <td>
            <form-field-input
              v-model="lastBuyerPrice"
              type="number"
              :placeholder="
                $t('property_negotiation.model.last_buyer_price') + '...'
              "
              :errors="v$.lastBuyerPrice && v$.lastBuyerPrice.$errors"
            />
          </td>
          <td>
            <form-field-input
              v-model="lastAgreedPrice"
              type="number"
              :placeholder="
                $t('property_negotiation.model.last_agreed_price') + '...'
              "
              :errors="v$.lastAgreedPrice && v$.lastAgreedPrice.$errors"
            />
          </td>
          <td>
            <form-field-select
              v-model="status"
              :options="negotiationStatus"
              :show-clear="false"
              :errors="v$.negotiationStatus && v$.negotiationStatus.$errors"
              option-label="label"
              option-value="value"
            />
          </td>
          <td>
            <form-field-input
              v-model="note"
              :placeholder="$t('property_negotiation.model.note') + '...'"
            />
          </td>
          <td>
            <pv-button
              :label="$t('common.save')"
              icon="pi pi-save"
              @click="storeNegotiation"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { debounce } from 'lodash'
import { useVuelidate } from '@vuelidate/core'
import { required, requiredIf, numeric } from '@vuelidate/validators'
import {
  NegotiationStatus,
  NegotiationStatusLabel
} from '@/enums/NegotiationStatus'
import useProperty from '@/composables/useProperty'
import { VisitStatus } from '@/enums/VisitStatus'
import { RequirementResult } from '@/enums/RequirementResult'
import useFormatter from '@/composables/useFormatter'

export default {
  props: {
    requirement: {
      type: Object,
      default() {
        return {}
      }
    },
    requirementId: {
      type: String,
      required: true
    }
  },

  setup() {
    const { negotiationStatusLabel } = useProperty()
    const { formatMoney, formatDateTime } = useFormatter()

    return {
      formatMoney,
      formatDateTime,
      negotiationStatusLabel,
      v$: useVuelidate()
    }
  },

  validations() {
    return {
      selectedProperty: { required },
      date: { required },
      assignee: { required },
      lastOwnerPrice: { required, numeric },
      lastBuyerPrice: { required, numeric },
      lastAgreedPrice: {
        required: requiredIf(this.status === NegotiationStatus.AGREED),
        numeric
      }
    }
  },

  data() {
    return {
      confirm: false,
      selectedProperty: null,
      date: new Date(),
      assignee: null,
      lastOwnerPrice: null,
      lastBuyerPrice: null,
      lastAgreedPrice: null,
      note: null,
      NegotiationStatus,
      status: NegotiationStatus.PENDING
    }
  },

  computed: {
    ...mapGetters({
      users: 'user/getUsers'
    }),
    negotiationStatus() {
      return Object.values(NegotiationStatus).map((status) => ({
        value: status,
        label: this.$t(
          'property_negotiation_status.model.' + NegotiationStatusLabel[status]
        )
      }))
    },
    visitedProperties() {
      return [
        ...new Map(
          this.requirement.visits.map((visit) => [
            visit.property.code,
            visit.property
          ])
        ).values()
      ]
    },
    hasVisitedProperty() {
      if (this.requirement.visits.length === 0) {
        return false
      }

      return this.requirement.visits.find(
        (visit) => visit.status === VisitStatus.VISITED
      )
    },
    hasAgreedStatus() {
      return this.requirement.negotiations.find((negotiation) => {
        return negotiation.status === NegotiationStatus.AGREED
      })
    },
    editable() {
      return (
        this.requirement.result === RequirementResult.IN_PROGRESS ||
        this.requirement.result === RequirementResult.PENDING
      )
    }
  },

  methods: {
    ...mapMutations({
      setUsers: 'user/SET_USERS'
    }),

    resetForm() {
      this.selectedProperty = null
      this.date = new Date()
      this.assignee = null
      this.lastOwnerPrice = null
      this.lastBuyerPrice = null
      this.lastAgreedPrice = null
      this.note = null
      this.status = NegotiationStatus.PENDING

      this.v$.$reset()
    },

    async storeNegotiation() {
      const result = await this.v$.$validate()
      if (!result) {
        return false
      }

      try {
        const negotiation = {
          client_requirement_id: this.requirementId,
          property_id: this.selectedProperty.id,
          person_in_charge_id: this.assignee.id,
          negotiated_at: this.date,
          last_buyer_price: this.lastBuyerPrice,
          last_owner_price: this.lastOwnerPrice,
          last_agreed_price: this.lastAgreedPrice,
          note: this.note,
          status: this.status
        }

        const { data } = await this.$service.propertyNegotiation.create(
          negotiation
        )

        this.addNegotiation(data)
        this.resetForm()
        this.showSuccessMessage()
      } catch (event) {
        this.showErrorMessage()
      }
    },

    addNegotiation(negotiation) {
      this.$emit('update:requirement', {
        ...this.requirement,
        negotiations: [
          ...this.requirement.negotiations,
          ...[
            {
              ...negotiation,
              property: this.selectedProperty,
              assignee: this.assignee
            }
          ]
        ]
      })
    },

    async saveNegotiation(negotiation) {
      try {
        await this.$service.propertyNegotiation.update(
          negotiation.id,
          negotiation
        )
      } catch (error) {
        this.showErrorMessage()
      }
    },

    showSuccessMessage(detail) {
      this.$toast.add({
        severity: 'success',
        summary: this.$t('common.success'),
        detail:
          detail || this.$t('property_negotiation.message.success_create'),
        life: 3000
      })
    },

    showErrorMessage(detail) {
      this.$toast.add({
        severity: 'error',
        summary: this.$t('common.failed'),
        detail: detail || this.$t('property_negotiation.message.error_create'),
        life: 3000
      })
    },

    searchUser: debounce(async function (event) {
      if (!event.value) {
        return false
      }

      const { data } = await this.$service.user.search('name', event.value)
      this.setUsers(data)
    }, 300),

    handlePropertyChanged(event) {
      this.assignee = event.value.assignee
      if (event.value.assignee) {
        this.setUsers([event.value.assignee])
      }
    }
  }
}
</script>

<style scoped>
.calendar-in-payment-dialog .p-datepicker-calendar {
  min-width: 350px !important;
}

th {
  text-align: left;
  background-color: rgb(219 234 254);
  border: 1px solid;
  border-color: lightgray;
  padding: 1rem 1.25rem;
}

td {
  border: 1px solid;
  border-color: lightgray;
  padding: 1rem 1.25rem;
}
</style>
