<template>
  <div :style="styleList(props)" :class="sidebarClass">
    <property-advanced-search-form
      v-model="crudOptions.filters"
      :card-style="props.style"
      class="xl:px-0 px-8 xl:w-80 w-full flex-auto md:flex-none"
      wrapper-class="bg-white border p-10 grid grid-cols-1"
      @search="fetchItems(crudOptions)"
      @reset="clearFilter"
    />
    <div class="flex-1 px-8">
      <loader-box v-if="fetching" />
      <dataview-card-list
        v-else
        :props="props"
        :data="properties"
        :row-per-page="paginationMeta.per_page"
        :total-records="paginationMeta.total"
        :card-style="props.style"
        :wrapper-class="wrapperClass"
        @pageLimitChanged="changeLimit"
        @pageChanged="changePage"
      />
    </div>
  </div>
</template>

<script>
import { useContext } from '@nuxtjs/composition-api'
import useCrud from '@/composables/useCrud'
import useTheme from '@/composables/useTheme'

export default {
  props: {
    props: {
      type: Object,
      required: true
    }
  },

  setup() {
    const { route, $service } = useContext()
    const { styleList } = useTheme()

    const {
      paginationItems,
      paginationMeta,
      fetching,
      changePage,
      changeLimit,
      clearFilter,
      fetchItems
    } = useCrud($service.listing, 'listing')

    const crudOptions = {
      limit: 20, // 5 rows
      relations: [
        'images',
        'property_type',
        'assignee',
        'assignee.profile',
        'assignee.profile.contact'
      ],
      filterOptions: {
        code: 'contain'
      },
      filters: [
        { column: 'listing_purpose', value: [route.value.query.purpose] },
        { column: 'property_type_group', value: route.value.query.group },
        { column: 'country_id', value: route.value.query.country_id },
        { column: 'province_id', value: route.value.query.province_id },
        { column: 'district_id', value: route.value.query.district_id },
        { column: 'commune_id', value: route.value.query.commune_id }
      ]
    }

    return {
      crudOptions,
      paginationItems,
      paginationMeta,
      fetching,
      changePage,
      changeLimit,
      clearFilter,
      fetchItems,
      styleList
    }
  },

  data() {
    return {
      purposeTitle: null,
      propertyTypeGroupTitle: null
    }
  },

  async fetch() {
    try {
      await this.fetchItems(this.crudOptions)
    } catch (error) {
      this.$nuxt.error(error.statusCode, error.message)
    }
  },

  computed: {
    properties() {
      return this.paginationItems.map((property) => {
        return {
          ...property,
          title: property.code,
          link: this.localePath(`/admin/properties/${property.id}/detail`),
          createdAt: this.$options.filters.formatDate(property.listing_date)
        }
      })
    },
    sidebarClass() {
      if (this.props.sidebarStyle === 'right') {
        return 'flex flex-wrap flex-row-reverse gap-x-2 gap-y-10 my-8'
      }

      return 'flex flex-wrap gap-x-2 gap-y-10 my-8'
    },
    wrapperClass() {
      if (Number(this.props.gridStyle) === 2) {
        return 'grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6'
      }

      if (Number(this.props.gridStyle === 4)) {
        return 'grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
      }

      return 'grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
    }
  },

  watch: {
    '$route.query.group': {
      handler() {
        const filters = [
          ...this.crudOptions.filters,
          { column: 'property_type_group', value: this.$route.query.group },
          { column: 'listing_purpose', value: this.$route.query.purpose }
        ]

        this.crudOptions = { ...this.crudOptions, filters }
        this.$fetch()
      }
    },
    '$route.query.purpose': {
      handler() {
        const filters = [
          ...this.crudOptions.filters,
          { column: 'property_type_group', value: this.$route.query.group },
          { column: 'listing_purpose', value: [this.$route.query.purpose] }
        ]

        this.crudOptions = { ...this.crudOptions, filters }
        this.$fetch()
      }
    }
  }
}
</script>
