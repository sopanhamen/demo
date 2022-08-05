<template>
  <div
    class="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 py-10 lg:px-0 md:px-4 sm:px-4 px-4"
  >
    <div class="grid grid-cols-1 gap-8">
      <!-- eslint-disable vue/no-v-html -->
      <div :class="cardClass">
        <i :class="'fa fa-eye ' + iconClass" />
        <div>
          <p :class="labelClass">
            {{ $t('company_profile.our_mission.vision') }}
          </p>

          <div class="ql-editor" v-html="props.vision || company.vision"></div>
        </div>
      </div>

      <div :class="cardClass">
        <i :class="'fa fa-bullseye ' + iconClass" />
        <div>
          <p :class="labelClass">
            {{ $t('company_profile.our_mission.mission') }}
          </p>

          <div
            class="ql-editor"
            v-html="props.mission || company.mission"
          ></div>
        </div>
      </div>

      <div :class="cardClass">
        <i :class="'fa fa-atom ' + iconClass" />
        <div>
          <p :class="labelClass">
            {{ $t('company_profile.our_mission.core_value') }}
          </p>

          <div
            class="ql-editor"
            v-html="props.coreValue || company.core_value"
          ></div>
        </div>
      </div>
    </div>
    <div
      :style="`background-image: url(${props.imageUrl})`"
      class="bg-no-repeat bg-auto lg:h-full md:h-full h-80 lg:order-last md:order-last order-first"
    >
      ...
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { mapGetters } from 'vuex'

export default defineComponent({
  name: 'CompanyAboutVisionDefault',

  props: {
    props: {
      type: Object,
      default() {
        return {
          vision: '',
          mission: '',
          coreValue: '',
          imageUrl: ''
        }
      }
    }
  },

  data() {
    return {
      cardClass: 'flex border py-5 pl-5 pr-5 md:pr-10',
      iconClass:
        'mr-3 sm:mr-5 sm:text-7xl text-5xl text-right w-9 sm:w-16 text-primary',
      labelClass: 'text-2xl font-bold pb-1'
    }
  },

  computed: {
    ...mapGetters({
      getCompany: 'company/getCompanies'
    }),
    company() {
      return {
        vision: this.getCompany[0]?.vision,
        mission: this.getCompany[0]?.mission,
        core_value: this.getCompany[0]?.key_value
      }
    }
  }
})
</script>

<style scoped>
::v-deep .ql-editor ol,
::v-deep .ql-editor ul {
  padding-left: 0;
  margin-left: -1.5rem;
}
</style>
