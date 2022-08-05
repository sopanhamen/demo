<template>
  <div v-if="agent" class="flex justify-center">
    <div class="rounded-lg shadow-lg bg-white w-full">
      <div class="block lg:flex xl:flex md:flex">
        <div class="p-4 w-full xl:max-w-xs lg:max-w-xs md:max-w-xs">
          <nuxt-img
            class="w-full h-full xl:max-h-72 lg:max-h-72 md:max-h-72 rounded-lg object-cover"
            :src="agent.profile.profile_picture.url || noPhoto"
          />

          <!-- md:w-56 md:h-64 -->
        </div>
        <div class="pt-4 md:w-4/6 lg:w-4/6 xl:w-4/6 px-4">
          <div>
            <div class="">
              <p class="text-lg font-bold text-gray-700 capitalize">
                {{ agent.name || agent.message }}
              </p>
              <p class="my-2 text-sm text-gray-500 font-bold capitalize">
                {{ agent.profile.position || 'N/A' }}
              </p>
            </div>
            <!-- <div
              class="flex flex-wrap text-base my-1 whitespace-nowrap font-normal text-gray-700"
            >
              <p>
                {{ $t('agent_detail.skill') }} :
                {{ agent.profile.skills || 'N/A' }}
              </p>
              <p>
                , {{ $t('agent_detail.experience') }} :
                {{ agent.profile.experience || 'N/A' }}
              </p>
            </div> -->
            <!-- <p class="text-gray-500 font-normal">
              {{ $t('agent_detail.description') }} :
              {{ agent.profile.des || '' }}
            </p> -->
          </div>

          <!-- <div> -->
          <div class="flex flex-wrap">
            <div class="">
              <div
                class="rounded-full bg-red-50 py-1 px-2 md:mx-1 lg:mx-1 xl:mx-1 mt-2 text-sm whitespace-nowrap max-w-150px sm:max-w-xs"
              >
                <dataview-list-header
                  class="text-red-400 truncate"
                  :total-records="paginationMeta.total"
                >
                </dataview-list-header>
              </div>
            </div>
            <div class="">
              <div
                class="rounded-full bg-green-50 py-1 px-2 mt-2 mx-1 whitespace-nowrap max-w-150px sm:max-w-xs"
              >
                <p class="text-sm text-green-400 truncate">
                  {{ $t('common.team') }}
                  {{ (agent.teams[0] && agent.teams[0].name) || 'N/A' }}
                </p>
              </div>
            </div>
            <div class="">
              <div
                class="rounded-full bg-purple-50 flex items-center py-1 px-2 mt-2 mx-1 text-sm text-purple-400 whitespace-nowrap max-w-150px sm:max-w-xs"
              >
                <li class="fa fa-map-marker mr-1" />
                {{ $t('agent_detail.area') + ':' }}
                {{
                  (agent.teams[0].branch && agent.teams[0].branch.name) || 'N/A'
                }}
                <p
                  class="font-medium text-purple-800 truncate"
                  :title="$t('agent_detail.area')"
                ></p>
              </div>
            </div>
          </div>

          <div class="block flex-wrap justify-start lg:flex xl:flex my-1">
            <div class="mx-2 flex flex-wrap lg:block xl:block">
              <p class="font-medium text-gray-700 text-center mr-3">
                {{ $t('common.email') + ':' }}
              </p>

              <a
                href=""
                class="text-sm font-normal text-center hover:text-primary-thick"
              >
                {{ agent.email || agent.message }}</a
              >
            </div>
            <div class="mx-2 flex lg:block xl:block">
              <p class="font-medium text-gray-700 text-center mr-3">
                {{ $t('common.phone') + ':' }}
              </p>

              <a
                href=""
                class="text-sm font-normal text-center hover:text-primary-thick"
              >
                {{ agent.phone || agent.message }}</a
              >
            </div>
            <div class="mx-2 flex lg:block xl:block">
              <!-- <p class="font-medium text-gray-700 text-center mr-3"></p> -->

              <a
                href=""
                class="text-sm font-normal text-center hover:text-primary-thick"
              >
                {{ agent.mobile || agent.message }}</a
              >
            </div>
          </div>
          <div class="my-2 flex flex-wrap">
            <div
              v-for="row in item.social"
              :key="row.id"
              class="mx-1 lg:mx-2 xl:mx-2 my-2"
            >
              <div
                class="rounded-full w-8 h-8 bg-gray-100 flex items-center justify-center"
              >
                <li :class="'pi pi-' + row.icon + '  hover:text-primary'" />
              </div>
            </div>
          </div>
          <!-- </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useContext } from '@nuxtjs/composition-api'
import { image } from '@/config'
import useCrud from '@/composables/useCrud'

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },

  setup() {
    const { $service } = useContext()
    const { paginationMeta } = useCrud($service.listing, 'agentListing')

    return {
      paginationMeta
    }
  },

  data() {
    return {
      noPhoto: image.default.noPhoto,
      totalRecords: 12,
      rowPerPage: 1,
      agent: null
    }
  },

  async fetch() {
    const agent = await this.$service.agent.getDetail(this.$route.params.id)
    this.agent = agent
  }
}
</script>
