<template>
  <div class="space-y-4">
    <div
      v-if="user && user.profile && user.profile.contact"
      class="grid grid-cols-1 lg:grid-cols-2 gap-4"
    >
      <panel :header="$t('profile.basic_info')" :toggleable="true">
        <div class="space-y-4">
          <form-field-input v-model="user.name" :label="$t('common.name')" />
          <form-field-input
            v-model="user.profile.position"
            :label="$t('profile.position')"
          />
          <form-field-input
            v-model="user.profile.skills"
            :label="$t('profile.skill')"
          />
          <form-field-input
            v-model="user.profile.experience"
            :label="$t('profile.experience')"
          />
        </div>
      </panel>

      <panel :header="$t('profile.social_contact')" :toggleable="true">
        <div class="space-y-4">
          <form-field-input
            v-model="user.profile.contact.telegram"
            :label="$t('common.telegram')"
          />
          <form-field-input
            v-model="user.profile.contact.line"
            :label="$t('common.line')"
          />
          <form-field-input
            v-model="user.profile.contact.wechat"
            :label="$t('common.wechat')"
          />
          <form-field-input
            v-model="user.profile.contact.facebook"
            :label="$t('common.facebook')"
          />
          <form-field-input
            v-model="user.profile.contact.linkedin"
            :label="$t('common.linkedin')"
          />
          <form-field-input
            v-model="user.profile.contact.instagram"
            :label="$t('common.instagram')"
          />
          <form-field-input
            v-model="user.profile.contact.youtube"
            :label="$t('common.youtube')"
          />
          <form-field-input
            v-model="user.profile.contact.tiktok"
            :label="$t('common.tiktok')"
          />
        </div>
      </panel>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PersonalProfile',

  props: {
    value: {
      type: Object,
      required: true
    }
  },

  computed: {
    user: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>
