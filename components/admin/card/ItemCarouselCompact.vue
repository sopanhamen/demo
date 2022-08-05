<template>
  <client-only>
    <div class="relative">
      <galleria
        :value="images"
        :num-visible="5"
        :circular="true"
        :show-item-navigators="true"
        :show-thumbnails="false"
      >
        <template #item="slotProps">
          <nuxt-img
            :src="slotProps.item.image_url"
            style="width: 100%; display: block"
          />
        </template>
        <template #thumbnail="slotProps">
          <nuxt-img
            :src="slotProps.item.thumbnail_url"
            style="display: block; height: 170px"
          />
        </template>
      </galleria>
    </div>
  </client-only>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      responsiveOptions: [
        {
          breakpoint: '1024px',
          numVisible: 5
        },
        {
          breakpoint: '768px',
          numVisible: 3
        },
        {
          breakpoint: '560px',
          numVisible: 1
        }
      ]
    }
  }
}
</script>
