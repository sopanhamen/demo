<template>
  <panel :header="$t('user.title.list')">
    <form-input-block
      v-for="(user, key) in teamUsers"
      :key="key"
      @close="removeUser(user)"
    >
      <form-field-select
        :value="user.user_id"
        :options="users"
        :label="$t('user.label') + ' ' + (key + 1)"
        :placeholder="$t('common.select') + '...'"
        :errors="
          v$.users && v$.users.$errors.length > 0
            ? v$.users.$errors.$each.$response.$errors[key].user_id
            : []
        "
        :filter="true"
        option-label="name"
        option-value="id"
        @filter="searchUser($event)"
        @input="updateUsers(key, { ...user, user_id: $event }, users)"
      />
      <form-field-select
        :value="user.level"
        :options="positions"
        :label="$t('team.model.level')"
        :errors="
          v$.users && v$.users.$errors.length > 0
            ? v$.users.$errors.$each.$response.$errors[key].level
            : []
        "
        option-label="label"
        option-value="level"
        @input="updateUsers(key, { ...user, level: $event })"
      />
    </form-input-block>
    <div class="mt-4 text-right">
      <pv-button
        :label="$t('team.title.add_members')"
        icon="pi pi-user-plus"
        class="p-button-sm"
        @click="addTeamUser({ user_id: null, level: TeamPosition.MEMBER })"
      />
    </div>
  </panel>
</template>

<script>
import { debounce, findIndex } from 'lodash'
import { useVuelidate } from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
import { createHelpers } from 'vuex-map-fields'
import { mapGetters, mapMutations } from 'vuex'
import { TeamPosition, TeamPositionLabel } from '@/enums/User'

const { mapFields } = createHelpers({
  getterType: 'userTeam/getField',
  mutationType: 'userTeam/updateField'
})

export default {
  name: 'AdminTeamFormHierarchy',
  setup: () => ({ v$: useVuelidate() }),

  validations() {
    return {
      users: {
        $each: helpers.forEach({
          user_id: { required },
          level: { required }
        })
      }
    }
  },

  data() {
    return {
      userOption: [],
      TeamPosition,
      positions: Object.values(TeamPosition).map((position) => ({
        level: position,
        label:
          position +
          ' - ' +
          this.$t('team_position.model.' + TeamPositionLabel[position])
      }))
    }
  },

  computed: {
    ...mapFields({
      teamUsers: 'form.users',
      company: 'form.company_id',
      branch: 'form.company_branch_id'
    }),
    ...mapGetters({
      users: 'user/getUsers'
    })
  },

  methods: {
    ...mapMutations({
      setUsers: 'user/SET_USERS',
      addTeamUser: 'userTeam/ADD_TEAM_USER_TO_FORM'
    }),
    updateUsers(key, user, listUsers) {
      const users = [...this.teamUsers]
      users[key] = user
      if (listUsers) {
        const userTmp = listUsers.find((item) => item.id === user.user_id)
        if (!this.userOption.find((item) => item.id === user.user_id)) {
          this.userOption.push(userTmp)
        }
      }
      this.$store.commit('userTeam/UPDATE_USER_TEAM_FORM', { users })
    },
    removeUser(user) {
      const users = [...this.teamUsers]
      const index = findIndex(users, ['user_id', user.user_id])
      if (index !== -1) {
        users.splice(index, 1)
      }

      this.$store.commit('userTeam/UPDATE_USER_TEAM_FORM', { users })
    },
    searchUser: debounce(async function (event) {
      if (this.users && this.users.length > 0) {
        const userIDs = this.users.map((item) => item.id)
        const dataFormatted = this.userOption.filter(
          (item) => !userIDs.includes(item.id)
        )
        this.userOption = this.users.concat(dataFormatted)
      }

      if (!event.value) {
        return false
      }

      const { data } = await this.$service.user.search('name', event.value, {
        relations: 'profile',
        company_id: this.company,
        company_branch_id: this.branch
      })

      const userIDs = data.map((item) => item.id)
      const dataFormatted = this.userOption.filter(
        (item) => !userIDs.includes(item.id)
      )

      this.setUsers(data.concat(dataFormatted))
    }, 300)
  }
}
</script>
