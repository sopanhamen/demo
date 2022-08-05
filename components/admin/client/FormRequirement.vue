<template>
  <panel :header="$t('client_requirement.label')">
    <div class="space-y-4">
      <div class="grid md:grid-cols-2 grid-cols-1 gap-4">
        <form-field-input
          v-model="purpose"
          :label="$t('common.purpose')"
          :errors="v$.purpose && v$.purpose.$errors"
          :show-clear="false"
        />
        <form-field-select
          v-model="service"
          :options="services"
          :label="$t('requirement_service.label')"
          :placeholder="$t('common.select') + '...'"
          :errors="v$.service && v$.service.$errors"
          :show-clear="false"
          option-label="label"
          option-value="value"
          required
        />
      </div>
      <form-field-select
        v-model="propertyType"
        :options="propertyTypes"
        :label="$t('property_type.title.looking_for')"
        :placeholder="$t('common.select') + '...'"
        :errors="v$.propertyType && v$.propertyType.$errors"
        option-label="name"
        option-value="id"
        multiple
        filter
      />
      <form-field-select
        v-model="developer"
        :options="developers"
        :label="$t('developer.title.looking_for')"
        :placeholder="$t('common.select') + '...'"
        :errors="v$.developer && v$.developer.$errors"
        option-label="name"
        option-value="id"
        multiple
        filter
      />
      <form-field-select
        v-model="project"
        :options="projects"
        :label="$t('project.title.looking_for')"
        :placeholder="$t('common.select') + '...'"
        :errors="v$.project && v$.project.$errors"
        option-label="name"
        option-value="id"
        multiple
        filter
      />
      <form-field-radio
        v-model="priceType"
        :label="$t('price_type.label')"
        :options="priceTypes"
        :errors="v$.priceType && v$.priceType.$errors"
        :inline="true"
      />
      <div class="grid md:grid-cols-2 grid-cols-1 gap-4">
        <form-field-input-group
          v-model="minBudget"
          :label="$t('client_requirement.model.min_budget')"
          :errors="v$.minBudget && v$.minBudget.$errors"
          type="number"
          icon="pi pi-dollar"
          color="bg-gray-200"
        />
        <form-field-input-group
          v-model="maxBudget"
          :label="$t('client_requirement.model.max_budget')"
          :errors="v$.maxBudget && v$.maxBudget.$errors"
          type="number"
          icon="pi pi-dollar"
          color="bg-gray-200"
        />
      </div>
      <div class="grid md:grid-cols-2 grid-cols-1 gap-4">
        <form-field-select
          v-model="priority"
          :options="priorities"
          :label="$t('priority.label')"
          :placeholder="$t('common.select') + '...'"
          :errors="v$.priority && v$.priority.$errors"
          :show-clear="false"
          option-label="label"
          option-value="value"
          required
        />
        <form-field-auto-complete
          v-model="property"
          :label="$t('common.property_code')"
          :suggestions="suggestedProperties"
          :errors="v$.property_id && v$.property_id.$errors"
          :force-selection="true"
          search-field="code"
          @complete="searchProperty($event)"
          @completed="setPropertyId($event)"
        />
        <!-- <form-field-select
          v-model="result"
          :options="results"
          :label="$t('requirement_result.label')"
          :placeholder="$t('common.select') + '...'"
          :errors="v$.result && v$.result.$errors"
          :show-clear="false"
          option-label="label"
          option-value="value"
          required
        /> -->
      </div>
      <fieldset class="border border-solid border-gray-300 p-4">
        <legend class="text-sm text-red-500">
          {{ $t('location.label') }}
        </legend>
        <div class="grid md:grid-cols-2 grid-cols-1 gap-4">
          <form-field-select
            v-model="preferredCountries"
            :options="countries"
            :label="$t('location.country')"
            :placeholder="$t('common.select') + '...'"
            :errors="v$.country && v$.country.$errors"
            option-label="name"
            option-value="id"
            multiple
          />
          <form-field-select
            v-model="preferredProvinces"
            :options="provinces"
            :label="$t('location.province')"
            :placeholder="$t('common.select') + '...'"
            :errors="v$.province && v$.province.$errors"
            option-label="name_en"
            option-value="id"
            multiple
            filter
          />
          <form-field-select
            v-model="preferredDistricts"
            :options="districts"
            :label="$t('location.district')"
            :placeholder="$t('common.select') + '...'"
            :errors="v$.district && v$.district.$errors"
            option-label="name_en"
            option-value="id"
            multiple
            filter
          />
          <form-field-select
            v-model="preferredCommunes"
            :options="communes"
            :label="$t('location.commune')"
            :placeholder="$t('common.select') + '...'"
            :errors="v$.commune && v$.commune.$errors"
            option-label="name_en"
            option-value="id"
            multiple
            filter
          />
          <form-field-input
            v-model="specificPlace"
            :label="$t('location.specific_place')"
            :errors="v$.specificPlace && v$.specificPlace.$errors"
          />
        </div>
      </fieldset>
      <form-field-textarea
        v-model="note"
        placeholder="..."
        :label="$t('common.note')"
        :row="3"
        :errors="v$.note && v$.note.$errors"
      />
    </div>
  </panel>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, minValue } from '@vuelidate/validators'
