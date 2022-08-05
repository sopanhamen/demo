<template>
  <div>
    <admin-property-dialog-document
      :property="documentViewProperty"
      :display.sync="displayDocumentDialog"
    />
    <admin-property-dialog-contact
      :property="contactViewProperty"
      :display.sync="displayContactDialog"
    />
    <admin-dialog-map-view
      :lat-lng="mapViewLatLng"
      :property="mapViewProperty"
      :display.sync="displayMapDialog"
    />
    <div class="space-y-4">
      <transition name="slide">
        <admin-property-filter
          v-show="showFilter"
          v-model="options.filters"
          :filter-only-my-listing.sync="onlyMyListing"
          :fetching="fetching"
          @filter="handleFilter"
          @reset="clearFilter"
        />
      </transition>
      <lazy-admin-data-view
        :layout="layout"
        :headers="headers"
        :items="items"
        :fetching="fetching"
        :row-per-page="paginationMeta.per_page"
        :total-records="paginationMeta.total"
        :sortable="options.sortable"
        :actions="true"
        grid-class="xl:grid-cols-2 lg:grid-cols-2"
        @sort="changeSort"
        @pageLimitChanged="changeLimit"
        @pageChanged="changePage"
      >
        <template #listToolbar>
          <pv-button
            v-if="layout === 'card-compact'"
            class="p-button-text py-1"
            icon="pi pi-list"
            @click="changeLayout('table')"
          />
          <pv-button
            v-else
            class="p-button-text py-1"
            icon="pi pi-table"
            @click="changeLayout('card-compact')"
          />
          <pv-button
            v-if="!options.trash"
            icon="pi pi-map"
            class="p-button-text py-1"
            @click="$emit('update:viewMode', 'map')"
          />
          <pv-button
            icon="pi pi-sync"
            class="p-button-text py-1"
            @click="handleFilter"
          />
        </template>
        <template #headerButton="{ row }">
          <admin-property-button-views-count
            v-if="
              row.listing_status === ListingStatus.AVAILABLE &&
              row.published &&
              row.published_on_website &&
              row.approved_by
            "
            :views-count="row.views_count"
            @click="viewPropertyInWebsite(row)"
          />
        </template>
        <template #header="{ row }">
          <div class="inline-flex">
            <admin-card-item-header-compact
              :title="row.title || row.id"
              :link="row.link"
            />
            <div class="flex items-center">
              <span
                v-if="isExpired(row)"
                class="bg-red-100 text-red-700 rounded font-semibold text-xs py-1 px-2 mx-2"
              >
                {{ $t('property.model.expired') + '!' }}
              </span>
            </div>
          </div>
        </template>
        <template v-if="page !== 'exclusive'" #subHeader="{ row }">
          <admin-property-exclusive-ribbon v-if="row.exclusive" />
        </template>
        <template #price="{ row }">
          <div class="mb-3 text-sm">
            <property-prices :item="row" />
          </div>
        </template>
        <template #listing_status="{ row }">
          <description-list-item
            v-if="layout !== 'table'"
            :label="$t('listing_status.label')"
            :value="listingStatusLabel(row.listing_status)"
            :value-class="'text-' + listingStatusColor(row.listing_status)"
          />
          <span
            v-else
            :class="'text-' + listingStatusColor(row.listing_status)"
          >
            {{ listingStatusLabel(row.listing_status) }}
          </span>
        </template>
        <template #expired_date="{ row }">
          <div v-if="layout !== 'table'">
            <description-list-item
              v-if="isExpired(row)"
              :value="row.expired_date"
              :label="$t('property.model.expired')"
              :value-class="'text-red-600'"
            />
            <description-list-item
              v-else
              :value="row.expired_date"
              :label="$t('property.model.expired')"
            />
          </div>
          <div v-else>
            <span :class="{ 'text-red-600': isExpired(row) }">
              {{ row.expired_date }}
            </span>
          </div>
        </template>
        <template #actions="{ row: property }">
          <pv-button
            v-if="!options.trashed"
            :disabled="!property.location.lat_lng"
            icon="pi pi-map-marker"
            class="p-button-text p-button-primary p-button"
            @click="openMapDialog(property)"
          />
          <pv-button
            v-if="canViewDocument(property) && !options.trashed"
            icon="pi pi-folder"
            class="p-button-text p-button-primary p-button"
            @click="openDocumentDialog(property)"
          />
          <pv-button
            v-if="!options.trashed"
            icon="pi pi-user"
            class="p-button-text p-button-primary p-button"
            @click="openContactDialog(property)"
          />
          <pv-button
            v-if="
              canApprove(property) && page !== 'unlisting' && !options.trashed
            "
            icon="pi pi-check"
            class="p-button-text p-button-success p-button"
            @click="confirmApproveProperty(property)"
          />
          <pv-button
            v-if="!options.trashed"
            icon="pi pi-ellipsis-v"
            class="p-button-text p-button-sm p-button-secondary"
            @click="toggleMenu($event, property)"
          />
          <pv-menu
            :ref="`menu${property.id}`"
            :popup="true"
            :model="[
              {
                label: $t('common.print'),
                icon: 'pi pi-print',
                command: () => true
              },
              {
                visible: canUpdate(property),
                label: $t('common.edit'),
                icon: 'pi pi-pencil',
                command: () => {
                  return $router.push(localePath(propertyEditPath(property)))
                }
              },
              {
                visible: canPublish(property) && page === 'unlisting',
                label: $t('common.activate'),
                icon: 'pi pi-send',
                command: () => setPropertyToListing(property)
              },
              {
                visible: canDelete(property),
                label: $t('common.delete'),
                icon: 'pi pi-trash',
                class: 'menu-danger',
                command: () => confirmDeleteProperty(property)
              }
            ]"
          />
          <pv-button
            v-if="canDelete(property) && options.trashed"
            icon="pi pi-undo"
            class="p-button-text p-button-info bg-sky-50"
            @click="confirmRestoreProperty(property)"
          />
        </template>
      </lazy-admin-data-view>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { computed, useContext, useStore } from '@nuxtjs/composition-api'
