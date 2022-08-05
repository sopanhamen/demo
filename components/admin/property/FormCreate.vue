<template>
  <div class="space-y-4">
    <admin-page-header
      :icon="icon"
      :title="title"
      :buttons="buttons"
      @click="handleToolbarButtonClicked($event)"
    />
    <admin-property-form v-if="!fetching" :external-errors="externalErrors" />
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { useVuelidate } from '@vuelidate/core'
import { mapActions, mapMutations, mapState } from 'vuex'
import { createHelpers } from 'vuex-map-fields'
import { Direction } from '@/enums/Direction'
import useAuth from '@/authorizations/useAuth'
import authProperty from '@/authorizations/authProperty'

const { mapFields } = createHelpers({
  getterType: 'property/getField',
  mutationType: 'property/updateField'
})

export default defineComponent({
  name: 'CreatePropertyForm',

  props: {
    name: {
      type: String,
      default: 'create-listing'
    },
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    }
  },

  setup: () => {
    const { guard } = useAuth()
    const { canCreate } = authProperty()

    guard(() => canCreate())

    const externalErrors = ref({})

    return {
      externalErrors,
      v$: useVuelidate()
    }
  },

  data() {
    return {
      saving: false,
      fetching: true
    }
  },

  async fetch() {
    try {
      await this.fetchAllCompanyBranches()

      if (this.users.length === 0) {
        const users = await this.fetchUsers({ limit: 10 })
        if (users) {
          this.fetching = false
        }
      }

      this.fetching = false
    } catch (error) {
      this.fetching = false
      this.$nuxt.error(error)
    }
  },

  computed: {
    ...mapFields({
      formName: 'formName',
      companyId: 'form.company_id',
      country_id: 'form.location.country_id',
      province_id: 'form.location.province_id',
      district_id: 'form.location.district_id',
      commune_id: 'form.location.commune_id'
    }),
    buttons() {
      return [
        {
          name: 'SAVE',
          icon: 'pi pi-save',
          text: this.$t('common.save'),
          disabled: this.saving
        },
        {
          name: 'SAVE_AND_CLOSE',
          icon: 'pi pi-check',
          text: this.$t('common.save_close'),
          disabled: this.saving
        },
        {
          name: 'SAVE_AND_NEW',
          icon: 'pi pi-file',
          text: this.$t('common.save_new'),
          disabled: this.saving
        },
        {
          name: 'CLOSE',
          style: 'danger',
          icon: 'pi pi-times',
          text: this.$t('common.cancel'),
          disabled: this.saving
        }
      ]
    }
  },

  created() {
    if (this.formName !== this.name) {
      this.clearForm()
    }
  },

  mounted() {
    this.formName = this.name
  },

  methods: {
    ...mapState({
      users: 'user/users'
    }),
    ...mapActions({
      storeNewProperty: 'property/storeNewProperty',
      fetchUsers: 'user/fetchUsers',
      fetchAllCompanyBranches: 'companyBranch/fetchAllBranches'
    }),
    ...mapMutations({
      clearForm: 'property/CLEAR_PROPERTY_FORM'
    }),
    showSuccessMessage(detail) {
      this.$toast.add({
        severity: 'success',
        summary: this.$t('property.label'),
        detail: this.$t('message.success_create'),
        life: 3000
      })
    },
    showErrorMessage(error) {
      if (error) {
        this.setExternalError(error)
      }

      this.$toast.add({
        severity: 'error',
        summary: this.$t('property.label'),
        detail: this.$t('message.error_create'),
        life: 3000
      })
    },
    async submit() {
      this.saving = true
      const result = await this.v$.$validate()
      if (!result) {
        this.showErrorMessage()
        return false
      }

      return await this.storeNewProperty()
    },
    handleToolbarButtonClicked(event) {
      if (event.name === 'SAVE') {
        this.save()
      } else if (event.name === 'SAVE_AND_CLOSE') {
        this.saveAndClose()
      } else if (event.name === 'SAVE_AND_NEW') {
        this.saveAndNew()
      } else if (event.name === 'CLOSE') {
        this.closePage()
      }
    },
    keepField() {
      return {
        company_id: this.companyId,

        location: {
          country_id: this.country_id,
          province_id: this.province_id,
          district_id: this.district_id,
          commune_id: this.commune_id,
          village: null,
          street: null,
          house: null,
          cornered_with: null,
          lat_lng: null,
          direction: Direction.UNKNOWN,
          road_condition: null,
          direct_road_width: null
        }
      }
    },
    closePage() {
      this.clearForm(this.keepField())
      this.$emit('close-page', true)
    },
    setExternalError(error) {
      if (error.response && error.response.data) {
        this.externalErrors = error.response.data.errors
      }
    },
    async save() {
      try {
        const property = await this.submit()
        if (property) {
          this.showSuccessMessage()
          this.$emit('saved', property)
        }
      } catch (error) {
        this.showErrorMessage(error)
      } finally {
        this.saving = false
      }
    },
    async saveAndClose() {
      try {
        const success = await this.submit()
        if (success) {
          this.showSuccessMessage()
          this.closePage()
        }
      } catch (error) {
        this.showErrorMessage(error)
      } finally {
        this.saving = false
      }
    },
    async saveAndNew() {
      try {
        const success = await this.submit()
        if (success) {
          this.showSuccessMessage()
          this.clearForm(this.keepField())
        }
      } catch (error) {
        this.showErrorMessage(error)
      } finally {
        this.saving = false
      }
    }
  }
})
</script>
