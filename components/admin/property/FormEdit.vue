<template>
  <div class="space-y-4">
    <admin-page-header
      :buttons="buttons"
      @click="onToolbarButtonClicked($event)"
    >
      <template #title>
        <i :class="icon" class="text-3xl" />
        <span class="text-3xl">{{ title }}</span>
        <nuxt-link
          v-if="!fetching"
          v-show="code"
          :to="localePath(`/admin/properties/${$route.params.id}/detail`)"
        >
          <tag :severity="published ? 'info' : 'warning'" :value="code" />
        </nuxt-link>
        <tag
          v-if="isExpired(property)"
          :severity="'danger'"
          :value="$t('property.model.expired') + '!'"
        />
      </template>
    </admin-page-header>
    <admin-property-form v-if="!fetching" />
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { mapActions, mapMutations, mapState } from 'vuex'
import { createHelpers } from 'vuex-map-fields'
import {
  computed,
  onBeforeMount,
  ref,
  useContext,
  useRoute,
  useStore
} from '@nuxtjs/composition-api'
import useAuth from '@/authorizations/useAuth'
import authProperty from '@/authorizations/authProperty'
import useProperty from '@/composables/useProperty'

const { mapFields } = createHelpers({
  getterType: 'property/getField',
  mutationType: 'property/updateField'
})

export default {
  name: 'PageEditProperty',
  layout: 'admin',

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
    const route = useRoute()
    const { guard } = useAuth()
    const { canUpdate } = authProperty()
    const { commit, dispatch } = useStore()
    const { isExpired } = useProperty()

    const fetching = ref(true)

    onBeforeMount(async () => {
      const id = route.value.params.id
      const property = await dispatch('property/editProperty', id)

      if (property) {
        guard(() => canUpdate(property))

        commit('user/ADD_USER', property.assignee)
        fetching.value = false
      }
    })

    const { i18n } = useContext()
    const saving = ref(false)

    const buttons = computed(() => [
      {
        name: 'SAVE',
        icon: 'pi pi-save',
        text: i18n.t('common.save'),
        disabled: saving.value
      },
      {
        name: 'SAVE_AND_CLOSE',
        icon: 'pi pi-check',
        text: i18n.t('common.save_close'),
        disabled: saving.value
      },
      {
        name: 'CLOSE',
        style: 'danger',
        icon: 'pi pi-times',
        text: i18n.t('common.cancel'),
        disabled: saving.value
      }
    ])

    return { fetching, buttons, saving, isExpired, v$: useVuelidate() }
  },

  computed: {
    ...mapFields({
      code: 'form.code',
      formName: 'formName',
      published: 'form.publishing.published'
    }),
    ...mapState({
      property: (state) => state.property.form || {}
    })
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
      updateProperty: 'property/updateProperty',
      fetchUsers: 'user/fetchUsers'
    }),
    ...mapMutations({
      clearForm: 'property/CLEAR_PROPERTY_FORM',
      addUser: 'user/ADD_USER'
    }),
    onToolbarButtonClicked(event) {
      if (event.name === 'SAVE') {
        this.save()
      } else if (event.name === 'SAVE_AND_CLOSE') {
        this.saveAndClose()
      } else if (event.name === 'CLOSE') {
        this.closePage()
      }
    },
    showSuccessMessage(detail) {
      this.$toast.add({
        severity: 'success',
        summary: this.$t('property.label'),
        detail: this.$t('message.success_update'),
        life: 3000
      })
    },
    showErrorMessage(detail) {
      this.$toast.add({
        severity: 'error',
        summary: this.$t('property.label'),
        detail: this.$t('message.error_update'),
        life: 3000
      })
    },
    closePage() {
      this.clearForm()
      this.$emit('close-page')
    },
    async submit() {
      this.saving = true
      const result = await this.v$.$validate()
      if (!result) {
        this.showErrorMessage()
        return false
      }

      return await this.updateProperty()
    },
    async save() {
      try {
        const success = await this.submit()
        if (success) {
          this.showSuccessMessage()
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
    }
  }
}
</script>
