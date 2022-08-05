<template>
  <div class="bg-white relative border" :class="roundSize">
    <!-- Image carousel -->
    <div :class="imageCarouselClass">
      <component
        :is="`Property${exclusive.name}`"
        v-if="item.publishing.exclusive"
      />
      <image-carousel
        :images="item.images || []"
        :img-class="imgClass"
        :image-class="roundSize"
        thumbnail-key="thumbnail_url"
        image-key="image_url"
      />
    </div>

    <!-- Property Info -->
    <property-body-content :item="item" />

    <!-- Property Footer -->
    <slot name="footer">
      <property-card-carousel-footer :property="item" />
    </slot>
  </div>
</template>

<script>
import useTheme from '@/composables/useTheme'

export default {
  props: {
    props: {
      type: Object,
      required: true
    },
    item: {
      type: Object,
      required: true
    },
    imgClass: {
      type: Array,
      default() {
        return []
      }
    },
    cardStyle: {
      type: Object,
      default() {
        return { name: 'Default', label: 'Default' }
      }
    }
  },

  setup() {
    const { roundSize } = useTheme()
    return { roundSize }
  },

  computed: {
    exclusive() {
      return (
        this.props.exclusive || { name: 'ExclusiveRibbon', label: 'Ribbon' }
      )
    },
    imageCarouselClass() {
      if (this.exclusive.name === 'ExclusiveRibbon') {
        return 'px-3 pt-3 pb-2 relative overflow-hidden'
      }

      return 'px-3 pt-3 pb-2 relative'
    }
  }
}
</script>
