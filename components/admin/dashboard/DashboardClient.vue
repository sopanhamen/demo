<template>
  <div class="bg-white rounded-lg shadow p-6">
    <div class="mb-2 text-lg text-red-500">
      <i class="pi pi-users text-xl" />
      {{ $t('client.label') }}
    </div>
    <div class="text-gray-500">
      <div class="flex justify-between">
        <div>{{ $t('dashboard.total_requirements') }}:</div>
        <div>{{ clientSummary.total_requirements }}</div>
      </div>
      <div class="flex justify-between">
        <div>{{ $t('dashboard.total_active_requirements') }}:</div>
        <div>{{ clientSummary.total_active_requirements }}</div>
      </div>
      <div class="flex justify-between">
        <div>{{ $t('dashboard.total_closed_requirements') }}:</div>
        <div>{{ clientSummary.total_closed_requirements }}</div>
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
      clientSummary: 'dashboard/getClientSummaries'
    })
  }
}
</script>
