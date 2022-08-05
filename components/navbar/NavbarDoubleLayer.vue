<template>
  <div class="mb-14">
    <nav
      class="fixed z-50 w-full bg-white drop-shadow-sm h-24 flex items-center"
    >
      <div
        class="sticky top-0 container mx-auto flex items-center justify-between"
      >
        <!-- Header logo -->
        <div class="py-4">
          <app-logo :image-class="['h-14']" />
        </div>

        <!-- Mobile toggle -->
        <div class="lg:hidden">
          <button @click="drawer">
            <i class="fa fa-bars fa-2x" />
          </button>
        </div>

        <!-- Navbar -->
        <div class="hidden lg:block">
          <div class="inline-grid grid-cols-2 gap-8">
            <div
              v-for="row in contactUs"
              :key="row.id"
              :title="row.tooltip"
              class="z-90 flex flex-row gap-4 text-3xl"
            >
              <i :class="row.icon" />
              <p class="text-sm">
                <nuxt-link :to="row.link" class="font-bold">
                  {{ $t(row.contact) }}
                </nuxt-link>
                <label class="block">{{ row.label }}</label>
              </p>
            </div>
          </div>
        </div>

        <!-- Dark Background Transition -->
        <transition
          enter-class="opacity-0"
          enter-active-class="ease-out transition-medium"
          enter-to-class="opacity-100"
          leave-class="opacity-100"
          leave-active-class="ease-out transition-medium"
          leave-to-class="opacity-0"
        >
          <div
            v-show="isOpen"
            class="z-10 fixed inset-0 transition-opacity lg:hidden"
            @keydown.esc="isOpen = false"
          >
            <div
              class="absolute h-screen inset-0 bg-black opacity-50"
              tabindex="0"
              @click="isOpen = false"
            />
          </div>
        </transition>

        <!-- Drawer Menu -->
        <aside
          class="p-5 transform top-0 left-0 w-full sm:w-64 bg-white fixed h-screen overflow-auto ease-in-out transition-all duration-300 z-30 lg:hidden"
          :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
        >
          <div class="close">
            <button
              class="absolute top-0 right-0 mt-4 mr-4"
              @click="isOpen = false"
            >
              <i class="fa fa-times fa-lg" />
            </button>
          </div>

          <div class="" @click="isOpen = false">
            <AppLogo :image-class="['h-12']" />
          </div>

          <ul class="divide-y">
            <li
              v-for="menuItem in menuItems"
              :key="menuItem.title"
              @click="toggleSubmenu(menuItem.title)"
            >
              <router-link
                :to="localePath(menuItem.link) || ''"
                class="my-2 inline-block"
                :class="{
                  'active text-primary-thick': selectedMenu == menuItem.title
                }"
                @click.native="updateSelectedMenu(menuItem)"
              >
                {{ $t(menuItem.title) }}
                <i v-if="menuItem.subItems" class="fa fa-angle-down" />
              </router-link>
              <ul
                v-if="menuItem.subItems && mMenuOpen == menuItem.title"
                class="ml-6"
              >
                <li
                  v-for="submenu in menuItem.subItems"
                  :key="submenu.title"
                  class="my-2 hover:text-primary"
                >
                  <router-link
                    :class="{
                      'active text-primary-thick':
                        selectedSub == menuItem.title + submenu.title
                    }"
                    :to="localePath(submenu.link) || ''"
                    @click.native="
                      updateSelectedSubmenu(menuItem.title, submenu.title)
                    "
                  >
                    <div
                      class="flex justify-between transition transform hover:translate-x-2 duration-300"
                    >
                      <span>{{ $t(submenu.title) }}</span>
                      <span
                        v-if="submenu.amount > -1"
                        class="items-center justify-center px-2 py-1 text-xs font-bold text-red-100 bg-red-600 rounded-full"
                      >
                        {{ submenu.amount || zero }}
                      </span>
                    </div>
                  </router-link>
                </li>
              </ul>
            </li>
            <li>
              <language-bar />
            </li>
          </ul>
        </aside>
      </div>
    </nav>

    <div
      class="absolute z-40 w-full bg-primary text-gray-100 mt-24 hidden lg:block"
      style="margin-top: 66px"
    >
      <div class="container mx-auto flex items-center justify-between">
        <!-- Menu -->
        <component
          :is="menu.name"
          :menu-default-class="'hover:text-white'"
          :active-default-class="'active text-white font-bold'"
          :menu-basic-class="'hover:underline underline-offset-8 decoration-4 hover:text-white'"
          :active-basic-class="'active font-bold underline underline-offset-8 decoration-4 text-white'"
          :menu-minimal-class="'hover:text-white'"
          :active-minimal-class="'active text-white font-bold'"
        />
        <language-bar />
      </div>
    </div>
  </div>
