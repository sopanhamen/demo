<template>
  <div class="bg-gray-50 rounded">
    <h4 class="px-3 py-4 border-b-2 uppercase font-semibold text-red-600">
      {{ $t('common.general_information') }}
    </h4>
    <div class="px-3 grid grid-cols-1 lg:grid-cols-2 gap-8 py-5">
      <div class="space-y-5">
        <div>
          <p class="pb-2 font-bold">
            {{ $t('common.name') }} <span class="text-red-500">*</span>
          </p>
          <input-text v-model="name" type="text" class="h-10 w-full" />
        </div>

        <form-field-select
          v-model="propertyTypeGroup"
          :options="propertyTypeGroups"
          :label="$t('property_type_group.label')"
          :placeholder="$t('common.select') + '...'"
          :errors="v$.propertyTypeGroup && v$.propertyTypeGroup.$errors"
          option-label="label"
          option-value="value"
          required
        />

        <form-field-select
          v-model="developmentType"
          :options="developmentTypes"
          :label="$t('development_type.label')"
          :placeholder="$t('common.select') + '...'"
          :errors="v$.developmentType && v$.developmentType.$errors"
          option-label="name"
          option-value="id"
        />
      </div>
      <div class="space-y-5">
        <div class="space-y-3">
          <p class="font-bold">{{ $t('user_role.published') }}</p>
          <div class="p-field-radiobutton flex space-x-1">
            <radio-button
              id="radPublish"
              v-model="published"
              input-id="published-radio"
              name="publish"
              :value="true"
            />
            <label for="radPublish" class="cursor-pointer font-semibold">
              {{ $t('edit_client.publish') }}</label
            >
          </div>
          <div class="p-field-radiobutton flex space-x-1">
            <radio-button
              id="radUnpublish"
              v-model="published"
              input-id="published-radio"
              name="publish"
              :value="false"
            />
            <label for="radUnpublish" class="cursor-pointer font-semibold"
              >{{ $t('edit_client.un_publish') }}
            </label>
          </div>
        </div>
      </div>
    </div>

    <div>
      <div class="max-w-xl px-3 mb-4">
        <p class="pb-2 font-bold">
          {{ $t('property_type.facilities') }}
        </p>
        <input-text
          v-model="filterFacility"
          type="text"
          :placeholder="$t('property_type.title.search')"
          class="h-10 w-full"
          @input="setValue"
        />
      </div>
      <div class="flex flex-wrap px-3 py-3">
        <div v-for="facility of getFacilities" :key="facility.id">
          <div
            v-show="isContain(facility.name)"
            class="field-checkbox w-96 py-3"
          >
            <checkbox
              :id="facility.id"
              v-model="selectedFacilities"
              :value="facility.id"
              name="facility"
              class="pb-5"
            />
            <label :for="facility.id" class="px-2">{{ facility.name }}</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { createHelpers } from 'vuex-map-fields'
import { mapGetters } from 'vuex'

const { mapFields } = createHelpers({
  getterType: 'propertyType/getField',
  mutationType: 'propertyType/updateField'
})

export default {
  name: 'PropertyTypeForm',
  setup: () => ({ v$: useVuelidate() }),

  validations() {
    return {
      name: { required },
      propertyTypeGroup: { required },
      published: { required }
    }
  },

  data() {
    return {
      developmentTypes: [],
      filterFacility: null
    }
  },

  computed: {
    ...mapGetters({
      getPropertyTypeGroups: 'resource/getPropertyTypeGroups',
      getFacilities: 'facility/getFacilities'
    }),
    ...mapFields({
      name: 'form.name',
      developmentType: 'form.development_type_id',
      published: 'form.published',
      propertyTypeGroup: 'form.property_type_group',
      selectedFacilities: 'form.facilities'
    }),

    propertyTypeGroups() {
      return this.getPropertyTypeGroups.map((item) => {
        return {
          value: item.value,
          label: this.$t(`property_type_group.model.${item.label}`)
        }
      })
    }
  },

  async mounted() {
    await this.$store.dispatch('developmentType/fetchAllDevelopmentTypes')
    this.developmentTypes = await this.$store.getters[
      'developmentType/getPublishedDevelopmentTypes'
    ]
  },

  methods: {
    setValue() {
      this.tmp = this.filterFacility
    },
    isContain(facilityName) {
      if (!this.filterFacility) {
        return true
      }
      return facilityName
        .toLowerCase()
        .includes(String(this.filterFacility).toLowerCase())
    }
  }
}
</script>
