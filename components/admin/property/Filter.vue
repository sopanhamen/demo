<template>
  <form
    class="bg-white rounded-md shadow-sm border"
    @submit.prevent="handleSearch"
  >
    <tab-view class="rounded-md">
      <tab-panel :header="$t('common.general')">
        <admin-property-filter-general-information
          v-model="generalFilter"
          :container-class="containerClass"
        />
      </tab-panel>
      <tab-panel :header="$t('listing.label')">
        <admin-property-filter-listing
          v-model="listingFilter"
          :container-class="containerClass"
        />
      </tab-panel>
      <tab-panel :header="$t('location.label')">
        <admin-property-filter-location
          v-model="locationFilter"
          :container-class="containerClass"
          :validations="validations ? validations.location : {}"
        />
      </tab-panel>
      <tab-panel :header="$t('contact.label')">
        <admin-property-filter-contact
          v-model="contactFilter"
          container-class="grid grid-cols-1 sm:grid-cols-2"
        />
      </tab-panel>
      <tab-panel :header="$t('common.other')">
        <admin-property-filter-other
          v-model="otherFilter"
          :container-class="containerClass"
        />
      </tab-panel>
    </tab-view>
    <div class="p-5 flex flex-wrap justify-between items-center">
      <div class="text-sm flex flex-wrap space-x-10 mb-5">
        <form-field-input-switch
          v-model="onlyMyListing"
          :label="$t('property.title.my_listing_only')"
          @input="handleSwitch"
        />
        <form-field-input-switch
          v-model="expired"
          :label="$t('property.model.expired')"
          @input="handleSwitchExpired"
        />
      </div>
      <div>
        <pv-button
          :label="$t('common.filter')"
          :icon="fetching ? 'pi pi-spin pi-spinner' : 'pi pi-filter'"
          class="p-button-sm p-button-success h-12"
          type="submit"
        />
        <pv-button
          :label="$t('common.clear')"
          icon="pi pi-replay"
          class="p-button-sm p-button-danger h-12"
          type="button"
          @click="resetFilters"
        />
      </div>
    </div>
  </form>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { isValid, format } from 'date-fns'
import { app } from '@/config'

