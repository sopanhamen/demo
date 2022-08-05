<template>
  <div class="gap-x-5 gap-y-4" :class="containerClass">
    <form-field-select
      v-model="model.assignor_id"
      :options="users"
      :label="$t('common.assignor')"
      :placeholder="$t('common.select') + '...'"
      :filter="true"
      option-label="name"
      option-value="id"
      @filter="searchUser($event)"
    />
    <div v-if="model.assignee_id === $auth.user.id" class="col-span-2">
      <label>{{ $t('property.title.owner_contact') }}</label>
      <admin-form-contact
        v-model="model.ownerContact"
        container-class="grid grid-cols-2 gap-x-4"
      />
    </div>
    <div v-if="model.assignee_id === $auth.user.id" class="col-span-2">
      <label>{{ $t('property.title.sale_contact') }}</label>
      <admin-form-contact
        v-model="model.saleContact"
        container-class="grid grid-cols-2 gap-x-4"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { debounce } from 'lodash'

export default {
  props: {
    value: {
      type: Object,
      required: true
    },
    containerClass: {
      type: [String, Array, Object],
      default() {
        return 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'
      }
    }
  },

  computed: {
    ...mapGetters({
      users: 'user/getUsers'
    }),
    model: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },

  methods: {
    ...mapActions({
      fetchUsers: 'user/fetchUsers'
    }),
    ...mapMutations({
      setUsers: 'user/SET_USERS'
    }),
    searchUser: debounce(async function (event) {
      if (!event.value) {
        return false
      }

      const { data } = await this.$service.user.search('name', event.value)
      this.setUsers(data)
    }, 300)
  }
}
</script>
