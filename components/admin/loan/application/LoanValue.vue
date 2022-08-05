<template>
  <div class="bg-gray-50 rounded">
    <div class="border border-b-0 rounded-t">
      <p class="p-3 text-red-500 text-xl">{{ $t('loan_form.loan_value') }}</p>
    </div>
    <div class="grid grid-cols-1 gap-4 p-4 border rounded-b font-bold text-sm">
      <div>
        <p class="mb-2">
          {{ $t('loan_form.loan_amount') }}
          <span class="text-red-700 text-xl">*</span>
        </p>
        <input-number
          v-model="value1"
          class="admin_property_form_input"
          placeholder="Number only"
          mode="decimal"
          :min-fraction-digits="0"
          :max-fraction-digits="2"
        />
      </div>

      <div class="-mt-2">
        <p class="mb-2">
          {{ $t('loan_form.annual_interest') }}
          <span class="text-red-700 text-xl">*</span>
        </p>
        <input-number
          v-model="value2"
          class="admin_property_form_input"
          placeholder="Number only"
          mode="decimal"
          :min-fraction-digits="0"
          :max-fraction-digits="2"
        />
      </div>

      <div>
        <p class="mb-2">
          {{ $t('loan_form.loan_period_in_years') }}
          <span class="text-red-700 text-xl">*</span>
        </p>

        <input-number
          v-model="value3"
          class="admin_property_form_input"
          placeholder="Number only"
          mode="decimal"
          :min-fraction-digits="0"
          :max-fraction-digits="2"
        />
      </div>

      <div>
        <p class="pb-2 font-bold">
          {{ $t('loan_form.start_date_of_loan') }}
          <span class="text-red-700 text-xl">*</span>
        </p>
        <calendar
          id="icon"
          v-model="date"
          type="text"
          date-format="dd-mm-yy"
          :manual-input="true"
          :show-icon="true"
          class="admin_property_form_input p-inputtext-sm py-1 items-center"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value1: null,
      value2: null,
      value3: null,
      date: null
    }
  }
}
</script>
