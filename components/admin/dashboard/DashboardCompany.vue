<template>
  <div class="bg-white rounded-lg shadow p-6">
    <div class="mb-2 text-lg text-indigo-600">
      <i class="pi pi-building text-xl" />
      {{ $t('company.label') }}
    </div>
    <div class="text-gray-500">
      <div class="flex justify-between">
        <div>{{ $t('dashboard.total_agents') }}:</div>
        <div>{{ companySummary.total_agents }}</div>
      </div>
      <div class="flex justify-between">
        <div>{{ $t('dashboard.total_branches') }}:</div>
        <div>{{ companySummary.total_company_branches }}</div>
      </div>
      <div class="flex justify-between">
        <div>{{ $t('dashboard.total_teams') }}:</div>
        <div>{{ companySummary.total_teams }}</div>
      </div>
      <div class="flex justify-between">
        <div>{{ $t('dashboard.total_agents_in_team') }}:</div>
        <div>{{ companySummary.total_agents_in_team }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {}
  },

  computed: {
    ...mapGetters({
      companySummary: 'dashboard/getCompanySummaries'
    })
  }
}
</script>
