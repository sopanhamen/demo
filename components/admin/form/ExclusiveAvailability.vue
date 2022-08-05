<template>
  <div class="shadow bg-gray-50">
    <div class="flex justify-between p-4 border-b">
      <p class="text-xl font-semibold text-gray-500">
        {{ $t('exclusive.title') }}
      </p>
      <button @click="action('close')">
        <i class="fa fa-times p-2 text-gray-400" />
      </button>
    </div>
    <div
      class="grid sm:grid-cols-3 grid-cols-1 gap-4 p-4 text-base font-semibold text-gray-700"
    >
      <div>
        <label for="icon">{{ $t('exclusive.start_date') }}</label>
        <Calendar
          id="icon"
          v-model="date2"
          :show-icon="true"
          date-format="dd/mm/yy"
          class="h-9 w-full mt-2"
        />
      </div>
      <div>
        <label for="icon">{{ $t('exclusive.end_date') }}</label>
        <Calendar
          id="icon"
          v-model="date3"
          :show-icon="true"
          date-format="dd/mm/yy"
          class="h-9 w-full mt-2"
          type="text"
        />
      </div>
      <div>
        <p>{{ $t('common.alert') }}</p>
        <Dropdown
          v-model="alert"
          :options="alerts"
          option-label="name"
          placeholder="Select ---"
          class="h-9 items-center w-full mt-2"
          type="text"
        />
      </div>
    </div>
    <div class="flex justify-between p-4 border-t">
      <button class="px-2 py-1 bg-gray-100 rounded" @click="action('close')">
        {{ $t('common.close') }}
      </button>
      <button
        class="px-2 py-1 bg-blue-500 text-white rounded"
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
      date2: null,
      date3: null,
      alert: null,
      alerts: [
        { name: '1 day before', code: '1d' },
        { name: '1 week before', code: '1w' },
        { name: '15 days before', code: '15d' },
        { name: '1 month before', code: '1m' }
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
