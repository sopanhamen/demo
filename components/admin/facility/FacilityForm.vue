<template>
  <div class="max-w-5xl mx-auto">
    <panel :header="$t('facility.label')">
      <div class="space-y-4">
        <form-field-input
          v-model="name"
          :label="$t('facility.model.name')"
          :errors="v$.name && v$.name.$errors"
        />
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
      </div>
      <div v-if="property_types && property_types.length > 0" class="mt-4">
        <panel
          :header="
            $t('property_type.title.name') + '(' + property_types.length + ')'
          "
          :toggleable="true"
        >
          <data-table
            :value="property_types"
            :scrollable="true"
            scroll-height="450px"
          >
            <column
              :header="$t('common.id')"
              field="id"
              style="min-width: 200px"
            ></column>
            <column
              :header="$t('contact.name')"
              field="name"
              style="min-width: 200px"
            ></column>
            <column
              :header="$t('common.publish')"
              field="published"
              style="min-width: 200px"
            ></column>
          </data-table>
        </panel>
      </div>
    </panel>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import { createHelpers } from 'vuex-map-fields'

const { mapFields } = createHelpers({
  getterType: 'facility/getField',
  mutationType: 'facility/updateField'
})

export default {
  setup: () => ({ v$: useVuelidate() }),

  validations() {
    return {
      name: { required, minLength: minLength(2) },
      published: { required }
    }
  },

  computed: {
    ...mapFields({
      property_types: 'form.property_types',
      name: 'form.name',
      published: 'form.published'
    })
  }
}
</script>
