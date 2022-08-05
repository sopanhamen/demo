<template>
  <div class="grid grid-cols-2 gap-x-4">
    <div>
      <div class="mb-4">
        <h4 class="text-2xl font-bold mb-2">Presets</h4>
        <form-field-select
          v-model="selectedPreset"
          :options="presets"
          option-label="name"
          name="preset"
          @change="onSelectedPreset"
        />
      </div>
      <h2 class="text-2xl font-bold mb-2">Color & Style</h2>
      <div class="flex flex-col gap-y-4">
        <div>
          <h4 class="text-base font-bold">Colors</h4>
          <div class="flex flex-row gap-x-4 mt-2">
            <div
              v-for="color in colors"
              :key="color"
              :data-color="color"
              class="w-24"
            >
              <radio-button
                v-model="selectedColor"
                :value="color"
                name="color"
              />
              {{ color }}
              <div class="my-1 bg-primary py-4 text-center text-white">
                {{ color }}
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 class="text-base font-bold">Font</h4>
          <div class="flex flex-col gap-y-2 mt-4">
            <div
              v-for="(fontFamily, fontFamilyLabel) in fontFamilies"
              :key="fontFamily"
              class="w-36"
            >
              <radio-button
                v-model="selectedFontFamily"
                :value="fontFamily"
                name="font-family"
              />
              {{ fontFamilyLabel }}
            </div>
          </div>
        </div>

        <div>
          <h4 class="text-base font-bold">Round Style</h4>
          <div class="flex flex-col gap-y-2 mt-4">
            <div
              v-for="(roundSize, roundLabel) in roundSizes"
              :key="roundSize"
              class="w-36"
            >
              <radio-button
                v-model="selectedRoundSize"
                :value="roundSize"
                name="round-size"
              />
              {{ roundLabel }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <h2 class="text-2xl font-bold mb-2">Navbar</h2>
      <div class="flex flex-col gap-y-2 mb-5">
        <div v-for="navbar in navbarOptions" :key="navbar.name">
          <radio-button
            v-model="selectedNavbar"
            :value="navbar"
            name="navbar"
          />
          {{ navbar.label }}
        </div>
      </div>

      <h2 class="text-2xl font-bold mb-2">Menu Style</h2>
      <div class="flex flex-row gap-x-4 mb-5">
        <div v-for="menu in menuOptions" :key="menu.name">
          <radio-button v-model="selectedMenu" :value="menu" name="menu" />
          {{ menu.label }}
        </div>
      </div>

      <h2 class="text-2xl font-bold mb-2">Sidebar</h2>
      <div class="text-gray-300 mb-5">Coming soon...</div>

      <h2 class="text-2xl font-bold mb-2">Footer</h2>
      <div class="flex flex-col gap-y-2 mb-5">
        <div v-for="footer in footerOptions" :key="footer.name">
          <radio-button
            v-model="selectedFooter"
            :value="footer"
            name="footer"
          />
          {{ footer.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createHelpers } from 'vuex-map-fields'
import { defineComponent, ref } from '@nuxtjs/composition-api'
import Preset1 from '~/static/theme/presets/preset-1.json'
import Preset2 from '~/static/theme/presets/preset-2.json'
import Preset3 from '~/static/theme/presets/preset-3.json'

const { mapFields } = createHelpers({
  getterType: 'theme/getField',
  mutationType: 'theme/updateField'
})

export default defineComponent({
  setup() {
    const colors = ref(['default', 'sunset', 'rose', 'red', 'green'])

    const roundSizes = ref({
      'No Round': 'rounded-none',
      'Round Small': 'rounded-sm',
      'Round Medium': 'rounded-md',
      'Round Large': 'rounded-lg',
      'Round XL': 'rounded-xl'
    })

    const fontFamilies = ref({
      Lato: 'lato',
      Nunito: 'nunito',
      Quicksand: 'quicksand',
      Raleway: 'raleway',
      Roboto: 'roboto'
    })

    const navbarOptions = ref([
      {
        label: 'Default',
        name: 'LazyNavbarDefault',
        props: {
          showLanguageSwitcher: true
        }
      },
      {
        label: 'Double Layer',
        name: 'LazyNavbarDoubleLayer',
        props: {
          showLanguageSwitcher: true
        }
      }
    ])

    const menuOptions = [
      {
        label: 'Default',
        name: 'LazyMenuDefault',
        props: {
          showLanguageSwitcher: true
        }
      },
      {
        label: 'Basic',
        name: 'LazyMenuBasic',
        props: {
          showLanguageSwitcher: true
        }
      },
      {
        label: 'Minimal',
        name: 'LazyMenuMinimal',
        props: {
          showLanguageSwitcher: true
        }
      }
    ]

    const footerOptions = [
      {
        label: 'Default',
        name: 'FooterDefault',
        props: {
          showSocialMedia: true
        }
      },
      {
        label: 'Basic',
        name: 'FooterBasic',
        props: {
          showSocialMedia: true
        }
      },
      {
        label: 'Double Layer',
        name: 'FooterDoubleLayer',
        props: {
          showSocialMedia: true
        }
      }
    ]

    const selectedPreset = ref({})
    const presets = [Preset1, Preset2, Preset3]

    return {
      fontFamilies,
      selectedPreset,
      presets,
      colors,
      roundSizes,
      navbarOptions,
      menuOptions,
      footerOptions
    }
  },

  computed: {
    ...mapFields({
      websiteForm: 'websiteForm',
      selectedFontFamily: 'websiteForm.font',
      selectedRoundSize: 'websiteForm.roundSize',
      selectedColor: 'websiteForm.color',
      selectedNavbar: 'websiteForm.navbar',
      selectedMenu: 'websiteForm.menu',
      selectedFooter: 'websiteForm.footer'
    })
  },

  methods: {
    onSelectedPreset(preset) {
      this.$confirm.require({
        message:
          'The website will be replaced with this preset. Are you sure to continue?',
        header: 'Attention!!',
        icon: 'pi pi-exclamation-triangle text-yellow-500',
        acceptClass: 'p-button-danger',
        accept: () => {
          if (this.selectedPreset?.data) {
            this.websiteForm = this.selectedPreset.data
          }
        }
      })
    }
  }
})
</script>

<style lang="postcss" scoped>
.font-item {
  @apply bg-white border rounded px-2 py-1 hover:bg-indigo-50 cursor-pointer;
}
</style>
