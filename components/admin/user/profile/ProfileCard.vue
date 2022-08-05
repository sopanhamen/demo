<template>
  <div class="w-full">
    <div class="text-center py-5 space-y-2 bg-gray-50 rounded-t-lg">
      <nuxt-img
        v-if="!item.noImage"
        :src="item.img || noImg"
        alt="Image Profile"
        class="p-px w-32 h-32 rounded-full border-2 border-yellow-400 object-cover mx-auto"
      />
      <h3 class="uppercase text-xl">{{ item.title || empty }}</h3>
      <h3 class="capitalize text-sm">{{ item.subTitle || empty }}</h3>
    </div>
    <div class="bg-gray-50 p-5 border-t-2 space-y-2 items-center">
      <p
        v-for="row in item.info"
        :key="row.id"
        class="font-bold bg-white shadow rounded-md p-4"
      >
        {{ $t(row.column) }}&nbsp;:
        <span class="font-normal">{{ row.value || empty }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import { image } from '@/config'

export default {
  name: 'CardUserProfile',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      empty: 'N/A',
      noImg: image.default.noPhoto
    }
  }
}
</script>
