<template>
  <div class="shadow bg-gray-50 rounded">
    <div class="border rounded-t flex justify-between p-4">
      <div>
        <p class="text-blue-500 text-2xl uppercase">
          <i class="fa fa-exchange" />
          {{ $t('assign_to.title') }}
        </p>
      </div>
      <button @click="action('close')">
        <i class="fa fa-times" />
      </button>
    </div>
    <div class="border-b p-4">
      <p class="mb-2 font-bold">{{ $t('assign_to.assign_to') }}</p>
      <dropdown
        v-model="assign"
        :options="data"
        option-label="name"
        placeholder="Select---"
        class="w-full h-9 items-center"
      />
    </div>
    <div class="flex justify-between p-4">
      <button
        class="bg-gray-200 hover:bg-gray-300 rounded border border-gray-300 px-2 py-1"
        @click="action('close')"
      >
        {{ $t('common.close') }}
      </button>
      <button
        class="bg-blue-600 hover:bg-blue-700 text-white rounded px-2 py-1"
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
      confirm: false,
      assign: null,
      data: [
        { name: 'a', code: 'a' },
        { name: 'b', code: 'b' },
        { name: 'c', code: 'c' }
      ]
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
