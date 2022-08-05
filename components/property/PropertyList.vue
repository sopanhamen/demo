<template>
  <div :class="props.classList" :style="styleList(props)">
    <loader-box v-if="fetching" />
    <div v-else>
      <dataview-card-list
        :props="props"
        :data="properties"
        :row-per-page="paginationMeta.per_page"
        :total-records="paginationMeta.total"
        :pagination="false"
        :card-style="props.style"
        @pageLimitChanged="changeLimit"
        @pageChanged="changePage"
      />
      <div class="pb-10 text-center">
        <nuxt-link :to="localePath('/properties')" class="text-base font-bold">
          {{ $t('common.see_more_detail') }} <i class="pi pi-arrow-right"></i>
        </nuxt-link>
      </div>
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
    const { styleList } = useTheme()
    const { route, $service } = useContext()
    const {
      paginationItems,
      paginationMeta,
      changePage,
      changeLimit,
      clearFilter,
      fetchItems
    } = useCrud($service.listing, 'listing')

    const crudOptions = {
      limit: 9, // 3 rows
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
        { column: 'listing_purpose', value: route.value.query.purpose },
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
      changePage,
      changeLimit,
      clearFilter,
      fetchItems,
      styleList
    }
  },

  data() {
    return {
      fetching: true,
      purposeTitle: null,
      propertyTypeGroupTitle: null
    }
  },

  async fetch() {
    try {
      const items = await this.fetchItems(this.crudOptions)
      if (items) {
        this.fetching = false
      }
    } catch (error) {
      this.$nuxt.error(error.statusCode, error.message)
    } finally {
      this.fetching = false
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
    }
  }
}
</script>
