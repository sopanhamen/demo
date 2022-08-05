<template>
  <panel :header="$t('common.filter')" :toggleable="true">
    <form @submit.prevent="handleSearch">
      <div :class="classContainer">
        <form-field-input v-model="name" :label="$t('person.name')" />
        <form-field-input
          v-model="phone"
          :label="$t('contact.phone')"
          :clearable="true"
          placeholder="23000000"
        />
        <form-field-input
          v-model="email"
          :label="$t('contact.email')"
          :clearable="true"
          placeholder="bopha@example.com"
        />
        <form-field-select
          v-model="role_id"
          :options="roles"
          :label="$t('common.role')"
          :show-clear="true"
          option-value="id"
          option-label="name"
        />
        <form-field-select
          v-model="display"
          :options="displayOnWebsite"
          :label="$t('common.role')"
          :show-clear="true"
          option-value="value"
          option-label="name"
        />
      </div>
      <div class="mt-3 flex justify-end sm:space-x-3">
        <pv-button
          :label="$t('common.search')"
          icon="pi pi-search"
          type="submit"
          class="p-button-sm"
        />
        <pv-button
          :label="$t('common.clear')"
          icon="pi pi-replay"
          type="button"
          class="p-button-sm p-button-danger"
          @click="handleResetSearch"
        />
      </div>
    </form>
  </panel>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    value: {
      type: Array,
      required: true
    },
    classContainer: {
      type: String,
      default() {
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-md-3 lg:grid-cols-4 gap-x-8 gap-y-5'
      }
    }
  },

  data() {
    return {
      name: null,
      phone: null,
      email: null,
      role_id: null,
      display: null,
      displayOnWebsite: [
        {
          name: this.$t('common.all'),
          value: [true, false]
        },
        {
          name: this.$t('common.display_on_website'),
          value: true
        },
        {
          name: this.$t('common.not_display_on_website'),
          value: false
        }
      ]
    }
  },

  computed: {
    ...mapState({
      roles: (state) => state.role.roles
    })
  },

  methods: {
    update() {
      this.$emit('input', [
        { column: 'name', value: this.name },
        { column: 'phone', value: this.phone },
        { column: 'email', value: this.email },
        { column: 'role_id', value: this.role_id },
        {
          column: 'show_on_website',
          value:
            this.display && this.display?.length > 1
              ? [this.display]
              : this.display
        }
      ])
    },
    handleSearch() {
      this.update()
      this.$emit('search', true)
    },
    handleResetSearch() {
      this.name = null
      this.phone = null
      this.email = null
      this.role_id = null

      this.update()
      this.$emit('reset', true)
    }
  }
}
</script>
