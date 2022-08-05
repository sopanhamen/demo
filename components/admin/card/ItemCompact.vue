<template>
  <card class="overflow-hidden">
    <template v-if="item.images" #header>
      <div class="relative">
        <div class="flex flex-wrap justify-between bg-gray-100 border-b px-5">
          <slot name="header" :row="item">
            <admin-card-item-header-compact
              :title="item.title || item.id"
              :link="item.link"
            />
          </slot>
          <slot name="headerButton" :row="item"></slot>
        </div>
        <slot name="subHeader" :row="item"></slot>
      </div>
    </template>
    <template #title>
      <slot name="title" :row="item"></slot>
    </template>
    <template #content>
      <div
        class="grid grid-cols-1 -my-5 pb-4 gap-x-4"
        :class="{ 'xl:grid-cols-5': item.images && item.images.length }"
      >
        <div class="col-span-3">
          <slot v-for="header in headers" :name="header.field" :row="item">
            <description-list-item
              v-if="!header.hidden"
              :key="header.id"
              :label="header.title"
              :value="item[header.field]"
            />
          </slot>
        </div>
        <div class="col-span-2">
          <slot name="carousel" :row="item">
            <admin-card-item-carousel-compact
              v-if="item.images"
              :images="item.images"
            />
          </slot>
        </div>
      </div>
      <slot name="extras" :row="item"></slot>
    </template>
    <template #footer>
      <admin-card-item-footer-compact :item="item">
        <template #actions>
          <slot name="actions" :row="item">
            <admin-card-action-compact
              :data="buttons"
              :item="item"
              @actionClicked="$emit('actionClicked', $event)"
            />
          </slot>
        </template>
      </admin-card-item-footer-compact>
    </template>
  </card>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    headers: {
      type: Array,
      required: true
    },
    buttons: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>
