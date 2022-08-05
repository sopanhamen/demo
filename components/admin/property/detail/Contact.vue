<template>
  <panel :header="$t('contact.label')" :toggleable="true">
    <div v-if="property.assignee.phone">
      <h4 class="text-sm mb-1 text-gray-500">
        {{ $t('property.model.assignee') }}
      </h4>
      <div class="contact-box">
        <text-block
          :label="$t('contact.name')"
          :description="property.assignee.name"
        />
        <text-block
          :label="$t('contact.primary_phone')"
          :description="property.assignee.phone"
        />
        <text-block
          :label="$t('contact.email')"
          :description="property.assignee.email"
        />
      </div>
    </div>
    <div
      v-if="property.sale_contact.primary_phone && canViewSaleContact(property)"
    >
      <h4 class="text-sm mb-1 text-gray-500">
        {{ $t('property.title.sale_contact') }}
      </h4>
      <div class="contact-box">
        <text-block
          :label="$t('contact.name')"
          :description="property.sale_contact.name"
        />
        <text-block
          :label="$t('contact.primary_phone')"
          :description="property.sale_contact.primary_phone"
        />
        <text-block
          :label="$t('contact.secondary_phone')"
          :description="property.sale_contact.secondary_phone"
        />
        <text-block
          :label="$t('contact.email')"
          :description="property.sale_contact.email"
        />
      </div>
    </div>

    <div
      v-if="
        property.owner_contact.primary_phone && canViewOwnerContact(property)
      "
    >
      <h4 class="text-sm mb-1 text-gray-500">
        {{ $t('property.title.owner_contact') }}
      </h4>
      <div class="contact-box">
        <text-block
          :label="$t('contact.name')"
          :description="property.owner_contact.name"
        />
        <text-block
          :label="$t('contact.primary_phone')"
          :description="property.owner_contact.primary_phone"
        />
        <text-block
          :label="$t('contact.secondary_phone')"
          :description="property.owner_contact.secondary_phone"
        />
        <text-block
          :label="$t('contact.email')"
          :description="property.owner_contact.email"
        />
      </div>
    </div>
  </panel>
</template>

<script>
import { mapState } from 'vuex'
import authProperty from '@/authorizations/authProperty'

export default {
  name: 'PropertyDetailContact',
  setup() {
    const { canViewSaleContact, canViewOwnerContact } = authProperty()
    return {
      canViewSaleContact,
      canViewOwnerContact
    }
  },
  computed: {
    ...mapState({
      property: (state) => state.property.selectedProperty || {}
    })
  }
}
</script>

<style lang="postcss" scoped>
.contact-box {
  @apply grid grid-cols-1 lg:grid-cols-2 gap-4 p-5 rounded-md;
  @apply bg-white border mb-4;
}
</style>
