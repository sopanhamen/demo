<template>
  <div class="space-y-4">
    <admin-page-header :buttons="buttons">
      <template #title>
        <i :class="icon" class="text-3xl" />
        <span class="text-3xl">{{ title }}</span>
        <tag
          v-if="!fetching && isExpired(property)"
          :severity="'danger'"
          :value="$t('property.model.expired') + '!'"
        />
      </template>
    </admin-page-header>
    <div v-if="!fetching" class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div class="space-y-4">
        <admin-property-detail-general />
        <admin-property-detail-business
          v-show="isBusinessPropertyType(property.property_type_id)"
        />
        <admin-property-detail-land-description />
        <admin-property-detail-building-description
          v-show="isBuildingPropertyType(property.property_type_id)"
        />
        <admin-property-detail-facilities />
        <admin-property-detail-publishing-option />
        <admin-property-detail-documents v-if="canViewDocument" />
        <admin-property-detail-images />
      </div>
      <div class="space-y-4">
        <admin-property-detail-contact />
        <admin-property-detail-sale-or-rent-information />
        <admin-property-detail-Location />
        <panel :header="$t('common.date')" :toggleable="true">
          <div class="grid grid-cols-1 lg:grid-cols-2">
            <text-block
              :label="$t('common.created_at')"
              :description="formatDateTime(property.created_at)"
            />
            <text-block
              :label="$t('common.updated_at')"
              :description="formatDateTime(property.updated_at)"
            />
          </div>
        </panel>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import useProperty from '@/composables/useProperty'
import authProperty from '@/authorizations/authProperty'
import { ListingStatus } from '@/enums/ListingStatus'
import useFormatter from '@/composables/useFormatter'

export default {
  props: {
    title: {
      type: String,
      default() {
        return this.$t('property.title.detail')
      }
    },
    icon: {
      type: String,
      default: 'fa fa-home'
    }
  },

  setup() {
    const {
      isBusinessPropertyType,
      isBuildingPropertyType,
      isExpired,
      propertyListingPath,
      propertyDetailPath,
      propertyEditPath
    } = useProperty()
    const { canUpdate, canViewDocument } = authProperty()
    const { formatDateTime } = useFormatter()

    return {
      canUpdate,
      canViewDocument,
      isExpired,
      isBusinessPropertyType,
      isBuildingPropertyType,
      propertyListingPath,
      propertyDetailPath,
      propertyEditPath,
      formatDateTime
    }
  },

  data() {
    return {
      ListingStatus,
      fetching: true
    }
  },

  async fetch() {
    try {
      const property = await this.findProperty(this.$route.params.property)
      if (property) {
        this.fetching = false
      }
    } catch (error) {
      this.fetching = false
      this.$nuxt.error({ statusCode: error.statusCode, message: error.message })
    }
  },

  computed: {
    ...mapState({
      property: (state) => state.property.selectedProperty || {}
    }),
    buttons() {
      return [
        {
          style: 'secondary',
          icon: 'pi pi-eye',
          text: this.$t('common.view_on_website'),
          link: '/detail-listing/' + this.$route.params.property,
          linkTarget: '_blank',
          authorized:
            this.property.listing_status === ListingStatus.AVAILABLE &&
            this.property.publishing?.published &&
            this.property.publishing?.published_on_website &&
            this.property.approved_by
        },
        {
          icon: 'pi pi-pencil',
          text: this.$t('common.edit'),
          link: this.propertyEditPath(this.property),
          authorized: this.canUpdate(this.property)
        },
        {
          style: 'danger',
          icon: 'pi pi-times',
          text: this.$t('common.close'),
          link: this.$route.query.ref
            ? this.localePath(this.$route.query.ref)
            : this.localePath('/admin/properties')
        }
      ]
    }
  },

  methods: {
    ...mapActions({
      findProperty: 'property/findProperty'
    })
  }
}
</script>
