<template>
  <div class="bg-white shadow-sm p-4" :class="roundSize">
    <nuxt-link v-if="hasProfile" :to="localePath('/agent-detail/' + agent.id)">
      <nuxt-img
        class="rounded-full mx-auto h-32 w-32 object-cover cursor-pointer"
        :src="profilePictureUrl"
      />
    </nuxt-link>
    <p class="text-center font-bold text-lg mt-2 capitalize text-gray-700">
      {{ agent.name || 'N/A' }}
    </p>

    <p v-if="hasProfile" class="text-sm text-center capitalize text-gray-400">
      {{ agent.profile.position || 'Position: N/A' }}
    </p>

    <div class="rounded-full bg-primary-lighter text-sm py-1 px-2 mt-3">
      <p class="truncate text-primary-thick text-center font-bold">
        {{ agent.properties_count + ' ' + $t('common.properties') }}
      </p>
    </div>

    <div v-if="hasContact" class="space-y-1 text-gray-700 mt-3">
      <div class="text-sm truncate space-x-2">
        <i class="pi pi-phone text-primary-thick" />
        <a
          :href="'tel:' + agent.profile.contact.primary_phone"
          class="hover:text-primary-thick"
        >
          {{ agent.profile.contact.primary_phone }}
        </a>
        <span
          v-if="agent.profile.contact.secondary_phone"
          class="text-primary-thick"
          >|</span
        >
        <a
          v-if="agent.profile.contact.secondary_phone"
          :href="'tel:' + agent.profile.contact.secondary_phone"
          class="hover:text-primary-thick"
          >{{ agent.profile.contact.secondary_phone }}
        </a>
      </div>

      <div class="text-sm truncate space-x-2">
        <i class="pi pi-envelope text-primary-thick" />
        <a
          :href="
            'mailto:' +
            agent.profile.contact.email +
            '?subject=Greeting Message'
          "
          target="_blank"
          class="cursor-pointer hover:text-primary-thick"
          >{{ agent.profile.contact.email || '' }}
        </a>
      </div>
    </div>

    <ul v-if="hasContact" class="flex space-x-1 mt-3">
      <li>
        <a
          :href="agent.profile.contact.facebook"
          target="_blank"
          :class="socialIconClass"
          ><i class="pi pi-facebook"
        /></a>
      </li>
      <li>
        <a
          :href="agent.profile.contact.telegram"
          target="_blank"
          :class="socialIconClass"
          ><i class="pi pi-telegram"
        /></a>
      </li>
      <!-- <li>
        <a
          :href="agent.profile.contact.tiktok"
          target="_blank"
          :class="socialIconClass"
          ><i class="fab fa-tiktok"
        /></a>
      </li> -->
      <li>
        <a
          :href="agent.profile.contact.wechat"
          target="_blank"
          :class="socialIconClass"
          ><i class="fa fa-brands fa-weixin"
        /></a>
      </li>
      <li>
        <a
          :href="agent.profile.contact.linkedin"
          target="_blank"
          :class="socialIconClass"
          ><i class="pi pi-linkedin"
        /></a>
      </li>
      <li>
        <a
          :href="agent.profile.contact.instagram"
          target="_blank"
          :class="socialIconClass"
          ><i class="fa-brands fa-instagram"
        /></a>
      </li>
      <li>
        <a
          :href="agent.profile.contact.youtube"
          target="_blank"
          :class="socialIconClass"
          ><i class="pi pi-youtube"
        /></a>
      </li>
      <!-- <li>
        <a
          :href="agent.profile.contact.line"
          target="_blank"
          :class="socialIconClass"
          ><i class="fa fa-line"
        /></a>
      </li> -->
    </ul>
    <!-- if no contact -->
    <div v-if="!hasContact" class="space-y-1 text-gray-700 mt-3">
      <div class="text-sm truncate space-x-2">
        <i class="pi pi-phone text-primary-thick" />
        <span class="tracking-widest">...............</span>
      </div>

      <div class="text-sm truncate space-x-2">
        <i class="pi pi-envelope text-primary-thick" />
        <span class="tracking-widest">...............</span>
      </div>
    </div>
    <ul v-if="!hasContact" class="flex space-x-1 mt-3 opacity-0">
      <li>
        <p :class="socialIconClass"><i class="pi pi-facebook" /></p>
      </li>
    </ul>
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
      socialIconClass:
        'rounded-lg text-gray-700 border-2 border-gray-200 w-8 h-8 flex items-center justify-center'
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
    },
    teamName() {
      if (!this.agent.teams) {
        return null
      }

      const teamNames = this.agent.teams.map((team) => team.name)
      return teamNames.join(' & ')
    }
  }
}
</script>
