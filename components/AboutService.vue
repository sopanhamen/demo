<template>
  <div class="container mx-auto text-center py-24">
    <h1 class="text-4xl font-bold mb-3">
      {{ $t('home.brokerage_service.label') }}
    </h1>
    <p class="max-w-xl mx-auto mb-10">
      {{ $t('home.brokerage_service.title') }}
    </p>
    <div class="md:flex md:space-x-20 space-y-20 md:space-y-0">
      <service-card-item v-for="row in services" :key="row.id" :item="row" />
    </div>
  </div>
</template>

<script>
import { useContext, defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { i18n } = useContext()
    const services = [
      {
        titleKm: 'ទិញ',
        titleEn: 'Buy',
        pro: i18n.t('home.purpose.for_buy.label'),
        des: i18n.t('home.purpose.for_buy.desc')
      },
      {
        titleKm: 'លក់',
        titleEn: 'SALE',
        pro: i18n.t('home.purpose.for_sale.label'),
        des: i18n.t('home.purpose.for_sale.desc')
      },
      {
        titleKm: 'ជួល',
        titleEn: 'RENT',
        pro: i18n.t('home.purpose.for_rent.label'),
        des: i18n.t('home.purpose.for_sale.desc')
      }
    ]

    return { services }
  }
})
</script>
