<template>
  <div class="max-w-5xl mx-auto">
    <panel :header="$t('sidebar_menu.user_roles')">
      <form-field-input
        v-model="name"
        :label="$t('common.name')"
        :placeholder="$t('common.name')"
        :errors="v$.name && v$.name.$errors"
      />
      <div class="mt-4">
        <label>{{ $t('role.title.default_permissions') }}</label>
        <div class="mt-2">
          <tag :value="$t('permission.view_property')"></tag>
          <tag :value="$t('permission.view_exclusive')"></tag>
          <tag :value="$t('permission.view_property_type')"></tag>
          <tag :value="$t('permission.view_development_type')"></tag>
          <tag :value="$t('permission.view_location')"></tag>
        </div>
      </div>
      <div v-if="users && users.length > 0" class="mt-4">
        <panel
          :header="$t('user.title.list') + '(' + users.length + ')'"
          :toggleable="true"
        >
          <data-table :value="users" :scrollable="true" scroll-height="450px">
            <column
              :header="$t('common.name')"
              field="name"
              style="min-width: 200px"
            ></column>
            <column
              :header="$t('contact.phone')"
              field="phone"
              style="min-width: 200px"
            ></column>
            <column
              :header="$t('contact.email')"
              field="email"
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
  getterType: 'role/getField',
  mutationType: 'role/updateField'
})

export default {
  name: 'RoleForm',
  setup: () => ({ v$: useVuelidate() }),

  validations() {
    return {
      name: { required, minLength: minLength(2) }
    }
  },

  computed: {
    ...mapFields({
      users: 'form.users',
      name: 'form.name'
    })
  }
}
</script>
