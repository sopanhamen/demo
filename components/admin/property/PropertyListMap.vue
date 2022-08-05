<template>
  <div class="relative sm:space-y-4">
    <transition name="slide">
      <div
        v-show="showFilter"
        class="lg:absolute sm:static lg:w-1/3 md:w-full top-16 left-2 z-40"
      >
        <admin-property-filter
          v-model="crudOptions.filters"
          :validations="filterValidations"
          container-class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2"
          @filter="handleFilter"
        />
      </div>
    </transition>
    <admin-property-maps
      :properties="paginationItems"
      :centered-property="centeredProperty"
      @zoom_changed="onMapChange"
    >
      <template #header>
        <div class="flex justify-between space-x-2 py-3 px-4">
          <div class="px-2 text-base font-bold">
            {{ $t('common.total_markers') }}: {{ paginationMeta.total }}
          </div>
          <div>
            <pv-button
              icon="pi pi-sync"
              class="p-button-text py-1"
              @click="refresh"
            />
            <pv-button
              icon="pi pi-list"
              class="p-button-text py-1"
              @click="$emit('update:viewMode', 'list')"
            />
            <pv-button
              icon="pi pi-map"
              class="p-button-text py-1"
              :disabled="true"
            />
          </div>
        </div>
      </template>
    </admin-property-maps>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import { useContext } from '@nuxtjs/composition-api'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import useCrud from '@/composables/useCrud'
import useProperty from '@/composables/useProperty'

export default {
  beforeRouteLeave(to, from, next) {
    this.clearItems()
    next()
  },

  props: {
    viewMode: {
      type: String,
      default: 'list'
    },
    showFilter: {
      type: Boolean,
      default: true
    },
    page: {
      type: String,
      default: 'property'
    }
  },

  setup(props) {
    const { $service } = useContext()
    const {
      paginationItems,
      paginationMeta,
      fetchItems,
      nextItems,
      clearItems
    } = useCrud($service.propertyMap, props.page + 'Map')

    const { findCenteredProperty } = useProperty()

    return {
      v$: useVuelidate(),
      paginationItems,
      paginationMeta,
      fetchItems,
      nextItems,
      clearItems,
      findCenteredProperty
    }
  },

  data() {
    return {
      fetching: true,

      crudOptions: {
        page: 1,
        limit: 500,
        defaultFilters: {
          published: this.page !== 'unlisting',
          exclusive: this.page === 'exclusive' ? true : undefined,
          company_id: this.$auth.user.profile?.company_id
        },
        sorts: { code: 'desc', listing_date: 'desc', created_at: 'desc' },
        filters: {},
        filterOptions: {
          code: 'contain',
          selling_price: 'between',
          land_size: 'between',
          owner_name: 'contain',
          owner_phone: 'contain',
          sale_name: 'contain',
          sale_phone: 'contain',
          listing_date: 'date'
        }
      },

      filterValidations: {
        location: {
          country_id: { required },
          province_id: { required }
        }
      }
    }
  },

  async fetch() {
    await this.fetchItems(this.crudOptions)
  },

  computed: {
    centeredProperty() {
      const center = this.findCenteredProperty(this.paginationItems)
      return center
    }
  },

  methods: {
    onMapChange: debounce(async function (event) {
      const data = await this.nextItems(this.crudOptions)
      return data
    }, 1000),

    async handleFilter() {
      const valid = await this.v$.$validate()
      if (valid) {
        await this.fetchItems(this.crudOptions)
      }
    },

    refresh() {
      const valid = this.v$.$validate()
      if (valid) {
        this.fetchItems(this.crudOptions)
      }
    }
  }
}
</script>
