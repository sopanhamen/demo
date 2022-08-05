<template>
  <pv-dialog
    :visible.sync="isDisplayed"
    :position="position"
    :header="$t('user_team.title.structure')"
    :container-style="{ width: '90vw' }"
    :close-on-escape="true"
    :closable="true"
    :modal="true"
  >
    <organization-chart
      v-if="team && team.users && team.users.length > 0"
      :datasource="structure"
    />
    <template #footer>
      <div class="mt-4 flex justify-end">
        <pv-button
          :label="$t('common.close')"
          class="p-button-text p-button-plain p-button-sm bg-gray-200"
          icon="pi pi-times"
          @click="closeDialog"
        />
      </div>
    </template>
  </pv-dialog>
</template>

<script>
import OrganizationChart from 'vue-organization-chart'
import 'vue-organization-chart/dist/orgchart.css'
import { TeamPosition } from '~/enums/User'

export default {
  name: 'DialogTeamStructure',
  components: {
    OrganizationChart
  },
  props: {
    display: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: 'top'
    },
    team: {
      type: Object,
      default: null
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
    },
    structure() {
      if (!this.team || !this.team.users) {
        return {}
      }

      const leader = this.findLeader()
      let structure = {}
      structure = { ...leader }
      const subLeader = this.findSubLeader()
      if (subLeader) {
        subLeader.title = this.$t('team_position.model.sub_leader')
        subLeader.children = this.findMembers()
        structure.children = [subLeader]
      } else {
        structure.children = this.findMembers()
      }

      return structure
    }
  },

  methods: {
    closeDialog() {
      this.$emit('update:display', false)
    },
    findLeader() {
      const leader = this.team.users.find(
        (user) => user.pivot.level === TeamPosition.LEADER
      )

      if (!leader) {
        return {
          id: 1,
          name: 'N/A',
          title: this.$t('team_position.model.member')
        }
      }

      leader.title = this.$t('team_position.model.member')

      return leader
    },
    findSubLeader() {
      return this.team.users.find(
        (user) => user.pivot.level === TeamPosition.SUB_LEADER
      )
    },
    findMembers() {
      return this.team.users.reduce((carry, user) => {
        if (user.pivot.level > TeamPosition.SUB_LEADER) {
          user.title = this.$t('team_position.model.member')
          carry.push(user)
        }

        return carry
      }, [])
    }
  }
}
</script>
