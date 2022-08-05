<template>
  <div class="text-sm">
    <label class="block mb-1 font-bold">
      {{ label }}
      <span v-if="required" class="text-red-700">*</span>
    </label>
    <auto-complete
      :value="value"
      :label="label"
      :suggestions="contacts"
      :field="searchField"
      :readonly="readonly"
      @input="$emit('input', $event)"
      @complete="searchContact($event)"
      @item-select="$emit('completed', $event)"
      @item-unselect="$emit('completed', $event)"
      @dropdown-click="$emit('completed', $event)"
    >
      <template #item="{ item }">
        <div>{{ item.name }} - {{ item.primary_phone }}</div>
      </template>
    </auto-complete>
    <div v-if="errors">
      <span
        v-for="error of errors"
        :key="error.$uuid"
        class="p-invalid text-red-500"
      >
        {{ error.$message }}
      </span>
    </div>
    <div v-if="externalErrors">
      <span
        v-for="(message, key) of externalErrors"
        :key="key"
        class="p-invalid text-red-500"
      >
        {{ message }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default() {
        return this.$t('contact.name')
      }
    },
    required: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    errors: {
      type: Array,
      default() {
        return []
      }
    },
    externalErrors: {
      type: Array,
      default: () => {
        return []
      }
    }
  },

  data() {
    return {
      contacts: [],
      searchField: 'name'
    }
  },

  methods: {
    async searchContact(event) {
      const { data } = await this.$service.contact.search(
        this.searchField,
        event.query
      )
      this.contacts = data
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .p-autocomplete {
  width: 100%;
  .p-inputtext {
    padding: 0.65625rem 0.65625rem !important;
    font-size: 0.875rem !important;
    width: 100%;
  }
}
</style>
