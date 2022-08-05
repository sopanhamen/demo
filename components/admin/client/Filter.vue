<template>
  <form @submit.prevent="handleSearch">
    <panel :header="$t('common.search')" :toggleable="true">
      <tab-view>
        <tab-panel :header="$t('common.general_information')">
          <admin-client-filter-general-information v-model="generalFilter" />
        </tab-panel>
        <tab-panel :header="$t('client.filter.tab_contact_and_status')">
          <admin-client-filter-contact v-model="contactFilter" />
        </tab-panel>
      </tab-view>
      <div class="pt-3 pb-3 flex flex-wrap justify-between items-center">
        <div class="text-sm flex flex-wrap">
          <form-field-input-switch
            v-if="
              userCan([
                Permission.VIEW_COMPANY_CLIENT,
                Permission.VIEW_BRANCH_CLIENT,
                Permission.VIEW_TEAM_CLIENT
              ])
            "
            v-model="createdOnly"
            :label="$t('client.title.myClientOnly')"
            @input="handleSwitch"
          />
        </div>
        <div>
          <pv-button
            :label="$t('common.search')"
            icon="pi pi-search"
            class="p-button-sm"
            type="submit"
          />
          <pv-button
            :label="$t('common.clear')"
            icon="pi pi-replay"
            class="p-button-sm p-button-danger"
            type="button"
            @click="resetSearch"
          />
        </div>
      </div>
    </panel>
  </form>
</template>

<script>
import { app } from '@/config'
import { Permission } from '@/enums/Permission'
import useAuth from '@/authorizations/useAuth'

export default {
  name: 'FilterClient',
  props: {
    value: {
      type: Array,
      required: true
    }
  },

  setup() {
    const { isSuperAdmin, userCan } = useAuth()
    return { isSuperAdmin, userCan, Permission }
  },

  data() {
    return {
      createdOnly: true,
      generalFilter: {
        name: null,
        clientSource: null,
        clientType: null,
        companyId: this.$auth.user.profile?.company_id,
        companyBranchId: this.$auth.user?.profile?.company_branch_id,
        teamId: this.$auth.user?.current_team_id,
        assigneeId: this.isSuperAdmin ? null : this.$auth.user?.id
      },
      contactFilter: {
        phone: null,
        email: null,
        nationalId: null,
        passport_number: null,
        telegram: null,
        country: app.default_country,
        province: app.default_province,
        district: null,
        commune: null
      }
    }
  },

  watch: {
    'generalFilter.assigneeId': {
      handler(value) {
        this.createdOnly = value === this.$auth.user.id
      }
    }
  },

  mounted() {
    if (this.isSuperAdmin) {
      this.createdOnly = false
    } else {
      this.createdOnly = true
    }
  },

  methods: {
    resetSearch() {
      this.createdOnly = true
      this.generalFilter.companyId = this.$auth.user.profile?.company_id

      this.generalFilter.companyBranchId =
        this.userCan(Permission.VIEW_COMPANY_CLIENT) || this.isSuperAdmin
          ? null
          : this.$auth.user?.profile?.company_branch_id

      this.generalFilter.teamId =
        this.userCan([
          Permission.VIEW_COMPANY_CLIENT,
          Permission.VIEW_BRANCH_CLIENT
        ]) || this.isSuperAdmin
          ? null
          : this.$auth.user?.current_team_id

      let assigneeId = this.$auth.user?.id
      if (
        this.isSuperAdmin ||
        this.userCan([
          Permission.VIEW_COMPANY_CLIENT,
          Permission.VIEW_BRANCH_CLIENT,
          Permission.VIEW_TEAM_CLIENT
        ])
      ) {
        assigneeId = this.$auth.user?.id
      }

      this.generalFilter.assigneeId = assigneeId

      this.generalFilter.name = null
      this.generalFilter.clientSource = null
      this.generalFilter.clientType = null
      this.contactFilter.phone = null
      this.contactFilter.email = null
      this.contactFilter.nationalId = null
      this.contactFilter.passport_number = null
      this.contactFilter.telegram = null
      this.contactFilter.province = null
      this.contactFilter.district = null
      this.contactFilter.commune = null

      this.handleSearch()
    },
    handleSearch() {
      const filteredValues = [
        { column: 'name', value: this.generalFilter.name },
        { column: 'source', value: this.generalFilter.clientSource },
        { column: 'client_type_id', value: this.generalFilter.clientType },
        {
          column: 'company_id',
          value: this.generalFilter.companyId
        },
        {
          column: 'company_branch_id',
          value: this.generalFilter.companyBranchId
        },
        { column: 'team_id', value: this.generalFilter.teamId },
        {
          column: 'assignee_id',
          value: this.generalFilter.assigneeId
        },

        { column: 'phone', value: this.contactFilter.phone },
        { column: 'email', value: this.contactFilter.email },
        { column: 'national_id_number', value: this.contactFilter.nationalId },
        {
          column: 'passport_number',
          value: this.contactFilter.passport_number
        },
        { column: 'telegram', value: this.contactFilter.telegram },
        { column: 'country_id', value: this.contactFilter.country },
        { column: 'province_id', value: this.contactFilter.province },
        { column: 'district_id', value: this.contactFilter.district },
        { column: 'commune_id', value: this.contactFilter.commune }
      ]

      this.$emit('input', filteredValues)
      this.$emit('onSearch', true)
    },
    handleSwitch(event) {
      this.generalFilter.assigneeId = event ? this.$auth.user.id : null
      this.handleSearch()
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .p-tabview {
  .p-tabview-panels {
    background: transparent;
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
