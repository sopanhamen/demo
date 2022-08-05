<template>
  <div class="flex-wrap space-y-2">
    <div class="font-bold">
      {{ client.contact.name }}
    </div>
    <div>
      {{ client.contact.primary_phone }}
    </div>
    <div>
      {{ client.contact.email }}
    </div>
    <div>
      <ul class="flex flex-wrap space-x-2 mt-3">
        <li :class="{ 'contrast-0 opacity-40': !client.contact.facebook }">
          <a
            :href="client.contact.facebook"
            target="_blank"
            :class="socialIconClass('text-blue-600')"
            ><i class="pi pi-facebook fa-xl text-2xl"
          /></a>
        </li>
        <li :class="{ 'contrast-0 opacity-40': !client.contact.telegram }">
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
        <li :class="{ 'contrast-0 opacity-40': !client.contact.linkedin }">
          <a
            :href="client.contact.linkedin"
            target="_blank"
            :class="socialIconClass('text-blue-800')"
            ><i class="pi pi-linkedin fa-xl text-2xl"
          /></a>
        </li>
        <li :class="{ 'contrast-0 opacity-40': !client.contact.instagram }">
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
    <div class="text-gray-500">
      <p v-if="client.creator">
        {{ $t('common.created_by') }}
        <span> {{ client.creator.name }}</span>
      </p>
      <p>
        {{ $t('common.created_at') }}
        <span>
          {{ formatDateTime(client.contact.created_at) }}
        </span>
      </p>
      <i class="pi pi-map-marker" />
      {{ fullAddress(client.contact) }}
    </div>
  </div>
</template>
<script>
import useLocation from '@/composables/useLocation'
import useFormatter from '@/composables/useFormatter'

export default {
  layout: 'admin',

  props: {
    client: {
      type: Object,
      required: true
    }
  },

  setup() {
    const { fullAddress } = useLocation()
    const { formatDateTime } = useFormatter()

    return { fullAddress, formatDateTime }
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
      return `rounded-lg border-2 border-gray-300 w-9 h-9 flex items-center justify-center  ${style}`
    }
  }
}
</script>
