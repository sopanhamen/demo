<template>
  <div class="bg-gray-50 divide-y-2 w-full sm:max-w-md">
    <div class="flex justify-between p-4">
      <span>
        <i class="fa fa-check fa-lg" />
        {{ $t('loan_form.new_borrower') }}
      </span>
      <button @click="action('close')">
        <i class="fa fa-times fa-lg" />
      </button>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
      <div>
        <p class="mb-2">
          {{ $t('common.name') }}
          <span class="text-red-700 text-xl">*</span>
        </p>
        <input-text placeholder="Enter ..." type="text" class="w-full h-9" />
      </div>
      <div>
        <p class="mb-2">
          {{ $t('admin_user_pro.position') }}
          <span class="text-red-700 text-xl">*</span>
        </p>
        <input-text placeholder="Enter ..." type="text" class="w-full h-9" />
      </div>
      <div>
        <p class="mb-2">
          {{ $t('admin_user_pro.gender') }}
          <span class="text-red-700 text-xl">*</span>
        </p>
        <input-text placeholder="Enter ..." type="text" class="w-full h-9" />
      </div>
      <div>
        <p class="mb-2">
          {{ $t('common.address') }}
          <span class="text-red-700 text-xl">*</span>
        </p>
        <input-text placeholder="Enter ..." type="text" class="w-full h-9" />
      </div>
      <div>
        <p class="mb-2">
          {{ $t('edit_client.phone1') }}
          <span class="text-red-700 text-xl">*</span>
        </p>
        <input-text placeholder="Enter ..." type="text" class="w-full h-9" />
      </div>
      <div>
        <p class="mb-2">
          {{ $t('edit_client.phone2') }}
          <span class="text-red-700 text-xl">*</span>
        </p>
        <input-text placeholder="Enter ..." type="text" class="w-full h-9" />
      </div>
      <div>
        <p class="mb-2">
          {{ $t('common.email') }}
          <span class="text-red-700 text-xl">*</span>
        </p>
        <input-text placeholder="Enter ..." type="text" class="w-full h-9" />
      </div>
      <div>
        <p class="mb-2">
          {{ $t('common.facebook') }}
          <span class="text-red-700 text-xl">*</span>
        </p>
        <input-text placeholder="Enter ..." type="text" class="w-full h-9" />
      </div>
      <div>
        <p class="mb-2">
          {{ $t('edit_client.photo') }}
          <span class="text-red-700 text-xl">*</span>
        </p>
        <input-text placeholder="Enter ..." type="text" class="w-full h-9" />
      </div>
    </div>
    <div class="flex justify-between p-4">
      <button
        class="rounded px-2 py-1 bg-gray-100 border"
        @click="action('close')"
      >
        {{ $t('common.close') }}
      </button>
      <button
        class="rounded px-2 py-1 bg-blue-500 text-white"
        @click="action('accept')"
      >
        {{ $t('common.save') }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      confirm: false
    }
  },
  methods: {
    action(text) {
      if (text === 'accept') {
        this.confirm = true
      }
      this.$emit('GetAction', this.confirm)
    }
  }
}
</script>
