<template>
  <div class="shadow bg-white rounded">
    <div class="border rounded-t flex justify-between p-4">
      <div>
        <p class="text-2xl uppercase">
          {{ $t('common.share_to') }}
        </p>
      </div>
      <button @click="action('close')">
        <i class="fa fa-times" />
      </button>
    </div>
    <div class="border-b p-4 flex justify-between flex-wrap">
      <div
        v-for="row in socials"
        :key="row.id"
        class="p-field-radiobutton mt-2 leading-tight"
      >
        <radio-button
          :id="row.label"
          v-model="social"
          :name="row.name"
          :value="row.value"
        />
        <label :for="row.label" class="font-sermibold">{{ row.name }}</label>
      </div>
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
        {{ $t('common.save_changes') }}
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
      social: [],
      socials: [
        {
          name: this.$t('common.facebook'),
          code: '1',
          label: '1',
          value: 'facebook'
        },
        {
          name: this.$t('common.telegram'),
          code: '2',
          label: '2',
          value: 'telegram'
        },
        {
          name: this.$t('common.linkedin'),
          code: '3',
          label: '3',
          value: 'linkedin'
        },
        {
          name: this.$t('common.twitter'),
          code: '4',
          label: '4',
          value: 'twitter'
        },
        {
          name: this.$t('common.instagram'),
          code: '5',
          label: '5',
          value: 'instagram'
        }
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
