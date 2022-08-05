<template>
  <div class="w-full">
    <div class="mx-auto lg:max-w-4xl sm:max-w-full sm:w-full space-y-5">
      <div class="w-full sm:flex sm:space-x-5">
        <div class="flex-auto">
          <admin-form-location
            v-model="filters"
            container-class="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-4"
            input-class="text-sm pt-1 pb-1 px-3 rounded-lg min-w-20 shadow-sm"
            :hidden-fields="['country_id']"
          >
            <template #top>
              <form-field-select
                v-model="filters.purpose"
                :options="purposes"
                :show-clear="false"
                :label="$t('common.look_for')"
                option-label="name"
                option-value="value"
                input-class="text-sm pt-1 pb-1 px-3 rounded-lg min-w-20 shadow-sm"
              />
            </template>
          </admin-form-location>
        </div>
        <div class="flex-1">
          <button
            class="w-28 min-w-full mt-6 text-sm text-center px-4 py-4 bg-primary text-white rounded-md shadow-md"
            @click="searchProperty()"
          >
            <i class="fa fa-search" />
            {{ $t('common.search') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ListingPurpose, ListingPurposeLabel } from '@/enums/ListingPurpose'
import { app } from '@/config'

export default {
  data() {
    return {
      filters: {
        purpose: ListingPurpose.RENT_OR_SALE,
        country_id: app.default_country,
        province_id: app.default_province,
        district_id: null
      }
    }
  },

  computed: {
    purposes() {
      return Object.values(ListingPurpose).map((purpose) => ({
        value: purpose,
        name: this.$t('listing_purpose.model.' + ListingPurposeLabel[purpose])
      }))
    }
  },

  methods: {
    searchProperty() {
      this.$router.push({
        path: this.localePath('/properties'),
        query: {
          ...this.filters
        }
      })
    }
  }
}
</script>

<style scoped>
@import '~/assets/css/collapse.scss';
</style>

<style lang="scss" scoped>
::v-deep .p-inputtext {
  box-shadow: none !important;
}

::v-deep .p-selectbutton {
  .p-button {
    &,
    &:focus,
    &:active {
      outline: none !important;
      border-color: transparent !important;
      box-shadow: none !important;
      padding-top: 0.9rem;
      padding-bottom: 0.9rem;
    }
  }

  .p-button.p-highlight {
    background: var(--color-secondary) !important;
    color: var(--color-primary) !important;
    padding-top: 0.92rem;
    padding-bottom: 0.92rem;

    .p-button-label {
      font-weight: bold !important;
    }
  }
}
</style>
