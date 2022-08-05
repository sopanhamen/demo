<template>
  <div>
    <div class="text-lg font-bold my-2">
      {{ $t('property_visit.title.list') }}
    </div>
    <table class="table-auto w-full">
      <thead>
        <tr>
          <th>{{ $t('property_visit.model.code') }}</th>
          <th>{{ $t('property_visit.model.visited_at') }}</th>
          <th>{{ $t('property_visit.model.assignee') }}</th>
          <th>{{ $t('property_visit.model.status') }}</th>
          <th>
            {{ $t('property_visit.model.note') }}
          </th>
          <th>{{ $t('common.action') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="visit in requirement.visits" :key="visit.id">
          <td>{{ visit.property.code }}</td>
          <td>{{ formatDateTime(visit.visited_at) }}</td>
          <td>{{ visit.assignee.name }}</td>
          <td>{{ visitStatusLabel(visit.status) }}</td>
          <td>{{ visit.note }}</td>
          <td>
            <pv-button
              v-if="editable"
              :label="$t('common.save')"
              class="p-button-sm"
              icon="pi pi-save"
              disabled
            />
          </td>
        </tr>
        <tr v-if="editable">
          <td>
            <form-field-auto-complete
              v-model="code"
              :suggestions="suggestedProperties"
              :errors="v$.code && v$.code.$errors"
              placeholder="MK-00001"
              :force-selection="true"
              search-field="code"
              @complete="searchProperty($event)"
              @completed="setProperty($event)"
              @clear="resetForm"
            />
          </td>
          <td>
            <form-field-datepicker
              v-model="date"
              label=""
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
              label=""
              option-label="name"
              @filter="searchUser($event)"
            />
          </td>
          <td>
            <form-field-select
              v-model="status"
              :options="visitStatuses"
              :show-clear="false"
              label=""
              option-label="label"
              option-value="value"
            />
          </td>
          <td>
            <form-field-input
              v-model="note"
              :placeholder="$t('property_visit.model.note') + '...'"
              label=""
            />
          </td>
          <td>
            <pv-button
              v-if="editable"
              :label="$t('common.save')"
              :disabled="!selectedProperty || saving"
              :icon="saving ? 'pi pi-spin pi-spinner' : 'pi pi-save'"
              class="p-button-sm"
              @click="storeVisit"
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
import { required } from '@vuelidate/validators'
import { useContext } from '@nuxtjs/composition-api'
import { VisitStatus } from '@/enums/VisitStatus'
import useProperty from '@/composables/useProperty'
import { RequirementResult } from '@/enums/RequirementResult'
import { ListingStatus } from '@/enums/ListingStatus'
import { NegotiationStatus } from '@/enums/NegotiationStatus'
import { RequirementService } from '@/enums/RequirementService'
import { ListingPurpose } from '@/enums/ListingPurpose'
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
    const { i18n } = useContext
    const { visitStatusLabel } = useProperty(i18n)
    const { formatDateTime } = useFormatter()

    return {
      formatDateTime,
      visitStatusLabel,
      v$: useVuelidate()
    }
  },

  validations() {
    return {
      code: { required },
      date: { required },
      assignee: { required }
    }
  },

  data() {
    return {
      saving: false,
      confirm: false,

      suggestedProperties: [],
      selectedProperty: null,

      code: null,
      date: new Date(),
      assignee: null,
      note: null,
      status: VisitStatus.VISITED
    }
  },
  computed: {
    ...mapGetters({
      users: 'user/getUsers',
      getVisitStatus: 'resource/getVisitStatus'
    }),
    visitStatuses() {
      return this.getVisitStatus.map((status) => ({
        value: status.value,
        label: this.$t('property_visit_status.model.' + status.label)
      }))
    },
    hasAgreedStatus() {
      return this.requirement.negotiations?.find((negotiation) => {
        return negotiation.status === NegotiationStatus.AGREED
      })
    },
    editable() {
      return (
        !this.hasAgreedStatus &&
        (this.requirement.result === RequirementResult.IN_PROGRESS ||
          this.requirement.result === RequirementResult.PENDING)
      )
    }
  },

  watch: {
    requirement: {
      deep: true,
      handler(value) {
        if (value?.property) {
          this.setProperty({ value: value.property })
        }
      }
    }
  },

  methods: {
    ...mapMutations({
      addUsers: 'user/ADD_USERS'
    }),
    resetForm() {
      this.selectedProperty = null
      this.code = null
      this.date = new Date()
      this.assignee = null
      this.note = null
      this.status = VisitStatus.VISITED
      this.v$.$reset()
    },

    async storeVisit() {
      const result = await this.v$.$validate()
      if (!result) {
        return false
      }

      const property = this.selectedProperty
      if (!property) {
        this.showErrorMessage()
        return false
      }

      try {
        this.saving = true

        const visitInfo = {
          client_requirement_id: this.requirement.id,
          property_id: property.id,
          person_in_charge_id: this.assignee.id,
          visited_at: this.date,
          note: this.note,
          status: this.status
        }

        const { data } = await this.$service.propertyVisit.create(visitInfo)

        if (data) {
          this.saving = false
        }

        this.addVisitToRequirement(data)
        this.showSuccessMessage()
        this.resetForm()
      } catch (error) {
        this.showErrorMessage(error)
      }
    },

    addVisitToRequirement(visit) {
      this.$emit('update:requirement', {
        ...this.requirement,
        visits: [
          ...this.requirement.visits,
          ...[
            {
              ...visit,
              property: this.selectedProperty,
              assignee: this.assignee
            }
          ]
        ]
      })
    },

    showSuccessMessage(detail) {
      this.$toast.add({
        severity: 'success',
        summary: this.$t('common.success'),
        detail: this.$t('property_visit.message.success_create'),
        life: 3000
      })
    },

    showErrorMessage(detail) {
      this.$toast.add({
        severity: 'error',
        summary: this.$t('common.failed'),
        detail: this.$t('property_visit.message.error_create'),
        life: 3000
      })
    },

    setProperty(event) {
      if (event) {
        this.selectedProperty = event.value
        this.code = event.value.code
        this.assignee = event.value.assignee

        if (this.assignee) {
          this.addUsers([this.assignee])
        }
      }
    },

    async searchProperty(event) {
      if (!event || !event.query) {
        return false
      }

      this.selectedProperty = null

      const code = event.query
      const { data } = await this.$service.property.search('code', code, {
        relations: ['assignee'],
        listing_status: ListingStatus.AVAILABLE,
        listing_purpose:
          this.requirement.service === RequirementService.BUY
            ? [ListingPurpose.SALE, ListingPurpose.RENT_OR_SALE]
            : [ListingPurpose.RENT, ListingPurpose.RENT_OR_SALE],
        published: true
      })
      this.suggestedProperties = data
    },

    searchUser: debounce(async function (event) {
      if (!event.value) {
        return false
      }

      const { data } = await this.$service.user.search('name', event.value)
      this.addUsers(data)
    }, 300)
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
