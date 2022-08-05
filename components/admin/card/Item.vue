<template>
  <card>
    <template v-if="item.images" #header>
      <slot name="header" :row="item">
        <admin-card-item-header :images="item.images" />
      </slot>
    </template>
    <template #title>
      <slot name="title" :row="item"></slot>
    </template>
    <template #content>
      <div class="grid grid-cols-1 md:grid-cols-2">
        <div v-for="(header, i) in headers" :key="i" class="mb-3">
          <slot :name="header.field" :row="item">
            <div class="text-xs text-gray-500">{{ header.title }}</div>
            <div class="truncate" :title="item[header.field]">
              {{ item[header.field] || 'N/A' }}
            </div>
          </slot>
        </div>
      </div>
      <slot name="extras" :row="item"></slot>
    </template>
    <template #footer>
      <client-only>
        <admin-card-item-footer :item="item">
          <template #actions>
            <slot name="actions" :row="item">
              <admin-card-action
                :data="buttons"
                :item="item"
                @actionClicked="$emit('actionClicked', $event)"
              />
            </slot>
          </template>
        </admin-card-item-footer>
      </client-only>
    </template>
  </card>
</template>

<script>
export default {
  name: 'AdminCardItem',
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
