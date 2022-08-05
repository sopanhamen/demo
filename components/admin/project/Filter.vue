<template>
  <div>
    <form @submit.prevent="handelSearch"></form>
    <panel :header="$t('common.filter')" :toggleable="true">
      <admin-form-location
        v-model="location"
        container-class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
      >
        <form-field-input
          slot="top"
          v-model="name"
          :placeholder="$t('project.model.name')"
          :label="$t('project.model.name')"
        />
        <form-field-select
          slot="top"
          v-model="developmentTypeId"
          :options="developmentTypes"
          :label="$t('project.development_type')"
          option-label="name"
          option-value="id"
          @change="handleDevelopmentTypeChanged($event)"
        />
        <form-field-select
          slot="top"
          v-model="developerId"
          :options="developers"
          :label="$t('project.developer')"
          option-label="name"
          option-value="id"
          @change="onDeveloperChange($event)"
        />
      </admin-form-location>
      <div class="mt-3 flex justify-end sm:space-x-3">
        <pv-button
          :label="$t('common.search')"
          class="p-button-sm"
          icon="pi pi-search"
          type="submit"
          @click="handelSearch()"
        />
        <pv-button
          :label="$t('common.clear')"
          class="p-button-sm p-button-danger"
          icon="pi pi-replay"
          @click="clearProjectFilters()"
        />
      </div>
    </panel>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { app } from '@/config'
import useDeveloper from '@/composables/useDeveloper'
export default {
  name: 'FilterProject',

  props: {
    value: {
      type: Array,
      required: true
    }
  },
  setup() {
    const {
      allDevelopers,
      fetchDeveloperByDevelopmentType,
      publishedDevelopers,
      developerOfDevelopmentType
    } = useDeveloper()
    return {
      allDevelopers,
      fetchDeveloperByDevelopmentType,
      publishedDevelopers,
      developerOfDevelopmentType
    }
  },

  data() {
    return {
      name: null,
      developmentTypeId: null,
      developerId: null,
      location: {
        country_id: app.default_country,
        province_id: app.default_province,
        district_id: null,
        commune_id: null
      }
    }
  },

  computed: {
    ...mapGetters({
      developmentTypes: 'developmentType/getDevelopmentTypes'
    }),
    developers() {
      if (this.developmentTypeId) {
        return this.developerOfDevelopmentType(this.developmentTypeId)
      }
      return this.allDevelopers()
    }
  },
  mounted() {
    this.name = this.findColumn('name')
    this.developmentTypeId = this.findColumn('development_type_id')
    this.developerId = this.findColumn('developer_id')
    this.location.country_id = this.findColumn('country_id')
    this.location.province_id = this.findColumn('province_id')
    this.location.district_id = this.findColumn('district_id')
    this.location.commune_id = this.findColumn('commune_id')
  },

  methods: {
    handleDevelopmentTypeChanged(event) {
      this.fetchDeveloperByDevelopmentType(event.value)
    },
    onDeveloperChange(event) {
      const developerId = event.value
      const developer = this.developers.find((i) => i.id === developerId)
      if (developer) {
        this.developmentTypeId = developer.development_type_id
      }
    },
    handelSearch() {
      const filters = [
        { column: 'name', value: this.name },
        { column: 'development_type_id', value: this.developmentTypeId },
        { column: 'developer_id', value: this.developerId },
        { column: 'country_id', value: this.location.country_id },
        { column: 'province_id', value: this.location.province_id },
        { column: 'district_id', value: this.location.district_id },
        { column: 'commune_id', value: this.location.commune_id }
      ]

      this.$emit('input', filters)
      this.$emit('onSearch', filters)
    },
    findColumn(column) {
      const findColumn = this.value.find((i) => i.column === column)
      return findColumn?.value || null
    },

    clearProjectFilters() {
      this.name = null
      this.developmentTypeId = null
      this.developerId = null
      this.location = {
        country_id: app.default_country,
        province_id: app.default_province,
        district_id: null,
        commune_id: null
      }

      this.$emit('onReset', true)
    }
  }
}
</script>
