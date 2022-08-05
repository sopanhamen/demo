<template>
  <div>
    <div class="border rounded-md bg-white font-semibold text-sm text-gray-600">
      <div class="p-4 border-b">
        <p class="text-red-500 text-lg">{{ $t('project.general') }}</p>
      </div>
      <div class="p-4 space-y-3">
        <form-field-input
          v-model="name"
          :label="$t('project.name')"
          :errors="v$.name && v$.name.$errors"
          :external-errors="externalErrors.name"
        />

        <div class="grid md:grid-cols-2 grid-cols-1 gap-4">
          <form-field-select
            v-model="developmentType"
            :options="developmentTypes"
            :label="$t('project.development_type')"
            :errors="v$.developmentType && v$.developmentType.$errors"
            option-label="name"
            option-value="id"
            required
            @change="handleDevelopmentTypeChanged($event)"
          />

          <form-field-select
            v-model="developer"
            :options="developers"
            :label="$t('project.developer')"
            :errors="v$.developer && v$.developer.$errors"
            option-label="name"
            option-value="id"
            required
            @change="onDeveloperChange($event)"
          />
        </div>

        <form-field-input
          v-model="totalFloor"
          :label="$t('project.total_floor')"
          :errors="v$.totalFloor && v$.totalFloor.$errors"
          :placeholder="$t('common.number_only')"
        />

        <form-field-input
          v-model="totalUnit"
          :label="$t('project.total_unit')"
          :errors="v$.totalUnit && v$.totalUnit.$errors"
          :placeholder="$t('common.number_only')"
        />

        <!-- TODO: If Development Type is Condo or Apartment, display bedroom forms -->
        <admin-project-bedroom v-if="devTypeCondo" />

        <div class="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div class="space-y-3">
            <p class="font-bold">{{ $t('user_role.published') }}</p>
            <form-field-input-switch
              v-model="published"
              required
              :label="$t('common.publish')"
              :errors="v$.published && v$.published.$errors"
            />
          </div>
          <div class="space-y-3">
            <p class="font-bold">{{ $t('common.exclusive') }}</p>
            <form-field-input-switch
              v-model="exclusive"
              :label="$t('common.exclusive')"
              :errors="v$.exclusive && v$.exclusive.$errors"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import { createHelpers } from 'vuex-map-fields'
import useDeveloper from '@/composables/useDeveloper'

const { mapFields } = createHelpers({
  getterType: 'project/getField',
  mutationType: 'project/updateField'
})

export default {
  props: {
    externalErrors: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  validations() {
    return {
      name: { required, minLength: minLength(2) },
      developmentType: { required },
      developer: { required },
      published: { required },
      exclusive: { required }
    }
  },
  setup() {
    const {
      fetchDeveloperByDevelopmentType,
      publishedDevelopers,
      developerOfDevelopmentType
    } = useDeveloper()

    return {
      v$: useVuelidate(),
      fetchDeveloperByDevelopmentType,
      publishedDevelopers,
      developerOfDevelopmentType
    }
  },

  data() {
    return {
      devTypeCondo: false,
      developmentTypes: []
    }
  },

  computed: {
    ...mapFields({
      name: 'form.name',
      developmentType: 'form.development_type_id',
      developer: 'form.developer_id',
      published: 'form.published',
      exclusive: 'form.exclusive',
      totalFloor: 'form.total_floor',
      totalUnit: 'form.total_unit'
    }),
    developers() {
      if (this.developmentType) {
        return this.developerOfDevelopmentType(this.developmentType)
      }
      return this.publishedDevelopers()
    }
  },

  async mounted() {
    // todo: remove this because development types will be retrieved after login and cache instead
    await this.$store.dispatch('developmentType/fetchAllDevelopmentTypes')
    this.developmentTypes = await this.$store.getters[
      'developmentType/getPublishedDevelopmentTypes'
    ]
  },
  methods: {
    handleDevelopmentTypeChanged(event) {
      this.fetchDeveloperByDevelopmentType(event.value)
    },
    onDeveloperChange(event) {
      const developerId = event.value
      const developer = this.developers.find((i) => i.id === developerId)
      if (developer) {
        this.developmentType = developer.development_type_id
      }
    }
  }
}
</script>
