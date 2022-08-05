<template>
  <div class="pb-24 text-sm">
    <admin-property-form-filter />
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
      <div class="space-y-4">
        <admin-property-form-general :external-errors="externalErrors" />
        <admin-property-form-business-description
          v-if="propertyTypeGroup === propertyTypeGroups.BUSINESS"
        />
        <admin-property-form-building-description
          v-if="propertyTypeGroup === propertyTypeGroups.HOMES"
        />
        <admin-property-form-land-description />
        <admin-property-form-facilities />
        <admin-property-form-publishing />
        <panel :header="$t('common.photos')" :toggleable="true">
          <admin-form-upload-images
            :images="images"
            @uploaded="addImages"
            @delete-file="confirmDeleteImage($event)"
          />
        </panel>
        <panel :header="$t('common.documents')" :toggleable="true">
          <admin-form-upload-files
            :files="documents"
            @uploaded="setDocuments"
            @delete-file="deleteDocument($event)"
          />
        </panel>
      </div>
      <div class="space-y-4">
        <panel :header="$t('property.title.owner_contact')" :toggleable="true">
          <admin-form-contact
            v-model="ownerContact"
            :validation="contactValidationRules"
          />
        </panel>
        <panel :header="$t('property.title.sale_contact')" :toggleable="true">
          <div class="mb-4">
            <form-field-select
              v-model="saleContactPerson"
              :label="$t('contact.contact_person')"
              :options="contactPersons"
              option-value="value"
              option-label="label"
            />
          </div>
          <admin-form-contact
            v-model="saleContact"
            :validation="contactValidationRules"
          />
        </panel>
        <admin-property-form-sale />
        <panel :header="$t('location.label')" :toggleable="true">
          <admin-form-location
            v-model="address"
            :validation="locationValidationRules"
          />
        </panel>
      </div>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { email, minLength, required, requiredIf } from '@vuelidate/validators'
import { mapActions, mapGetters } from 'vuex'
import { createHelpers } from 'vuex-map-fields'
import { PropertyTypeGroup } from '@/enums/PropertyTypeGroup'

const { mapFields } = createHelpers({
  getterType: 'property/getField',
  mutationType: 'property/updateField'
})

export default {
  name: 'AdminPropertyForm',
  layout: 'admin',

  props: {
    externalErrors: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },

  setup: () => ({ v$: useVuelidate() }),

  data() {
    return {
      propertyTypeGroups: PropertyTypeGroup,
      locationValidationRules: {
        country_id: { required },
        province_id: { required },
        district_id: { required }
      },
      contactValidationRules: {
        name: {
          required: requiredIf(this.primary_phone),
          minLength: minLength(2)
        },
        primary_phone: { minLength: minLength(9) },
        secondary_phone: { minLength: minLength(9) },
        email: { email }
      }
    }
  },

  computed: {
    ...mapFields({
      published: 'form.publishing.published',
      saleContactPerson: 'form.sale_contact.contact_person',
      propertyType: 'form.property_type_id',
      images: 'form.images',
      documents: 'form.documents'
    }),
    ...mapGetters({
      getPropertyTypeById: 'propertyType/getPropertyTypeById',
      getPropertyTypes: 'propertyType/getPropertyTypes',
      getContactPersons: 'resource/getPersons',
      property: 'property/getFormData'
    }),
    propertyTypeGroup() {
      const propertyType = this.getPropertyTypeById(this.propertyType)
      if (!propertyType) {
        return false
      }

      return propertyType.property_type_group
    },
    contactPersons() {
      return this.getContactPersons.map((person) => ({
        value: person.value,
        label: this.$t('contact_person.model.' + person.label)
      }))
    },
    ownerContact: {
      get({ $store }) {
        return {
          name: $store.state.property.form.owner_contact.name,
          primary_phone: $store.state.property.form.owner_contact.primary_phone,
          secondary_phone:
            $store.state.property.form.owner_contact.secondary_phone,
          email: $store.state.property.form.owner_contact.email
        }
      },
      set(value) {
        this.$store.commit('property/SET_PROPERTY_FORM', {
          owner_contact: value
        })
      }
    },
    saleContact: {
      get({ $store }) {
        return {
          name: $store.state.property.form.sale_contact.name,
          primary_phone: $store.state.property.form.sale_contact.primary_phone,
          secondary_phone:
            $store.state.property.form.sale_contact.secondary_phone,
          email: $store.state.property.form.sale_contact.email
        }
      },
      set(value) {
        this.$store.commit('property/SET_PROPERTY_FORM', {
          sale_contact: {
            ...value,
            contact_person: this.saleContactPerson
          }
        })
      }
    },
    address: {
      get() {
        return this.property.location
      },
      set(value) {
        this.$store.commit('property/SET_PROPERTY_FORM', {
          location: value
        })
      }
    }
  },

  methods: {
    ...mapActions({
      fetchUsers: 'user/fetchUsers',
      deletePropertyImage: 'property/deleteImage',
      deletePropertyDocument: 'property/deleteDocument'
    }),
    addImages(event) {
      this.$store.commit('property/SET_PROPERTY_FORM', {
        images: [...this.images, ...event]
      })
    },
    setDocuments(event) {
      this.$store.commit('property/SET_PROPERTY_FORM', {
        documents: [...this.documents, ...event]
      })
    },
    confirmDeleteImage(event) {
      this.$confirm.require({
        message: this.$t('message.confirm_delete'),
        header: this.$t('common.confirmation'),
        icon: 'pi pi-exclamation-triangle',
        acceptClass: 'p-button-danger',
        accept: () => {
          this.deleteImage(event)
        }
      })
    },
    async deleteImage(image) {
      const propertyId = this.$route.params.id
      await this.deletePropertyImage({ propertyId, image })
      this.$toast.add({
        severity: 'success',
        summary: this.$t('common.success'),
        detail: this.$t('message.success_delete_image'),
        life: 3000
      })
    },
    deleteDocument(file) {
      const propertyId = this.$route.params.id
      if (!propertyId || !file) {
        return false
      }

      this.$confirm.require({
        message: this.$t('message.confirm_delete'),
        header: this.$t('common.confirmation'),
        icon: 'pi pi-exclamation-triangle',
        acceptClass: 'p-button-danger',
        accept: async () => {
          try {
            await this.deletePropertyDocument({ propertyId, file })
            this.$toast.add({
              severity: 'success',
              summary: this.$t('common.success'),
              detail: this.$t('message.success_delete_file'),
              life: 3000
            })
          } catch (error) {
            this.$toast.add({
              severity: 'error',
              summary: this.$t('common.failed'),
              detail: this.$t('message.error_delete_file'),
              life: 3000
            })
          }
        }
      })
    }
  }
}
</script>
