<template>
  <div class="shadow bg-gray-50">
    <div class="border rounded-t flex justify-between p-4">
      <div>
        <p class="text-blue-500 text-2xl uppercase">
          <i class="fa fa-tty" />
          {{ $t('contact_detail.title') }}
        </p>
      </div>
      <button @click="action">
        <i class="fa fa-times" />
      </button>
    </div>
    <div class="border-b-2 p-4">
      <table class="table-layout border w-full">
        <tbody v-for="row in item" :key="row.id">
          <tr class="border border-gray-300">
            <td class="w-4/12 h-10 px-2">{{ $t(row.title) }}</td>
            <td class="text-center border border-gray-300 px-1">:</td>
            <td class="w-8/2 px-2">{{ row.value }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      required: true,
      type: Array
    }
  },
  data() {
    return {}
  },
  methods: {
    action() {
      this.$emit('close')
    }
  }
}
</script>