import { Permission } from '@/enums/Permission'
import { ListingStatus } from '@/enums/ListingStatus'
import { app, image } from '@/config'
import { VisitStatus } from '@/enums/VisitStatus'
import useLocation from '@/composables/useLocation'
import useCrud from '@/composables/useCrud'
import authProperty from '@/authorizations/authProperty'
import useProperty from '@/composables/useProperty'
import useFormatter from '@/composables/useFormatter'
import useCompanyBranch from '~/composables/useCompanyBranch'

export default {
  layout: 'admin',

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
    },
    trashed: {
      type: Boolean,
      default: false
    },
    published: {
      type: Boolean,
      default: true
    }
  },

  setup(props) {
    const { $auth, $service, i18n } = useContext()

    const { getters } = useStore()
    const { fetchByCompany } = useCompanyBranch()
    const companies = getters['company/getCompanies']
    const companyId = computed(() => {
      return $auth.user?.profile.company_id && companies[0]?.id
    })

    const defaultCrudOptions = {
      filters: { company_id: companyId.value, assignee_id: null },
      layout: 'card-compact'
    }

    const {
      changeLimit,
      changePage,
      changeSort,
      clearFilter,
      deleteItem,
      fetchItems,
      updateItem,
      restoreItem,
      changeLayout,
      crudOptions,
      fetching,
      paginationItems,
      paginationMeta,
      layout
    } = useCrud($service.property, props.page, defaultCrudOptions)

    const {
      isExpired,
      formatLandSize,
      formatPriceType,
      hasSalePurpose,
      hasRentPurpose,
      listingStatusColor,
      listingStatusLabel,
      propertyDetailPath,
      propertyEditPath
    } = useProperty()

    const { fullAddress } = useLocation()
    const { formatDate } = useFormatter()
    const options = computed(() => {
      return {
        relations: ['images', 'assignee', 'assignor'],
        defaultFilters: {
          published: props?.published,
          exclusive: props?.page === 'exclusive' ? true : undefined,
          company_id: $auth.user.profile?.company_id,
          country_id: $auth.user.profile?.country_id || app.default_country
        },
        sorts: {
          code: crudOptions.value?.sorts?.code && 'desc',
          created_at: crudOptions.value?.sorts?.created_at && 'desc',
          listing_date: crudOptions.value?.sorts?.listing_date && 'desc'
        },
        sortable: {
          sort: crudOptions.value?.sortable?.sort || 'desc',
          items: [
            {
              field: 'code',
              label: i18n.t('property.model.code'),
              value: crudOptions.value?.sortable?.items[0]
                ? crudOptions.value?.sortable?.items[0].value
                : true
            },
            {
              field: 'created_at',
              label: i18n.t('common.created_at'),
              value: crudOptions.value?.sortable?.items[1]
                ? crudOptions.value?.sortable?.items[1].value
                : true
            },
            {
              field: 'listing_date',
              label: i18n.t('property.model.listing_date'),
              value: crudOptions.value?.sortable?.items[2]
                ? crudOptions.value?.sortable?.items[2].value
                : true
            }
          ]
        },
        filters: {
          ...crudOptions.value?.filters
        },
        filterOptions: {
          code: 'contain',
          selling_price: 'between',
          land_size: 'between',
          owner_name: 'contain',
          owner_phone: 'contain',
          sale_name: 'contain',
          sale_phone: 'contain',
          listing_date: 'between',
          expired_listing_date: '<',
          approved_by: 'exists'
        },
        trashed: props?.trashed
      }
    })

    const { canDelete, canUpdate, canViewDocument, canApprove, canPublish } =
      authProperty()

    return {
      layout,
      changeLayout,
      changeLimit,
      changePage,
      changeSort,
      clearFilter,
      deleteItem,
      fetchItems,
      updateItem,
      restoreItem,
      crudOptions,
      fetching,
      options,
      paginationItems,
      paginationMeta,
      formatDate,
      fullAddress,
      isExpired,
      formatLandSize,
      formatPriceType,
      hasSalePurpose,
      hasRentPurpose,
      listingStatusColor,
      listingStatusLabel,
      propertyDetailPath,
      propertyEditPath,
      canViewDocument,
      canDelete,
      canUpdate,
      canApprove,
      canPublish,
      companyId,
      fetchCompanyBranches: fetchByCompany,
      v$: useVuelidate()
    }
  },

  data() {
    return {
      ListingStatus,
      Permission,
      onlyMyListing: true,

      displayDocumentDialog: false,
      documentViewProperty: null,

      displayContactDialog: false,
      contactViewProperty: null,

      displayMapDialog: false,
      mapViewProperty: null,
      mapViewLatLng: null
    }
  },

  async fetch() {
    try {
      await this.fetchItems(this.options)
      await this.fetchCompanyBranches(this.companyId)
    } catch (error) {
      this.$nuxt.error(error)
    }
  },

  computed: {
    headers() {
      return [
        {
          title: this.$t('property.model.code'),
          field: 'title',
          hidden: this.layout === 'card-compact'
        },
        { title: this.$t('common.price'), field: 'price' },
        { title: this.$t('common.status'), field: 'listing_status' },
        { title: this.$t('property.model.land.size'), field: 'landSize' },
        { title: this.$t('property.model.listing_date'), field: 'date' },
        { title: this.$t('common.assignee'), field: 'assigneeName' },
        { title: this.$t('common.address'), field: 'address', width: '200px' },
        { title: this.$t('property.model.expired'), field: 'expired_date' }
      ]
    },
    items: {
      cache: false,
      get() {
        const defaultImage = [
          {
            image_url: image.default.noImage,
            thumbnail_url: image.default.noImage
          }
        ]

        return this.paginationItems.map((property) => ({
          ...property,
          title: property.code,
          link: this.localePath(
            this.propertyDetailPath(property, this.$route.path)
          ),
          images: property?.images?.length > 0 ? property.images : defaultImage,
          landSize: this.formatLandSize(property.detail),
          date: this.formatDate(property.listing_date),
          assigneeName: property.assignee?.name,
          address: this.fullAddress(property.location),
          expired_date: this.formatDate(property.expired_listing_date)
        }))
      }
    }
  },

  methods: {
    confirmApproveProperty(property) {
      this.$confirm.require({
        message: this.$t('message.confirm_approve'),
        header: this.$t('common.confirmation'),
        icon: 'pi pi-exclamation-circle',
        acceptClass: 'p-button-success',
        accept: async () => {
          try {
            const { data } = await this.$service.property.approve(property.id)
            this.updateItem(property.id, data.data)

            this.$toast.add({
              severity: 'success',
              summary: this.$t('common.success'),
              detail: this.$t('message.success_approve'),
              life: 3000
            })
          } catch (error) {
            this.$toast.add({
              severity: 'error',
              summary: this.$t('common.failed'),
              detail: this.$t('message.error_approve'),
              life: 3000
            })
          }
        }
      })
    },

    setPropertyToListing(property) {
      this.$confirm.require({
        message: this.$t('message.confirm_publish'),
        header: this.$t('common.confirmation'),
        icon: 'pi pi-exclamation-circle',
        acceptClass: 'p-button-success',
        accept: async () => {
          try {
            const { data } = await this.$service.property.publish(property.id)
            this.updateItem(property.id, data.data)

            this.$toast.add({
              severity: 'success',
              summary: this.$t('common.success'),
              detail: this.$t('message.success_publish'),
              life: 3000
            })
          } catch (error) {
            this.$toast.add({
              severity: 'error',
              summary: this.$t('common.failed'),
              detail: this.$t('message.error_publish'),
              life: 3000
            })
          }
        }
      })
    },

    async confirmDeleteProperty(property) {
      const propertyVisited = await this.searchVisited(property)

      propertyVisited
        ? this.alertWarning()
        : this.$confirm.require({
            message: this.$t('message.confirm_delete'),
            header: this.$t('common.confirmation'),
            icon: 'pi pi-exclamation-triangle',
            acceptClass: 'p-button-danger',
            accept: async () => {
              try {
                await this.deletePropertyItem(property)
              } catch (error) {
                this.alertError()
              }
            }
          })
    },

    async searchVisited(property) {
      const { data } = await this.$service.propertyVisit.search(
        'property_id',
        property.id,
        {
          status: VisitStatus.VISITED
        }
      )

      if (data && data.length > 0) {
        return true
      }

      return false
    },

    alertWarning() {
      this.$confirm.require({
        message: this.$t('message.confirm_delete_property_visited'),
        header: this.$t('common.information_title'),
        icon: 'pi pi-exclamation-triangle text-yellow-500',
        rejectClass: 'hidden',
        acceptClass: 'p-button-warning',
        acceptLabel: this.$t('common.ok')
      })
    },

    async deletePropertyItem(property) {
      await this.deleteItem(property.id)
      this.$toast.add({
        severity: 'success',
        summary: this.$t('common.success'),
        detail: this.$t('message.success_delete'),
        life: 3000
      })
    },

    alertError() {
      this.$toast.add({
        severity: 'error',
        summary: this.$t('common.failed'),
        detail: this.$t('message.error_delete'),
        life: 3000
      })
    },

    openMapDialog(property) {
      this.mapViewProperty = property
      this.mapViewLatLng = property.location.lat_lng
      this.displayMapDialog = true
    },

    openDocumentDialog(property) {
      this.displayDocumentDialog = true
      this.documentViewProperty = property
    },

    openContactDialog(property) {
      this.displayContactDialog = true
      this.contactViewProperty = property
    },

    handleFilter() {
      const valid = this.v$.$validate()
      if (valid) {
        this.fetchItems(this.options)
      }
    },

    viewPropertyInWebsite(property) {
      const routeData = this.$router.resolve({
        path: this.localePath('/detail-listing/' + property.id)
      })
      window.open(routeData.href, '_blank')
    },

    confirmRestoreProperty(property) {
      this.$confirm.require({
        message: this.$t('message.confirm_restore'),
        header: this.$t('common.confirmation'),
        icon: 'pi pi-exclamation-triangle',
        acceptClass: 'p-button-info',
        accept: async () => {
          try {
            await this.restoreItem(property.id)
            this.$toast.add({
              severity: 'success',
              summary: this.$t('common.success'),
              detail: this.$t('message.success_restore'),
              life: 3000
            })
          } catch (error) {
            this.$toast.add({
              severity: 'error',
              summary: this.$t('common.failed'),
              detail: this.$t('message.error_restore'),
              life: 3000
            })
          }
        }
      })
    },

    toggleMenu(event, property) {
      if (this.$refs['menu' + property.id]) {
        this.$refs['menu' + property.id].toggle(event)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .p-galleria {
  .p-galleria-item-nav {
    margin-top: -2rem !important; /* make button vertically middle fair */
  }
}
</style>
