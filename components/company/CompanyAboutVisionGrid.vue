<template>
  <div class="container mx-auto gap-8 py-10 lg:px-0 md:px-4 sm:px-4 px-4">
    <div
      class="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-8"
    >
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
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { mapGetters } from 'vuex'

export default defineComponent({
  name: 'CompanyAboutVisionGrid',

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
      cardClass:
        'bg-white p-5 border-2 rounded-md hover:transition duration-300 ease-in-out hover:scale-105 transform hover:shadow-lg',
      iconClass:
        'text-4xl text-primary rounded-md border-2 border-primary bg-primary-light mb-4 p-2',
      labelClass: 'text-primary text-2xl font-bold mb-2'
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
