<template>
  <client-only placeholder="Loading...">
    <div class="flex justify-center">
      <div class="w-card-carousel w-full">
        <div class="max-w-7xl mx-auto mb-8">
          <div class="text-center">
            <p class="md:text-2xl text-3xl text-primary font-bold">
              {{ title }}
            </p>
            <p class="text-sm">
              {{ description }}
            </p>
          </div>
        </div>

        <carousel-3d
          :disable3d="true"
          :space="350"
          :clickable="false"
          :controls-visible="true"
          width="350"
          :height="height"
          border="0"
        >
          <slide v-for="(slide, i) in items" :key="i" :index="i">
            <slot name="slide" :item="slide" />
          </slide>
        </carousel-3d>
      </div>
    </div>
  </client-only>
</template>

<script>
export default {
  name: 'PageTeam',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      default() {
        return []
      }
    },
    height: {
      type: String,
      default() {
        return '350'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .carousel-3d-container {
  .carousel-3d-slide {
    background-color: transparent;
  }
}
</style>
