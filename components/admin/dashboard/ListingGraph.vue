<template>
  <div class="bg-gray-50 rounded-lg shadow">
    <div class="px-3 flex justify-between items-center border-b">
      <div class="flex items-center">
        <i class="pi pi-chart-line" style="font-size: 2rem"></i>
        <h3 class="font-medium whitespace-nowrap ml-2">
          {{ $t('dashboard.site_analytics') }}
        </h3>
      </div>
      <div class="flex flex-wrap-reverse justify-end items-center space-x-4">
        <div class="py-2">
          <!-- <pv-button icon="pi pi-cog" class="p-button-sm p-button-secondary" /> -->
          <pv-button
            v-if="show"
            icon="pi pi-minus"
            class="p-button-sm p-button-link focus:border-none focus:shadow-none"
            @click="show = !show"
          />
          <pv-button
            v-if="!show"
            icon="pi pi-plus"
            class="p-button-sm p-button-link focus:border-none focus:shadow-none"
            @click="show = !show"
          />
        </div>
      </div>
    </div>
    <div class="pl-2">
      <transition name="slide">
        <div v-if="show" class="child bg-gray-50 rounded-lg">
          <admin-dashboard-goal-completion />
          <!-- <div class="px-4">
            <admin-dashboard-goal-completion-footer />
          </div> -->
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true
    }
  }
}
</script>

<style scoped>
@import '~/assets/css/collapse.scss';
</style>
