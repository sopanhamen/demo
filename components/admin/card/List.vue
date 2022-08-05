<template>
  <div class="bg-gray-50 rounded-md border border-gray-300">
    <slot name="listHeader">
      <admin-card-header
        :items-length="items.length"
        :total-records="totalRecords"
        :row-per-page="rowPerPage"
        :sortable="sortable"
        @sort="(sortable) => $emit('sort', sortable)"
        @pageLimitChanged="(limit) => $emit('pageLimitChanged', limit)"
        @pageChanged="(page) => $emit('pageChanged', page)"
      >
        <slot name="listToolbar"></slot>
      </admin-card-header>
    </slot>
    <div v-if="fetching" class="h-56 flex items-center">
      <div class="mx-auto text-center">Loading...</div>
    </div>
    <div
      v-else-if="!fetching && items && items.length > 0"
      class="grid grid-cols-1 gap-x-5 gap-y-4 w-full mb-10 p-4 bg-gray-50"
      :class="[
        {
          'xl:grid-cols-3 lg:grid-cols-2': items.length >= 3,
          'xl:grid-cols-2 lg:grid-cols-2': items.length == 2,
          'lg:grid-cols-2': items.length == 1
        },
        gridClass
      ]"
    >
      <template v-if="layout === 'card'">
        <admin-card-item
          v-for="(item, i) in items"
          :key="i"
          :item="item"
          :headers="headers"
          :buttons="buttons"
          @actionClicked="$emit('actionClicked', $event)"
        >
          <template #header="{ row: headerProps }">
            <slot name="header" :row="headerProps"></slot>
          </template>
          <template #headerButton="{ row: headerButtonProps }">
            <slot name="headerButton" :row="headerButtonProps"></slot>
          </template>
          <template #subHeader="{ row: subHeaderProps }">
            <slot name="subHeader" :row="subHeaderProps"></slot>
          </template>
          <template #title="{ row: titleProps }">
            <slot name="title" :row="titleProps"></slot>
          </template>
          <template v-for="header in headers" #[header.field]="{ row }">
            <slot :name="header.field" :row="row"></slot>
          </template>
          <template #extras="{ row: extrasProps }">
            <slot name="extras" :row="extrasProps"></slot>
          </template>
          <template #actions="{ row: actionProps }">
            <slot name="actions" :row="actionProps"></slot>
          </template>
        </admin-card-item>
      </template>
      <!-- Card Compact  -->
      <template v-if="layout === 'card-compact'">
        <admin-card-item-compact
          v-for="(item, i) in items"
          :key="i"
          :item="item"
          :headers="headers"
          :buttons="buttons"
          @actionClicked="$emit('actionClicked', $event)"
        >
          <template #header="{ row: headerProps }">
            <slot name="header" :row="headerProps"></slot>
          </template>
          <template #headerButton="{ row: headerButtonProps }">
            <slot name="headerButton" :row="headerButtonProps"></slot>
          </template>
          <template #subHeader="{ row: subHeaderProps }">
            <slot name="subHeader" :row="subHeaderProps"></slot>
          </template>
          <template #title="{ row: titleProps }">
            <slot name="title" :row="titleProps"></slot>
          </template>
          <template v-for="header in headers" #[header.field]="{ row }">
            <slot :name="header.field" :row="row"></slot>
          </template>
          <template #extras="{ row: extrasProps }">
            <slot name="extras" :row="extrasProps"></slot>
          </template>
          <template #actions="{ row: actionProps }">
            <slot name="actions" :row="actionProps"></slot>
          </template>
        </admin-card-item-compact>
      </template>
    </div>
    <paginator
      v-show="totalRecords > 1"
      :rows="rowPerPage"
      :total-records="totalRecords"
      @page="$emit('pageChanged', $event)"
    />
  </div>
</template>

<script>
export default {
  name: 'AdminCardList',
  props: {
    headers: {
      type: Array,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    actions: {
      type: [Array, Boolean],
      default() {
        return []
      }
    },
    layout: {
      type: String,
      default: 'card'
    },
    theme: {
      type: String,
      default: ''
    },
    rowPerPage: {
      type: Number,
      default: 0
    },
    totalRecords: {
      type: Number,
      default: 0
    },
    gridClass: {
      type: [String, Array, Object],
      default() {
        return ''
      }
    },
    fetching: {
      type: Boolean,
      default: true
    },
    sortable: {
      type: Object,
      default() {
        return {
          sort: 'desc',
          items: [
            {
              field: 'created_at',
              label: this.$t('common.created_at'),
              value: true
            }
          ]
        }
      }
    }
  },
  computed: {
    buttons() {
      return Array.isArray(this.actions) ? this.actions : []
    }
  }
}
</script>
