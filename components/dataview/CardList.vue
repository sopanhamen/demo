<template>
  <div>
    <dataview-list-header
      v-if="data"
      :items-length="data.length"
      :total-records="totalRecords"
      :row-per-page="rowPerPage"
      @pageLimitChanged="$emit('pageLimitChanged', $event)"
    >
      <slot name="toolbar"></slot>
    </dataview-list-header>

    <div class="w-full mt-3 mb-8" :class="wrapperClass">
      <div v-for="row in data" :key="row.id" class="relative">
        <property-card-carousel
          :item="row"
          :card-style="cardStyle"
          :props="props"
        />
      </div>
    </div>
    <paginator
      v-if="pagination && totalRecords > rowPerPage"
      :rows="rowPerPage"
      :total-records="totalRecords"
      class="mb-8"
      @page="$emit('pageChanged', $event)"
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
    data: {
      type: Array,
      required: true
    },
    layout: {
      type: String,
      default: 'card'
    },
    cardStyle: {
      type: Object,
      default() {
        return { name: 'Default', label: 'Default' }
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
    pagination: {
      type: Boolean,
      default: true
    },
    wrapperClass: {
      type: [String, Object, Array],
      default: 'grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'
    }
  }
}
</script>
