<template>
  <div v-if="item">
    <div
      class="flex justify-center items-center mx-auto h-48 w-48 rounded-full bg-secondary text-white ring-8 ring-inset ring-primary shadow-lg"
    >
      <div class="text-center">
        <p class="text-6xl mb-2">
          {{ item.titleKm ? item.titleKm : 'empty' }}
        </p>
        <p class="text-3xl">
          {{ item.titleEn ? item.titleEn : 'empty' }}
        </p>
      </div>
    </div>
    <div class="text-center text-lg my-5 font-bold">
      {{ item.pro ? item.pro : 'empty' }}
    </div>
    <div class="text-center text-sm">
      {{ item.des ? item.des : 'empty' }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
