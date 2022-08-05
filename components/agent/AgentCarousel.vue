<template>
  <div class="container mx-auto mt-10 pb-8">
    <template v-if="!fetching">
      <card-carousel
        :description="props.description"
        :title="props.title"
        :items="agents"
      >
        <template #slide="{ item }">
          <component :is="props.style.name" class="mx-4" :agent="item" />
        </template>
      </card-carousel>
    </template>
    <div class="flex justify-end">
      <router-link
        :to="localePath('/agents')"
        class="text-sm text-center px-4 py-3 text-primary"
      >
        {{ $t('common.see_all') }} <i class="pi pi-arrow-right"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import useCrud from '@/composables/useCrud'

export default defineComponent({
  props: {
    props: {
      type: Object,
      required: true
    }
  },

  setup() {
    const { $service } = useContext()
    const { fetching, paginationItems } = useCrud(
      $service.agent,
      'agentListings'
    )

    return { agents: paginationItems, fetching }
  }
})
</script>
