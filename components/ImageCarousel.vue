<template>
  <div class="w-full">
    <client-only>
      <template slot="placeholder">
        <nuxt-img :src="defaultImage" :class="imageClass" />
      </template>
      <carousel-3d
        :disable3d="!animate3D"
        :space="365"
        :controls-visible="showControl"
        :display="display || 1"
        :border="0"
        :width="width"
        :height="height"
      >
        <template v-if="images && images.length > 0">
          <slide v-for="(image, i) in images" :key="i" :index="i">
            <slot name="image" :data="image">
              <nuxt-img
                v-if="image[thumbnailKey]"
                :src="image[thumbnailKey]"
                :alt="image.alt || 'image'"
                :class="imageClass"
              />
            </slot>
          </slide>
        </template>
        <slide v-else :index="0">
          <slot name="image" :data="{}">
            <nuxt-img :src="defaultImage" :class="imageClass" alt="image" />
          </slot>
        </slide>
      </carousel-3d>
    </client-only>
  </div>
</template>

<script>
import { image } from '@/config'

export default {
  props: {
    images: {
      type: Array,
      required: true
    },
    thumbnailKey: {
      type: String,
      default: 'src'
    },
    imageKey: {
      type: String,
      default: 'src'
    },
    imageClass: {
      type: [String, Array, Object],
      default: ''
    },
    width: {
      type: [Number, String],
      default: 420
    },
    height: {
      type: [Number, String],
      default: 280
    },
    display: {
      type: Number,
      default: 1
    },
    showControl: {
      type: Boolean,
      default: true
    },
    imgClass: {
      type: Array,
      default() {
        return []
      }
    },
    animate3D: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      defaultImage: image.default.noImageLg
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .carousel-3d-container {
  margin-top: 0 !important;
  margin-bottom: 0 !important;

  .carousel-3d-slide {
    background-color: transparent;
  }
}
</style>
