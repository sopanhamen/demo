<template>
  <div
    class="flex justify-center my-28 p-12 md:flex-wrap sm:flex-wrap flex-wrap gap-8"
  >
    <div>
      <nuxt-img src="unauthorized-error.png" />
    </div>
    <div
      class="sm:flex-wrap font-semibold text-gray-600 text-xl md:text-left sm:text-center text-center"
    >
      <p class="text-4xl mt-12 mb-8 text-gray-700">
        {{ $t('error.401.title') }}
      </p>
      <p class="mb-4">
        {{ $t('error.401.des') }}
      </p>
      <nuxt-link :to="localePath('/')" class="text-gray-600 hover:text-primary">
        <p>
          {{ $t('common.go_to_home') }}
          <i class="fa fa-arrow-circle-right" />
        </p>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorUnauthorized'
}
</script>
