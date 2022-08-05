<template>
  <panel :header="$t('project.location')">
    <div class="space-y-3">
      <div :class="containerClass">
        <slot name="slot-top"></slot>
        <form-field-select
          :value="value.country_id"
          :options="countries"
          :label="$t('location.country')"
          :placeholder="$t('common.select') + '...'"
          :errors="
            v$.value && v$.value.country_id && v$.value.country_id.$errors
          "
          :required="isRequired('country_id')"
          option-label="name"
          option-value="id"
          @input="update('country_id', $event)"
        />
        <form-field-select
          :value="value.province_id"
          :options="provinces"
          :label="$t('location.province')"
          :placeholder="$t('common.select') + '...'"
          :errors="
            v$.value && v$.value.province_id && v$.value.province_id.$errors
          "
          :required="isRequired('province_id')"
          option-label="name_en"
          option-value="id"
          filter
          @input="update('province_id', $event)"
        />
        <form-field-select
          :value="value.district_id"
          :options="districts"
          :label="$t('location.district')"
          :placeholder="$t('common.select') + '...'"
          :errors="
            v$.value && v$.value.district_id && v$.value.district_id.$errors
          "
          :required="isRequired('district_id')"
          option-label="name_en"
          option-value="id"
          filter
          @input="update('district_id', $event)"
        />
        <form-field-select
          :value="value.commune_id"
          :options="communes"
          :label="$t('location.commune')"
          :placeholder="$t('common.select') + '...'"
          :errors="
            v$.value && v$.value.commune_id && v$.value.commune_id.$errors
          "
          :required="isRequired('commune_id')"
          option-label="name_en"
          option-value="id"
          filter
          @input="update('commune_id', $event)"
        />
      </div>
      <div>
        <admin-dialog-map-picker
          :display.sync="display"
          :lat-lng="value.lat_lng"
          @picked="update('lat_lng', $event)"
        />
        <form-field-input-group
          :value="value.lat_lng"
          :label="$t('location.lat_lng')"
          :errors="v$.value && v$.value.lat_lng && v$.value.lat_lng.$errors"
          placeholder="latitude, longitude"
          position="right"
          icon="pi pi-map-marker"
          color="bg-indigo-600 text-white cursor-pointer"
          @input="update('lat_lng', $event)"
          @click="display = true"
        />
      </div>
      <form-field-select-button
        v-model="published"
        :label="$t('common.publish')"
        :options="[
          { label: $t('common.published'), value: true },
          { label: $t('common.un_publish'), value: false }
        ]"
        option-value="value"
        option-label="label"
      />
      <div>
        <label class="font-bold text-sm mb-1">
          {{ $t('common.logo') }}
        </label>
        <admin-form-upload-image
          :image="logo ? logo.url : null"
          @delete-image="logo = null"
          @uploaded="logo = $event"
        />
      </div>
    </div>
  </panel>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { mapGetters } from 'vuex'
import { createHelpers } from 'vuex-map-fields'

const { mapFields } = createHelpers({
  getterType: 'company/getField',
  mutationType: 'company/updateField'
})

export default {
  name: 'CompanyFormLocation',
  props: {
    value: {
      type: Object,
      required: true
    },
    validation: {
      type: Object,
      default() {
        return {}
      }
    },
    containerClass: {
      type: [Array, Object, String],
      default: 'grid grid-cols-1 sm:grid-cols-2 gap-4'
    }
  },
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      display: false
    }
  },

  validations() {
    return {
      value: this.validation
    }
  },

  computed: {
    ...mapGetters({
      companies: 'company/getCompanies'
    }),
    ...mapFields({
      published: 'form.published',
      logo: 'form.logo'
    }),
    ...mapGetters({
      countries: 'country/getCountries'
    }),
    provinces() {
      return this.$store.getters['province/getProvincesByCountry']([
        this.value.country_id
      ])
    },
    districts() {
      return this.$store.getters['district/getDistrictsByProvince']([
        this.value.province_id
      ])
    },
    communes() {
      return this.$store.getters['commune/getCommunesByDistrict']([
        this.value.district_id
      ])
    }
  },

  methods: {
    update(key, value) {
      this.$emit('input', { ...this.value, [key]: value })
    },
    isRequired(input) {
      const findRule = Object.entries(this.validation).find(
        ([key, value]) => value.required && key === input
      )
      return findRule ? findRule.length > 0 : false
    }
  }
}
</script>
