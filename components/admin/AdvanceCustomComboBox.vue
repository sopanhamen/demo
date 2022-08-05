<template>
  <div>
    <dropdown
      v-model="selectedCountry"
      class="w-full h-28 items-center combobox"
      :options="item.options || noData"
      option-label="name"
      :placeholder="$t(item.placeholder) || empty"
      :show-clear="true"
    >
      <template #value="slotProps">
        <div v-if="slotProps.value" class="flex">
          <img
            :src="slotProps.value.img"
            alt="Image"
            :class="
              'h-28 w-40 object-contain py-2 flag flag-' +
              slotProps.value.code.toLowerCase()
            "
          />
          <div class="pl-4 pt-4">
            <div class="font-bold text-lg">
              {{ $t(slotProps.value.name) || empty }}
            </div>
            <small>{{ $t(slotProps.value.sub_title) || empty }}</small>
          </div>
        </div>
        <span v-else>
          {{ slotProps.placeholder || empty }}
        </span>
      </template>
      <template #option="slotProps">
        <div class="flex">
          <img
            :src="slotProps.option.img"
            alt="Image"
            :class="
              ' h-28 w-40 object-contain py-2 flag flag-' +
              slotProps.option.code.toLowerCase()
            "
          />
          <div class="pl-4 pt-4">
            <div class="font-bold text-lg">
              {{ $t(slotProps.option.name) || empty }}
            </div>
            <small>{{ $t(slotProps.option.sub_title) || empty }}</small>
          </div>
        </div>
      </template>
    </dropdown>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      selectedCountry: null,
      empty: 'N/A',
      noData: []
    }
  }
}
</script>
<style>
.combobox .p-dropdown-items-wrapper,
.combobox .p-dropdown-items {
  max-height: 600px !important;
}
</style>
