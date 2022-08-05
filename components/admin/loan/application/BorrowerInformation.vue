<template>
  <div class="bg-gray-50 rounded">
    <div class="border border-b-0 rounded-t">
      <p class="p-3 text-red-500 text-xl">
        {{ $t('loan_form.borrower_information') }}
      </p>
    </div>
    <div class="grid grid-cols-1 gap-4 p-4 border rounded-b font-bold text-sm">
      <div>
        <p class="mb-2">
          {{ $t('loan_form.type_of_borrower') }}
          <span class="text-red-700 text-xl">*</span>
        </p>
        <dropdown
          v-model="Type"
          :options="Types"
          option-label="name"
          placeholder="Select---"
          class="w-full h-9 items-center"
        />
      </div>
      <div>
        <p class="mb-2">
          {{ $t('loan_form.borrower_name') }}
          <span class="text-red-700 text-xl">*</span>
        </p>
        <div class="flex space-x-2 lg:space-x-4">
          <input-text type="text" class="w-full h-9" placeholder="Enter ..." />
          <button
            class="bg-green-500 hover:bg-green-600 rounded px-2 sm:px-5 xl:px-20 text-gray-50"
            @click="OpenNewBorrowerForm"
          >
            <span class="px-1 text-base font-bold flex items-center">
              <i class="fa fa-plus-square" />
              <p class="pl-1">{{ $t('loan_form.new') }}</p>
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Type: null,
      Types: [
        { name: 'Staff', code: 'r1' },
        { name: 'Other', code: 'r2' }
      ]
    }
  },
  methods: {
    OpenNewBorrowerForm() {
      this.$emit('AddNewBorrower')
    }
  }
}
</script>
