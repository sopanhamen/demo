<template>
  <div class="px-4 rounded-t-md sm:flex justify-end border-b border-gray-300">
    <div class="w-full items-center mb-3 sm:mb-0 flex space-x-2 py-4">
      <input type="checkbox" />
      <div class="text-base">
        {{ $t('common.total') }} :
        <span class="text-red-700 font-bold">
          {{ itemsLength }} of {{ totalRecords }}
        </span>
      </div>
    </div>
    <div class="flex space-x-2">
      <div class="flex space-x-2 py-2">
        <slot></slot>
      </div>
      <div class="py-3">
        <dropdown
          class="rounded-md text-sm text-gray-700 w-32 sm:w-36"
          :options="[12, 24, 48, 120, 200]"
          :value="rowPerPage"
          @input="$emit('pageLimitChanged', $event)"
        />
      </div>
      <div class="py-3">
        <pv-button
          icon="pi pi-sort-alt"
          class="p-button-text p-button-sm py-2 px-1 text-gray-700 bg-slate-100"
          @click="toggleSortMenu"
        />
        <overlay-panel ref="menu">
          <div class="flex flex-col gap-y-4" style="min-width: 230px">
            <dropdown
              v-model="sort"
              :options="[
                { value: 'asc', label: 'A - Z' },
                { value: 'desc', label: 'Z - A' }
              ]"
              option-value="value"
              option-label="label"
            />
            <div v-for="sortOption in sortOptions" :key="sortOption.field">
              <button-sort
                v-model="sortOption.value"
                :label="sortOption.label"
              />
            </div>
            <div class="grid grid-cols-2 gap-2 mt-2">
              <pv-button
                class="p-button-sm p-button-text text-gray-700 bg-slate-100"
                :label="$t('common.cancel')"
                @click="toggleSortMenu"
              />
              <pv-button
                class="p-button-sm"
                :label="$t('common.ok')"
                @click="emitSortEvent"
              />
            </div>
          </div>
        </overlay-panel>
      </div>
    </div>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'

export default {
  name: 'AdminCardHeader',

  props: {
    itemsLength: {
      type: Number,
      required: true
    },
    totalRecords: {
      type: Number,
      required: true
    },
    rowPerPage: {
      type: Number,
      required: true
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

  data() {
    return {
      sort: 'desc',
      sortOptions: [],
      showSortMenu: false
    }
  },

  watch: {
    sortable() {
      this.setSortOptions()
    },
    showSortMenu() {
      this.setSortOptions()
    }
  },

  mounted() {
    this.setSortOptions()
  },

  methods: {
    setSortOptions() {
      if (this.sortable.sort) {
        this.sort = this.sortable.sort
      }

      if (this.sortable.items) {
        this.sortOptions = cloneDeep(this.sortable.items)
      }
    },
    toggleSortMenu(event) {
      this.showSortMenu = !this.showSortMenu
      this.$refs.menu?.toggle(event)
    },
    emitSortEvent(event) {
      const sorts = this.sortOptions.reduce((handler, sort) => {
        if (sort.value) {
          handler[sort.field] = this.sort
        }

        return handler
      }, {})

      this.toggleSortMenu()
      this.$emit('sort', {
        sorts,
        sortable: { items: this.sortOptions, sort: this.sort }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .p-dropdown .p-inputtext {
  padding: 0.545rem 0.75rem !important;
}
</style>