export default {
  name: 'PropertyFilter',
  props: {
    value: {
      type: [Array, Object],
      required: true
    },
    fetching: {
      type: Boolean,
      default: false
    },
    validations: {
      type: Object,
      default() {
        return {}
      }
    },
    containerClass: {
      type: [String, Array, Object],
      default() {
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4  2xl:grid-cols-5'
      }
    }
  },

  setup: () => ({
    v$: useVuelidate()
  }),

  data() {
    return {
      expired: false,
      onlyMyListing: false,
      generalFilter: {
        company_id: this.$auth.user.profile?.company_id,
        company_branch_id: this.value?.company_branch_id || null,
        team_id: this.value?.team_id || null,
        code: this.value?.code,
        property_type_id: this.value?.property_type_id || null,
        developer_id: this.value?.developer_id || null,
        project_id: this.value?.project_id || null,
        listing_date: this.value?.listing_date || null,
        valuation_report_number: this.value?.valuation_report_number || null,
        assignee_id: this.value.assignee_id,
        exclusive: this.value?.exclusive || null,
        expired_listing_date: this.value?.expired_listing_date || null
      },

      listingFilter: {
        listingPurpose: this.value?.listingPurpose || null,
        sellingPrices: this.value?.sellingPrices || null,
        landSizes: this.value?.landSizes || null,
        dataSource: this.value?.dataSource || null,
        titleDeedNumber: this.value?.titleDeedNumber || null,
        titleDeedType: this.value?.titleDeedType || null
      },

      contactFilter: {
        assignor_id: null,
        ownerContact: {
          name: null,
          primary_phone: null
        },
        saleContact: {
          name: null,
          primary_phone: null
        }
      },

      locationFilter: {
        country: app.default_country,
        province: app.default_province,
        district: null,
        commune: null,
        village: this.value?.village || null,
        street: this.value?.street || null,
        house: this.value?.house || null,
        corneredWith: this.value?.corneredWith || null,
        direction: this.value?.direction || null,
        roadCondition: this.value?.roadCondition || null,
        directStreet: this.value?.directStreet || null
      },

      otherFilter: {
        listingStatus: this.value?.listingStatus || null,
        featured: this.value?.featured || null,
        approvedBy: this.value?.approvedBy || null,
        showMap: this.value?.showMap || null,
        publishedOnWebsite: this.value?.publishedOnWebsite || null
      }
    }
  },

  watch: {
    generalFilter: {
      deep: true,
      handler(value) {
        this.onlyMyListing = value.assignee_id === this.$auth.user.id
      }
    },
    value: {
      deep: true,
      handler(newValue) {
        this.setFormValues(newValue)
      }
    },
    'value.assignee_id': {
      deep: true,
      handler(value) {
        this.onlyMyListing = value === this.$auth.user.id
      }
    }
  },

  mounted() {
    this.onlyMyListing = this.value.assignee_id === this.$auth.user.id
    this.expired = !!this.value.expired_listing_date
  },
  methods: {
    formatDate(value) {
      if (isValid(new Date(value))) {
        return format(new Date(value), 'yyyy-MM-dd')
      }

      return value
    },
    setFormValues(value) {
      this.generalFilter = {
        company_id: value.company_id,
        company_branch_id: value.company_branch_id,
        team_id: value.team_id,
        code: value.code,
        property_type_id: value.property_type_id,
        developer_id: value.developer_id,
        project_id: value.project_id,
        listing_date: value.listing_date,
        valuation_report_number: value.valuation_report_number,
        assignee_id: value.assignee_id,
        exclusive: value.exclusive
      }

      this.listingFilter = {
        listingPurpose: value.listing_purpose,
        sellingPrices: value.selling_price,
        landSizes: value.land_size,
        dataSource: value.data_source,
        titleDeedNumber: value.title_deed_number,
        titleDeedType: value.title_deed_type
      }

      this.contactFilter = {
        assignee_id: value.assignee_id,
        assignor_id: value.assignor_id,
        approved_by: value.approved_by,
        ownerContact: {
          name: value.owner_name,
          primary_phone: value.owner_phone
        },
        saleContact: {
          name: value.sale_name,
          primary_phone: value.sale_phone
        }
      }

      this.locationFilter = {
        country: value.country_id,
        province: value.province_id,
        district: value.district_id,
        commune: value.commune_id,
        village: value.village,
        street: value.street,
        house: value.house,
        corneredWith: value.cornered_with,
        direction: value.direction,
        roadCondition: value.road_condition,
        directStreet: value.direct_road_width
      }

      this.otherFilter = {
        listingStatus: value.listing_status,
        featured: value.featured,
        approvedBy: value.approved_by,
        showMap: value.show_map,
        publishedOnWebsite: value.published_on_website
      }
    },

    resetFilters() {
      this.expired = false
      this.generalFilter.assignee_id = null
      this.generalFilter.company_id = this.$auth.user.profile?.company_id
      this.locationFilter.country = app.default_country
      this.locationFilter.province = null

      this.setFormValues({
        country_id: app.default_country,
        province_id: null,
        company_id: this.$auth.user.profile?.company_id,
        assignee_id: null
      })

      this.$emit('input', {
        country_id: app.default_country,
        province_id: null,
        company_id: this.$auth.user.profile?.company_id,
        assignee_id: null
      })

      this.$emit('reset', {
        country_id: app.default_country,
        province_id: null,
        company_id: this.$auth.user.profile?.company_id,
        assignee_id: null
      })

      this.handleSearch()
    },

    handleSearch() {
      this.$emit('input', {
        ...this.generalFilter,

        // listingFilter
        listing_purpose: this.listingFilter.listingPurpose,
        selling_price: this.listingFilter.sellingPrices,
        land_size: this.listingFilter.landSizes,
        data_source: this.listingFilter.dataSource,
        title_deed_number: this.listingFilter.titleDeedNumber,
        title_deed_type: this.listingFilter.titleDeedType,

        // locationFilter
        country_id: this.locationFilter.country,
        province_id: this.locationFilter.province,
        district_id: this.locationFilter.district,
        commune_id: this.locationFilter.commune,
        village: this.locationFilter.village,
        street: this.locationFilter.street,
        house: this.locationFilter.house,
        cornered_with: this.locationFilter.corneredWith,
        direction: this.locationFilter.direction,
        road_condition: this.locationFilter.roadCondition,
        direct_road_width: this.locationFilter.directStreet,

        // contactFilter
        assignor_id: this.contactFilter.assignor_id,
        owner_name: this.contactFilter.ownerContact.name,
        owner_phone: this.contactFilter.ownerContact.primary_phone,
        sale_name: this.contactFilter.saleContact.name,
        sale_phone: this.contactFilter.saleContact.primary_phone,

        // otherFilter
        listing_status: this.otherFilter.listingStatus,
        featured: this.otherFilter.featured,
        approved_by: this.otherFilter.approvedBy,
        show_map: this.otherFilter.showMap,
        published_on_website: this.otherFilter.publishedOnWebsite
      })

      this.$emit('filter', this.value)
    },
    handleSwitch(event) {
      this.generalFilter.assignee_id = event ? this.$auth.user.id : null
      if (this.expired) {
        this.setFilterExpiredDateValue(this.expired)
      }
      this.handleSearch()
    },
    handleSwitchExpired(event) {
      this.setFilterExpiredDateValue(event)
      this.handleSearch()
    },
    setFilterExpiredDateValue(event) {
      this.generalFilter.expired_listing_date = event
        ? this.formatDate(new Date())
        : null
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .p-tabview {
  .p-tabview-nav {
    background: transparent;
  }
}
</style>
