<template>
  <pv-dialog
    :show-header="true"
    :header="$t('contact.label')"
    :visible.sync="isDisplayed"
    :position="position"
    :container-style="{ width: '60vw' }"
    :close-on-escape="true"
    :closable="true"
    :modal="true"
  >
    <loader-box v-if="fetching"></loader-box>
    <div v-else class="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 gap-4">
      <div v-if="contacts.assignee">
        <h4 class="font-bold">{{ $t('property.model.assignee') }}</h4>
        <div>
          <description-list-item
            :label="$t('person.name')"
            :value="contacts.assignee.name"
          />
          <description-list-item
            :label="$t('contact.primary_phone')"
            :value="contacts.assignee.primary_phone"
          />
          <description-list-item
            :label="$t('contact.email')"
            :value="contacts.assignee.email"
          />
        </div>
      </div>
      <div v-if="contacts.sale_contact">
        <h4 class="font-bold">{{ $t('property.title.sale_contact') }}</h4>
        <div>
          <description-list-item
            :label="$t('person.name')"
            :value="contacts.sale_contact.name"
          />
          <description-list-item
            :label="$t('contact.primary_phone')"
            :value="contacts.sale_contact.primary_phone"
          />
          <description-list-item
            :label="$t('contact.secondary_phone')"
            :value="contacts.sale_contact.secondary_phone"
          />
          <description-list-item
            :label="$t('contact.email')"
            :value="contacts.sale_contact.email"
          />
        </div>
      </div>
      <div v-if="contacts.owner_contact">
        <h4 class="font-bold">{{ $t('property.title.owner_contact') }}</h4>
        <div>
          <description-list-item
            :label="$t('person.name')"
            :value="contacts.owner_contact.name"
          />
          <description-list-item
            :label="$t('contact.primary_phone')"
            :value="contacts.owner_contact.primary_phone"
          />
          <description-list-item
            :label="$t('contact.secondary_phone')"
            :value="contacts.owner_contact.secondary_phone"
          />
          <description-list-item
            :label="$t('contact.email')"
            :value="contacts.owner_contact.email"
          />
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-end mt-4">
        <pv-button
          :label="$t('common.close')"
          class="p-button-text p-button-plain p-button-sm bg-gray-200"
          icon="pi pi-times"
          @click="closeDialog"
        />
        <div></div>
      </div>
    </template>
  </pv-dialog>
</template>

<script>
export default {
  name: 'AdminPropertyDialogDocument',
  props: {
    display: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: 'top'
    },
    property: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      fetching: true,
      contacts: []
    }
  },

  computed: {
    isDisplayed: {
      get() {
        return this.display
      },
      set(value) {
        this.$emit('update:display', value)
      }
    }
  },

  watch: {
    property(value) {
      this.fetchContacts(value)
    }
  },

  methods: {
    closeDialog() {
      this.$emit('update:display', false)
    },
    async fetchContacts(property) {
      this.fetching = true
      try {
        const { data } = await this.$service.property.getContacts(property)
        if (data) {
          this.fetching = false
          this.contacts = data
        }
      } catch (error) {
        this.fetching = false
        this.$nuxt.error(error)
      }
    }
  }
}
</script>
