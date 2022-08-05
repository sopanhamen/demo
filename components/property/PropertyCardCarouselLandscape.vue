<template>
  <div class="rounded-xl bg-white relative border">
    <!-- Image carousel -->
    <div :class="imageCarouselClass">
      <component
        :is="`Property${exclusive.name}`"
        v-if="item.publishing && item.publishing.exclusive"
      />
      <image-carousel
        :images="item.images || []"
        :img-class="imgClass"
        image-class="rounded-lg"
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
