<template>
  <div class="bg-gray-50 rounded">
    <h4 class="px-3 py-4 border-b-2 uppercase font-semibold text-red-600">
      {{ $t('common.general_information') }}
    </h4>
    <div class="px-3 grid grid-cols-1 lg:grid-cols-2 gap-8 py-5">
      <div>
        <p class="pb-2 font-bold">
          {{ $t('common.name') }} <span class="text-red-500">*</span>
        </p>
        <input-text v-model="name" type="text" class="h-9 w-full" />
          <div v-if="v$.name">
          <small
            v-for="error of v$.name.$errors"
            :key="error.$uuid"
            class="p-invalid text-red-500"
          >
            {{ error.$message }}
          </small>
        </div>
      </div>
       <div class="space-y-3">
          <p>{{ $t('common.published') }}</p>
          <div class="p-field-radiobutton">
            <radio-button
              id="radPublish"
              v-model="published"
              input-id="published-radio"
              name="publish"
              :value="true"
            />
            <label for="radPublish">{{ $t('common.publish') }}</label>
          </div>
          <div class="p-field-radiobutton">
            <radio-button
              id="radUnpublish"
              v-model="published"
              input-id="published-radio"
              name="publish"
              :value="false"
            />
            <label for="radUnpublish">{{ $t('common.un_publish') }}</label>
          </div>
          <div v-if="v$.published">
            <small
              v-for="error of v$.published.$errors"
              :key="error.$uuid"
              class="p-invalid text-red-500"
            >
              {{ error.$message }}
            </small>
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

const { mapFields } = createHelpers({
  getterType: 'clientType/getField',
  mutationType: 'clientType/updateField'
})

export default {
  name: 'NewClientType',
  setup: () => ({ v$: useVuelidate() }),

  validations() {
    return {
      name: {
        required,
        minLength: minLength(2)
      }
    }
  },
  computed: {
    ...mapFields({
      name: 'form.name',
      published: 'form.published'
    })
  }
}
</script>
