<template>
  <div class="bg-white rounded-lg shadow p-6">
    <div class="mb-2 text-lg text-yellow-600">
      <i class="pi pi-envelope text-xl" />
      {{ $t('common.inquiry') }}
    </div>
    <div class="text-gray-500">
      <div class="flex justify-between">
        <div>{{ $t('dashboard.total_contacts') }}:</div>
        <div>{{ contactSummary.total }}</div>
      </div>
      <div class="flex justify-between">
        <div>{{ $t('dashboard.total_contacts_to_branch') }}:</div>
        <div>{{ contactSummary.total_in_branch }}</div>
      </div>
      <div class="flex justify-between">
        <div>{{ $t('dashboard.total_contacts_to_team') }}:</div>
        <div>{{ contactSummary.total_in_team }}</div>
      </div>
      <div class="flex justify-between">
        <div>{{ $t('dashboard.total_contacts_by_assignee') }}:</div>
        <div>{{ contactSummary.total_by_assignee }}</div>
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
      contactSummary: 'dashboard/getContactSummaries'
    })
  }
}
</script>
