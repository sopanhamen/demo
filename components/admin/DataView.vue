<template>
  <div>
    <!-- Card layout -->
    <admin-card-list
      v-if="layout === 'card' || layout === 'card-compact'"
      :headers="headers"
      :items="items"
      :actions="actions"
      :layout="layout"
      :row-per-page="rowPerPage"
      :total-records="totalRecords"
      :grid-class="gridClass"
      :fetching="fetching"
      :sortable="sortable"
      :selected-items.sync="selected"
      @actionClicked="(action) => $emit('actionClicked', action)"
      @sort="(sortable) => $emit('sort', sortable)"
      @pageLimitChanged="(limit) => $emit('pageLimitChanged', limit)"
      @pageChanged="(page) => $emit('pageChanged', page)"
    >
      <template #listToolbar>
        <slot name="listToolbar"></slot>
      </template>
      <template #header="{ row: headerProps }">
        <slot name="header" :row="headerProps"></slot>
      </template>
      <template #headerButton="{ row: headerButtonProps }">
        <slot name="headerButton" :row="headerButtonProps"></slot>
      </template>
      <template #subHeader="{ row: subHeaderProps }">
        <slot name="subHeader" :row="subHeaderProps"></slot>
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
    </admin-card-list>
    <!-- Table layout -->
    <admin-data-table
      v-else
      :loading="fetching"
      :headers="headers"
      :items="items"
      :actions="actions"
      :row-per-page="rowPerPage"
      :total-records="totalRecords"
      :sortable="sortable"
      :selected-items.sync="selected"
      @actionClicked="$emit('actionClicked', $event)"
      @sort="(sortable) => $emit('sort', sortable)"
      @pageLimitChanged="$emit('pageLimitChanged', $event)"
      @pageChanged="$emit('pageChanged', $event)"
    >
      <template #listToolbar>
        <slot name="listToolbar"></slot>
      </template>
      <template v-for="header in headers" #[header.field]="{ row }">
        <slot :name="header.field" :row="row"></slot>
      </template>
      <template #actions="{ row }">
        <slot name="actions" :row="row"></slot>
      </template>
    </admin-data-table>
  </div>
</template>

<script>
export default {
  name: 'DataView',
  props: {
    layout: {
      type: String,
      default: 'card'
    },
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
    image: {
      type: String,
      default() {
        return ''
      }
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
      type: [Array, Object, String],
      default() {
        return ''
      }
    },
    fetching: {
      type: Boolean,
      default: false
    },
    selectedItems: {
      type: Array,
      default() {
        return []
      }
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
    selected: {
      get() {
        return this.selectedItems
      },
      set(event) {
        this.$emit('update:selected-items', event)
      }
    }
  }
}
</script>
