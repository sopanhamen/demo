<template>
  <div class="pb-10">
    <div class="relative w-full mb-5 sm:mb-10">
      <map-view height="80vmin" :zoom="14" map-type="satellite" />
      <div
        class="bg-white shadow-xl rounded w-full mt-4 sm:mt-0 sm:max-w-sm sm:absolute top-1/3 md:left-10 lg:left-44 xl:left-64"
      >
        <contact-form-basic-contact-info-location :props="props" />
      </div>
    </div>
    <div class="container w-full mx-auto space-y-4 md:space-y-6">
      <div class="bg-white px-2 pb-20 shadow-xl rounded sm:max-w-4xl">
        <contact-form-basic-contact-info />
      </div>
      <div class="bg-white p-6 shadow-xl rounded sm:max-w-4xl">
        <contact-form-basic-contact-form />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MapViewContact',

  props: {
    props: {
      type: Object,
      required: true
    }
  }
}
</script>