import { createHelpers } from 'vuex-map-fields'
import { mapGetters } from 'vuex'
import { ListingStatus } from '@/enums/ListingStatus'
const { mapFields } = createHelpers({
  getterType: 'client/getField',
  mutationType: 'client/updateField'
})

export default {
  setup: () => ({ v$: useVuelidate() }),

  validations() {
    return {
      minBudget: { minValue: minValue(1) },
      maxBudget: { minValue: minValue(1) },
      priority: { required },
      service: { required },
      result: { required }
    }
  },

  data() {
    return {
      suggestedProperties: []
    }
  },

  computed: {
    ...mapFields({
      note: 'formRequirement.note',
      minBudget: 'formRequirement.budget_min',
      maxBudget: 'formRequirement.budget_max',
      propertyType: 'formRequirement.preferred_property_types',
      developer: 'formRequirement.preferred_developers',
      project: 'formRequirement.preferred_projects',
      priceType: 'formRequirement.price_type',
      preferredCountries: 'formRequirement.preferred_countries',
      preferredProvinces: 'formRequirement.preferred_provinces',
      preferredDistricts: 'formRequirement.preferred_districts',
      preferredCommunes: 'formRequirement.preferred_communes',
      service: 'formRequirement.service',
      result: 'formRequirement.result',
      purpose: 'formRequirement.purpose',
      specificPlace: 'formRequirement.specific_place',
      priority: 'formRequirement.priority',
      property_id: 'formRequirement.property_id',
      property: 'formRequirement.property'
    }),
    ...mapGetters({
      getPriceTypes: 'resource/getPriceTypes',
      getPriorities: 'resource/getPriorities',
      propertyTypes: 'propertyType/getPropertyTypes',
      getServices: 'resource/getRequirementServices',
      getResults: 'resource/getRequirementResults',
      developers: 'developer/getDevelopers',
      projects: 'project/getProjects',
      countries: 'country/getCountries'
    }),
    provinces() {
      return this.$store.getters['province/getProvincesByCountry'](
        this.preferredCountries
      )
    },
    districts() {
      return this.$store.getters['district/getDistrictsByProvince'](
        this.preferredProvinces
      )
    },
    communes() {
      return this.$store.getters['commune/getCommunesByDistrict'](
        this.preferredDistricts
      )
    },
    projects() {
      return this.$store.getters['project/getProjectsByDeveloper'](
        this.developer
      )
    },
    priceTypes() {
      return this.getPriceTypes.map((item) => {
        return {
          value: item.value,
          label: this.$t(`price_type.model.${item.label}`)
        }
      })
    },
    priorities() {
      return this.getPriorities.map((item) => {
        return {
          value: item.value,
          label: this.$t(`priority.model.${item.label}`)
        }
      })
    },

    services() {
      return this.getServices.map((item) => {
        return {
          value: item.value,
          label: this.$t(`requirement_service.model.${item.label}`)
        }
      })
    },
    results() {
      return this.getResults.map((item) => {
        return {
          value: item.value,
          label: this.$t(`requirement_result.model.${item.label}`)
        }
      })
    }
  },

  watch: {
    developer() {
      const projectList = this.projects.map((item) => item.id)
      this.project = this.project.filter((item) => projectList.includes(item))
    }
  },

  async mounted() {
    await this.$store.dispatch('project/fetchAllProjects')
  },
  methods: {
    setPropertyId(event) {
      if (event.value) {
        this.property_id = event.value.id
      }
    },
    async searchProperty(event) {
      if (!event || !event.query) {
        return false
      }

      const code = event.query
      const { data } = await this.$service.property.search('code', code, {
        listing_status: ListingStatus.AVAILABLE,
        published: true
      })
      this.suggestedProperties = data
    }
  }
}
</script>
