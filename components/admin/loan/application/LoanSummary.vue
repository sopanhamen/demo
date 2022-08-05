<template>
  <div class="bg-gray-50 rounded">
    <div class="border border-b-0 rounded-t">
      <p class="p-3 text-red-500 text-xl">{{ $t('loan_form.loan_summary') }}</p>
    </div>
    <div class="grid grid-cols-1 gap-4 p-4 border rounded-b font-bold text-sm">
      <div>
        <p class="mb-2">
          {{ $t('loan_form.monthly_payment') }}
        </p>
        <input-text disabled value="0" type="text" class="w-full h-9" />
      </div>
      <div>
        <p class="mb-2">
          {{ $t('loan_form.number_of_payments') }}
        </p>
        <input-text disabled value="0" type="text" class="w-full h-9" />
      </div>
      <div>
        <p class="mb-2">{{ $t('loan_form.total_interest') }}</p>
        <input-text disabled value="0" type="text" class="w-full h-9" />
      </div>
      <div>
        <p class="mb-2">{{ $t('loan_form.total_cost_of_loan') }}</p>
        <input-text disabled value="0" type="text" class="w-full h-9" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>
