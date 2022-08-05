<template>
  <div class="bg-white border-2 p-2" :class="roundSize">
    <nuxt-link v-if="hasProfile" :to="localePath('/agent-detail/' + agent.id)">
      <nuxt-img
        class="mx-auto object-cover cursor-pointer hover:opacity-80 duration-300"
        :class="roundSize"
        style="height: 170px; width: 370px"
        :src="profilePictureUrl"
      />
    </nuxt-link>

    <div v-if="hasContact" class="mt-4 mb-20 px-4 font-bold">
      <p class="text-primary text-2xl capitalize text-gray-700">
        {{ agent.name || 'N/A' }}
      </p>
      <p v-if="hasProfile" class="text-base capitalize text-gray-500">
        {{ agent.profile.position || 'Position: N/A' }}
      </p>
    </div>

    <div v-if="hasContact" class="flex justify-between px-1">
      <a
        :href="agent.profile.contact.facebook"
        :class="iconClass"
        target="_blank"
        ><i class="pi pi-facebook text-lg"
      /></a>
      <div class="flex flex-row space-x-2">
        <a
          :href="
            'mailto:' +
            agent.profile.contact.email +
            '?subject=Greeting Message'
          "
          :class="iconClass"
        >
          <i class="fa fa-envelope" />
        </a>
        <a
          :href="'tel:' + agent.profile.contact.primary_phone"
          :class="iconClass"
        >
          <i class="fa fa-phone-flip" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { image } from '@/config'
import useTheme from '@/composables/useTheme'

export default {
  props: {
    agent: {
      type: Object,
      required: true
    }
  },

  setup() {
    const { roundSize } = useTheme()
    return { roundSize }
  },

  data() {
    return {
      noPhoto: image.default.noPhoto,
      iconClass:
        'rounded-full hover:text-primary bg-gray-100 w-12 h-12 flex items-center justify-center inline p-4'
    }
  },

  computed: {
    hasProfile() {
      return !!(this.agent && this.agent.profile)
    },
    hasContact() {
      return !!(this.agent && this.agent.profile && this.agent.profile.contact)
    },
    profilePictureUrl() {
      return this.agent.profile?.profile_picture?.url || this.noPhoto
    }
  }
}
</script>
