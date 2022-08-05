<template>
  <div>
    <pv-dialog
      v-if="paymentDialog"
      :visible="isDisplayed"
      position="top"
      :header="$t('user_team.title.structure')"
      :container-style="{ width: '90vw' }"
      :close-on-escape="true"
      :closable="true"
      :modal="true"
      @update:visible="isDisplayed = !isDisplayed"
    >
      <div
        v-if="paymentDialog.documents ? paymentDialog.documents.length > 0 : ''"
        class="overflow-y-auto h-80"
      >
        <table class="w-full">
          <tr class="sticky -top-1 z-100">
            <th class="text-center">{{ $t('common.document') }}</th>
            <th>{{ $t('common.name') }}</th>
            <th class="text-center">
              {{ $t('common.document_type') }}
            </th>
            <th>{{ $t('common.upload_date') }}</th>
            <th class="text-center">
              {{ $t('common.action') }}
            </th>
          </tr>
          <tr
            v-for="(file, index) in paymentDialog.documents"
            :key="file.id"
            :class="{
              'bg-slate-100': index % 2 == 0
            }"
          >
            <td class="text-center py-1">
              <i class="pi pi-file-pdf text-4xl"></i>
            </td>
            <td class="py-1">{{ file.file_name }}</td>
            <td class="text-center py-1">{{ file.file_type }}</td>
            <td class="py-1">
              {{ formatDateTime(file.created_at) }}
            </td>
            <td class="text-center py-1">
              <div class="h-full flex justify-around">
                <pv-button
                  icon="pi pi-download"
                  :title="$t('common.download')"
                  class="p-button-secondary p-button-sm p-button-raised p-button-rounded p-0"
                  @click.prevent="downloadDocument(file)"
                />
                <pv-button
                  icon="pi pi-trash"
                  :title="$t('common.delete')"
                  class="p-button-danger p-button-sm p-button-raised p-button-rounded p-0"
                  @click="deleteDocument(paymentDialog, file)"
                />
              </div>
            </td>
          </tr>
        </table>
      </div>
      <admin-form-upload-files
        :show-file="false"
        :files="documents"
        @uploaded="uploadDocument(paymentDialog, $event)"
      />
      <template #footer>
        <div class="mt-4 flex justify-end">
          <pv-button
            :label="$t('common.close')"
            class="p-button-text p-button-plain p-button-sm bg-gray-200"
            icon="pi pi-times"
            @click="isDisplayed = !isDisplayed"
          />
        </div>
      </template>
    </pv-dialog>
    <div class="text-lg font-bold my-2">
      {{ $t('client_payment.title.list') }} - {{ code }}
    </div>
    <div v-if="!agreedNegotiation" class="p-10 bg-yellow-100">
      {{ $t('client_payment.message.no_agreed_negotiation') }}
    </div>
    <div v-else>
      <div class="flex space-x-4 mb-4">
        <div class="rounded-md bg-blue-100 p-4">
          {{ $t('client_payment.title.property_price') }}:
          {{ formatMoney(amountToBePaid) }}
        </div>
        <div class="rounded-md bg-green-100 p-4">
          {{ $t('client_payment.title.total_paid') }}:
          {{ formatMoney(totalPaid) }}
        </div>
        <div class="rounded-md bg-yellow-100 p-4">
          {{ $t('client_payment.title.remain') }}:
          {{ formatMoney(amountToBePaid - totalPaid) }}
        </div>
      </div>
      <table class="table-auto w-full">
        <thead>
          <tr>
            <th>
              {{ $t('client_payment.model.payment_date') }}
            </th>
            <th>
              {{ $t('client_payment.model.assignee') }}
            </th>
            <th>
              {{ $t('client_payment.model.amount') }}
            </th>
            <th>
              {{ $t('client_payment.model.next_payment_date') }}
            </th>
            <th>
              {{ $t('client_payment.model.note') }}
            </th>
            <th>{{ $t('common.action') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="payment in requirement.payments" :key="payment.id">
            <td>{{ formatDateTime(payment.payment_date) }}</td>
            <td>{{ payment.assignee.name }}</td>
            <td>{{ formatMoney(payment.amount) }}</td>
            <td>{{ formatDateTime(payment.next_payment_date) }}</td>
            <td>{{ payment.note }}</td>
            <td>
              <pv-button
                :label="$t('common.document')"
                icon="pi pi-file"
                class="p-button p-button-success"
                @click="showDialog(payment)"
              />
            </td>
          </tr>
          <tr v-if="amountToBePaid > totalPaid && editable">
            <td>
              <form-field-datepicker
                v-model="paymentDate"
                label=""
                :show-time="true"
                :errors="v$.paymentDate && v$.paymentDate.$errors"
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
                v-model="amount"
                :placeholder="amountToBePaid - totalPaid"
                :errors="v$.amount && v$.amount.$errors"
                type="number"
              />
            </td>
            <td>
              <form-field-datepicker
                v-model="nextPaymentDate"
                :show-time="true"
                :errors="v$.nextPaymentDate && v$.nextPaymentDate.$errors"
              />
            </td>
            <td>
              <form-field-input
                v-model="note"
                :placeholder="$t('client_payment.model.note') + '...'"
              />
            </td>
            <td>
              <pv-button
                :label="$t('common.save')"
                icon="pi pi-save"
                @click="storePayment"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { debounce } from 'lodash'
import { useVuelidate } from '@vuelidate/core'
import { required, numeric } from '@vuelidate/validators'
import { NegotiationStatus } from '@/enums/NegotiationStatus'
import useFormatter from '@/composables/useFormatter'
import { RequirementResult } from '@/enums/RequirementResult'
import useDownload from '@/composables/useDownload'

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
    const { formatDateTime, formatMoney, formatNumber } = useFormatter()
    const { download } = useDownload()

    return {
      formatDateTime,
      formatMoney,
      formatNumber,
      download,
      v$: useVuelidate()
    }
  },

  validations() {
    return {
      paymentDate: { required },
      assignee: { required },
      amount: { required, numeric }
    }
  },

  data() {
    return {
      isDisplayed: false,
      code: null,
      paymentDate: new Date(),
      assignee: null,
      amount: null,
      nextPaymentDate: null,
      paymentDialog: null,
      documents: [],
      note: null
    }
  },

  computed: {
    ...mapGetters({
      users: 'user/getUsers'
    }),
    totalPaid() {
      return this.requirement.payments.reduce((paidAmount, payment) => {
        return paidAmount + payment.amount
      }, 0)
    },
    editable() {
      return (
        this.requirement.result === RequirementResult.IN_PROGRESS ||
        this.requirement.result === RequirementResult.PENDING
      )
    },
    agreedNegotiation() {
      if (
        !this.requirement.negotiations ||
        this.requirement.negotiations.length === 0
      ) {
        return null
      }

      return this.requirement.negotiations.find(
        (negotiation) => negotiation.status === NegotiationStatus.AGREED
      )
    },
    amountToBePaid() {
      return this.agreedNegotiation
        ? this.agreedNegotiation.last_agreed_price
        : 0
    }
  },

  watch: {
    'requirement.payments': {
      handler(payments) {
        const lastPayment = payments[payments.length - 1]
        this.paymentDate = lastPayment
          ? lastPayment.next_payment_date
          : new Date()
      }
    }
  },

  mounted() {
    if (this.agreedNegotiation) {
      this.assignee = this.agreedNegotiation.assignee
      this.setUsers([this.assignee])
    }
  },

  methods: {
    ...mapMutations({
      setUsers: 'user/SET_USERS'
    }),

    showDialog(payment) {
      this.paymentDialog = payment
      this.isDisplayed = !this.isDisplayed
    },

    async downloadDocument(file) {
      if (!file.file_url) {
        return
      }

      const response = await this.$service.clientPayment.downloadDocument(file)
      this.download(file, response)
    },

    async uploadDocument(payment, event) {
      try {
        const { data } = await this.$service.clientPayment.uploadDocument(
          payment.id,
          [...this.documents, ...event]
        )
        payment.documents = data
        this.$toast.add({
          severity: 'success',
          summary: this.$t('common.success'),
          detail: this.$t('message.success_create'),
          life: 3000
        })
      } catch (error) {
        this.$toast.add({
          severity: 'error',
          summary: this.$t('common.failed'),
          detail: this.$t('message.error_create'),
          life: 3000
        })
      }
    },

    deleteDocument(payment, file) {
      if (!payment || !file) {
        return false
      }

      this.$confirm.require({
        message: this.$t('message.confirm_delete'),
        header: this.$t('common.confirmation'),
        icon: 'pi pi-exclamation-triangle',
        acceptClass: 'p-button-danger',
        accept: async () => {
          try {
            await this.$service.clientPayment.deleteDocument(
              payment.id,
              file.id
            )
            const index = payment.documents.findIndex((d) => d.id === file.id)
            if (index !== -1) {
              payment.documents.splice(index, 1)
            }

            this.$toast.add({
              severity: 'success',
              summary: this.$t('common.success'),
              detail: this.$t('message.success_delete_file'),
              life: 3000
            })
          } catch (error) {
            this.$toast.add({
              severity: 'error',
              summary: this.$t('common.failed'),
              detail: this.$t('message.error_delete_file'),
              life: 3000
            })
          }
        }
      })
    },

    resetForm() {
      this.propertyId = null
      this.paymentDate = null
      this.amount = null
      this.nextPaymentDate = null
      this.note = null

      this.v$.$reset()
    },

    async storePayment() {
      const result = await this.v$.$validate()
      if (!result) {
        return false
      }

      if (this.amount > this.amountToBePaid - this.totalPaid) {
        this.showErrorMessage(
          this.$t('client_payment.message.error_amount_overload')
        )
        return false
      }

      try {
        const payment = {
          client_requirement_id: this.requirement.id,
          property_id: this.agreedNegotiation.property.id,
          person_in_charge_id: this.assignee.id,
          payment_date: this.paymentDate,
          amount: this.amount,
          next_payment_date: this.nextPaymentDate,
          note: this.note
        }

        const { data } = await this.$service.clientPayment.create(payment)

        this.addPayment(data)
        this.resetForm()
        this.showSuccessMessage()
      } catch (event) {
        this.showErrorMessage()
      }
    },

    addPayment(payment) {
      this.$emit('update:requirement', {
        ...this.requirement,
        payments: [
          ...this.requirement.payments,
          ...[{ ...payment, assignee: this.assignee }]
        ]
      })
    },

    showSuccessMessage(detail) {
      this.$toast.add({
        severity: 'success',
        summary: this.$t('common.success'),
        detail: detail || this.$t('client_payment.message.success_create'),
        life: 3000
      })
    },

    showErrorMessage(detail) {
      this.$toast.add({
        severity: 'error',
        summary: this.$t('common.failed'),
        detail: detail || this.$t('client_payment.message.error_create'),
        life: 3000
      })
    },

    searchUser: debounce(async function (event) {
      if (!event.value) {
        return false
      }

      const { data } = await this.$service.user.search('name', event.value)
      this.setUsers(data)
    }, 300)
  }
}
</script>
<style>
.calendar-in-payment-dialog .p-datepicker-calendar {
  min-width: 350px !important;
}

th {
  text-align: left;
  background-color: rgb(219 234 254);
  border: 1px solid;
  border-color: lightgray;
  padding: 1rem 2rem;
}

td {
  border: 1px solid;
  border-color: lightgray;
  padding: 1rem 2rem;
}
</style>
