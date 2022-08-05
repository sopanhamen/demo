<template>
  <card>
    <template #header>
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
    </template>
    <template #content>
      <div style="margin-top: -1.25rem">
        <data-table
          :value="items"
          :selection.sync="selected"
          :loading="loading"
          responsive-layout="scroll"
        >
          <column
            selection-mode="multiple"
            header-class="p-selection-column"
            :header-style="{ width: '3em' }"
          />
          <template v-for="(header, key) of headers">
            <column
              v-if="!header.hidden"
              :key="key"
              :data-key="header.title"
              :header="header.title"
              :field="header.field"
              :header-style="{ width: header.width }"
              header-class="font-bold"
            >
              <template #body="slotProps">
                <slot :name="header.field" :row="slotProps.data">
                  <nuxt-link
                    v-if="header.field === 'title' && slotProps.data.link"
                    :to="slotProps.data.link"
                    class="text-indigo-500 font-bold"
                  >
                    {{ slotProps.data[header.field] }}
                  </nuxt-link>
                  <template v-else>
                    {{ slotProps.data[header.field] }}
                  </template>
                </slot>
              </template>
            </column>
          </template>
          <column
            v-if="hasActions"
            header-class="font-bold"
            :header="$t('common.action')"
            class="relative"
          >
            <template #body="slotProps">
              <div class="flex justify-between items-center">
                <slot name="actions" :row="slotProps.data">
                  <template v-if="actions.length > 0">
                    <button
                      v-for="action of actions"
                      :key="action.title + '-' + slotProps.data.id"
                      :title="action.title"
                      :class="action.icon"
                      class="admin-simple-card fa fa-lg"
                      @click="handleActionClicked(action, slotProps.data)"
                    />
                  </template>
                </slot>
              </div>
            </template>
          </column>
        </data-table>
      </div>
    </template>
    <template #footer>
      <paginator
        v-if="totalRecords > 1"
        :rows="rowPerPage"
        :total-records="totalRecords"
        @page="$emit('pageChanged', $event)"
      />
    </template>
  </card>
</template>

<script>
export default {
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
    pageLimitOptions: {
      type: Array,
      default() {
        return [12, 24, 48, 120, 200]
      }
    },
    selectedItems: {
      type: Array,
      default() {
        return []
      }
    },
    loading: {
      type: Boolean,
      default: false
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
    },
    contentHeight: {
      type: String,
      default: '500px'
    }
  },
  data() {
    return {
      icon: false
    }
  },
  computed: {
    hasActions() {
      return Object.values(this.actions).length > 0 || this.actions === true
    },
    selected: {
      get() {
        return this.selectedItems
      },
      set(event) {
        this.$emit('update:selected-items', event)
      }
    }
  },
  methods: {
    handleActionClicked({ handler }, row) {
      this.$emit('actionClicked', { handler, row })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .p-datatable-table {
    .p-selection-column {
      flex: none;
    }
  }
}

::v-deep {
  .p-menu.p-menu-overlay {
    top: auto !important;
    left: auto !important;
    margin-top: 140px;
    margin-left: 25px;
  }
}
</style>
