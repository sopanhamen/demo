<template>
  <panel :header="$t('company_info.about')">
    <div class="space-y-3">
      <form-field-input
        v-model="companyName"
        :label="$t('common.name')"
        :errors="v$.companyName && v$.companyName.$errors"
        required
      />

      <form-field-input
        v-model="yearEstablished"
        type="text"
        :label="$t('company_info.year_established')"
        :placeholder="$t('common.enter')"
        :errors="v$.yearEstablished && v$.yearEstablished.$errors"
      />

      <form-field-textarea
        v-model="summary"
        :placeholder="$t('common.enter')"
        :label="$t('common.summary')"
        :errors="v$.summary && v$.summary.$errors"
      />

      <div>
        <label class="text-sm mb-1 font-bold">
          {{ $t('common.description') }}
        </label>
        <pv-editor
          v-model="description"
          editor-style="height: 100px"
          :placeholder="$t('common.enter')"
        />
      </div>

      <div>
        <label class="text-sm mb-1 font-bold">
          {{ $t('common.vision') }}
        </label>
        <pv-editor
          v-model="vision"
          editor-style="height: 100px"
          :placeholder="$t('common.enter')"
        />
      </div>

      <div>
        <label class="text-sm mb-1 font-bold">
          {{ $t('common.mission') }}
        </label>
        <pv-editor
          v-model="mission"
          editor-style="height: 100px"
          :placeholder="$t('common.enter')"
        />
      </div>

      <div>
        <label class="text-sm mb-1 font-bold">
          {{ $t('common.core_value') }}
        </label>
        <pv-editor
          v-model="coreValue"
          editor-style="height: 100px"
          :placeholder="$t('common.enter')"
        />
      </div>
    </div>
  </panel>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, minValue } from '@vuelidate/validators'
import { createHelpers } from 'vuex-map-fields'
import { mapGetters } from 'vuex'

const { mapFields } = createHelpers({
  getterType: 'company/getField',
  mutationType: 'company/updateField'
})

export default {
  name: 'CompanyFormAboutCompany',
  setup: () => ({ v$: useVuelidate() }),

  validations() {
    return {
      companyName: {
        required
      },
      yearEstablished: {
        minValue: minValue(1900)
      }
    }
  },
  data() {
    return {
      companies: [],
      filterFacility: null
    }
  },

  computed: {
    ...mapGetters({
      getCompany: 'resource/getCompany'
    }),
    ...mapFields({
      companyName: 'form.name',
      yearEstablished: 'form.year_established',
      summary: 'form.summary',
      description: 'form.description',
      vision: 'form.vision',
      mission: 'form.mission',
      coreValue: 'form.key_value'
    }),

    company() {
      return this.getCompany.map((item) => {
        return {
          value: item.value
        }
      })
    }
  }
}
</script>
