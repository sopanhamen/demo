<template>
  <div>
    <component
      :is="`PropertyCardCarousel${cardStyle.name}`"
      :item="item"
      :props="props"
      :image-class="imgClass"
      :card-style="cardStyle"
    />
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
  }
}
</script>
