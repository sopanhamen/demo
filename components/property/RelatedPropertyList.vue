<template>
  <div>
    <card-carousel
      height="400"
      :description="des"
      :title="title"
      :items="properties"
    >
      <template #slide="{ item }">
        <property-card-carousel
          class="mx-2"
          :item="item"
          :img-class="['max-h-48']"
          :options="{ fullscreen: false }"
        />
      </template>
    </card-carousel>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    des: {
      type: String,
      required: true
    },
    properties: {
      type: Array,
      required: true
    }
  }
}
</script>
<style scoped>
.carousel-cell {
  width: 28%;
  margin-right: 10px;
}
</style>
