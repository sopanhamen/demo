<template>
  <div class="w-full relative">
    <div class="flex-wrap items-center justify-between mb-3">
      <div
        class="flex flex-wrap items-center pb-2 space-y-2 bg-gray-50 rounded-t-lg"
      >
        <nuxt-img
          v-if="!client.noImage"
          :src="client.img || noImg"
          alt="Image Profile"
          class="p-px w-28 h-28 rounded-full border-2 border-yellow-400 object-cover mr-4"
        />
        <div class="space-y-2">
          <h3 class="uppercase truncate text-xl">
            {{ client.title || empty }}
          </h3>
          <h3 class="capitalize truncate text-sm">
            {{ client.subTitle || empty }}
          </h3>
          <div>
            <ul class="flex flex-wrap space-x-1">
              <li
                :class="{ 'contrast-0 opacity-40': !client.contact.facebook }"
              >
                <a
                  :href="client.contact.facebook"
                  target="_blank"
                  :class="socialIconClass('text-blue-600')"
                  ><i class="pi pi-facebook fa-xl text-2xl"
                /></a>
              </li>
              <li
                :class="{ 'contrast-0 opacity-40': !client.contact.telegram }"
              >
                <a
                  :href="clientTelegram"
                  target="_blank"
                  :class="socialIconClass('text-blue-500')"
                  ><i class="pi pi-telegram fa-xl text-2xl"
                /></a>
              </li>
              <!-- <li :class="{ 'contrast-0 opacity-40': !client.contact.tiktok }">
          <a
            :href="client.contact.tiktok"
            target="_blank"
            :class="socialIconClass('text-red-600')"
            ><i class="fa fa-brands fab  fa-tiktok fa-xl text-2xl"
          /></a>
        </li> -->
              <li :class="{ 'contrast-0 opacity-40': !client.contact.wechat }">
                <a
                  :href="client.contact.wechat"
                  target="_blank"
                  :class="socialIconClass('text-green-500')"
                  ><i class="fa fa-brands fa-weixin fa-xl text-2xl"
                /></a>
              </li>
              <li
                :class="{ 'contrast-0 opacity-40': !client.contact.linkedin }"
              >
                <a
                  :href="client.contact.linkedin"
                  target="_blank"
                  :class="socialIconClass('text-blue-800')"
                  ><i class="pi pi-linkedin fa-xl text-2xl"
                /></a>
              </li>
              <li
                :class="{ 'contrast-0 opacity-40': !client.contact.instagram }"
              >
                <a
                  :href="client.contact.instagram"
                  target="_blank"
                  :class="socialIconClass('text-pink-600')"
                  ><i class="fa-brands fa-instagram fa-xl text-2xl"
                /></a>
              </li>
              <li :class="{ 'contrast-0 opacity-40': !client.contact.youtube }">
                <a
                  :href="client.contact.youtube"
                  target="_blank"
                  :class="socialIconClass('text-red-600')"
                  ><i class="pi pi-youtube fa-xl text-2xl"
                /></a>
              </li>
              <!-- <li :class="{ 'contrast-0 opacity-40': !client.contact.line }">
          <a
            :href="client.contact.line"
            target="_blank"
            :class="socialIconClass('text-red-600')"
            ><i class="fa fa-line fa-xl text-2xl"
          /></a>
        </li> -->
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white px-5 py-3 border-t-2 space-y-4 items-center">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="row in client.info"
          :key="row.id"
          :class="{ 'col-span-2': row.column === 'common.address' }"
        >
          <p class="text-xs text-gray-500">
            {{ $t(row.column) }}
          </p>
          <p class="truncate text-gray-700">{{ row.value || empty }}</p>
        </div>
      </div>

      <div
        class="text-center cursor-pointer text-blue-700 bg-white border shadow rounded-md py-6 lg:py-10"
        @click="
          $router.push(localePath(`/admin/clients/${client.id}/requirements`))
        "
      >
        <h1 class="text-2xl">{{ client.requirements.length || '0' }}</h1>
        {{ $t('requirement.label') }}
      </div>
    </div>
  </div>
</template>

<script>
import { image } from '@/config'

export default {
  name: 'CardClientProfile',
  props: {
    client: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      empty: 'N/A',
      noImg: image.default.noPhoto
    }
  },

  computed: {
    clientTelegram() {
      if (!this.client.contact?.telegram) {
        return null
      }

      return `https://t.me/${this.client.contact.telegram.replace('@', '')}`
    }
  },

  methods: {
    socialIconClass(style) {
      return `rounded-lg w-10 h-10 flex items-center justify-center ${style}`
    }
  }
}
</script>