</template>

<script>
import { createHelpers } from 'vuex-map-fields'
import { cloneDeep } from 'lodash'
import { mapGetters } from 'vuex'

const { mapFields } = createHelpers({
  getterType: 'theme/getField'
})

export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      isOpen: false,
      mMenuOpen: '',
      dMenuOpen: '',
      selectedMenu: '',
      selectedSub: '',
      zero: 0
    }
  },

  computed: {
    ...mapGetters({
      getCompany: 'company/getCompanies',
      getPropertyCounts: 'listing/getPropertyCounts'
    }),
    ...mapFields({
      getMenu: 'website.menu'
    }),
    menu() {
      return (
        this.getMenu || {
          label: 'Default',
          name: 'LazyMenuDefault',
          props: {
            showLanguageSwitcher: true
          }
        }
      )
    },
    menuItems() {
      return cloneDeep(this.items).map((menuItem) => {
        if (!menuItem.subItems) {
          return menuItem
        }

        return {
          ...menuItem,
          subItems: menuItem.subItems.map((subMenuItem) => {
            if (typeof subMenuItem.amount === 'undefined') {
              return subMenuItem
            }

            return {
              ...subMenuItem,
              amount: this.getPropertyCounts(
                subMenuItem.propertyTypeGroup,
                subMenuItem.listingPurpose
              )
            }
          })
        }
      })
    },
    address() {
      const address = this.getCompany[0].address

      if (!address) {
        return ''
      }

      const addresses = address.split(', ')

      return {
        district: addresses[addresses.length - 2],
        province: addresses[addresses.length - 1]
      }
    },
    contactUs() {
      return [
        {
          contact: this.getCompany[0].primary_phone || this.phone,
          label: this.$t('contact.call'),
          link: '/contact',
          icon: 'fa fa-phone-flip fa-lg text-primary',
          tooltip: null
        },
        {
          contact: this.address ? this.address.district : 'Mean Chey',
          label: this.address ? this.address.province : 'Phnom Penh',
          link: '/contact',
          icon: 'fa fa-location-dot fa-lg text-primary',
          tooltip: this.getCompany[0].address
        }
      ]
    }
  },

  watch: {
    isOpen: {
      immediate: true,
      handler(isOpen) {
        if (process.client) {
          if (isOpen) {
            document.body.style.setProperty('overflow', 'hidden')
          } else {
            document.body.style.removeProperty('overflow')
          }
        }
      }
    }
  },

  mounted() {
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 27 && this.isOpen) {
        this.isOpen = false
      }
    })
  },

  methods: {
    // Mobile screen case
    toggleSubmenu(menuTitle) {
      if (this.mMenuOpen === menuTitle) {
        this.mMenuOpen = ''
      } else {
        this.mMenuOpen = menuTitle
      }
    },
    // Desktop screen case
    updateSelectedMenu(menu) {
      if (menu.subItems) {
        return
      }
      this.selectedMenu = menu.title
      this.selectedSub = ''
    },
    updateSelectedSubmenu(menuTitle, submenuTitle) {
      this.selectedMenu = menuTitle
      this.selectedSub = menuTitle + submenuTitle
    },
    drawer() {
      this.isOpen = !this.isOpen
    }
  }
}
</script>
