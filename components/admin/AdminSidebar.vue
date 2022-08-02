<template>
  <aside
    class="h-screen md:block top-0 sticky scrollbar-hidden flex shrink-0 bg-red-50 shadow-lg transform duration-300 pb-24"
    :class="{
      'min-w-full w-full': showSidebar,
      'min-w-0 w-0': !showSidebar,
      'md-min-w-16 md:w-16': sidebarSize === 16 && showSidebar,
      'md-min-w-64 md:w-64': sidebarSize === 64 && showSidebar
    }"
    @mouseenter="expandSidebar"
    @mouseleave="collapseSidebar"
  >
    <div class="h-full w-full">
      <!-- Logo -->
      <div class="flex justify-between top-0 sticky h-12 bg-red-200 pl-2">
        <div class="py-2"><app-logo :image-class="['h-8']" /></div>
        <div>
          <button
            class="md:hidden block p-3 bg-white"
            @click="toggleSidebar('admin')"
          >
            <i class="fa fa-arrow-left fa-lg" />
          </button>
        </div>
      </div>

      <!-- Menu items -->
      <client-only>
        <scroll-panel
          v-if="permissions && permissions.length > 0"
          class="h-full scrollpanel-bar"
        >
          <div class="p-2">
            <template v-for="group in menuItems">
              <div :key="group.id" class="menu-group-section">
                <div v-if="group.title" class="menu-group-title">
                  <span v-if="sidebarSize === 64" class="whitespace-nowrap">
                    {{ $t('sidebar_menu.' + group.title) }}
                  </span>
                  <span v-else>
                    {{ $t('sidebar_menu.' + group.title).charAt(0) }}
                  </span>
                </div>
                <template v-for="menu in group.menus">
                  <admin-menu-item
                    v-if="!menu.submenus || menu.submenus.length > 0"
                    :key="menu.id"
                    :item="menu"
                    :show-label="sidebarSize == 64"
                    @selectedSidebar="setValueSelected"
                    @selectedSubTitle="setValueSubItem"
                  />
                </template>
              </div>
            </template>
          </div>
        </scroll-panel>
      </client-only>
      <admin-resource-status class="absolute bottom-6 p-4" />
      <app-version
        v-if="showSidebar"
        class="absolute bottom-0 p-4 text-gray-800"
      />
    </div>
  </aside>
</template>

<script>
import { cloneDeep } from 'lodash'
import { mapMutations } from 'vuex'
import useAuth from '@/authorizations/useAuth'
import useMenu from '@/composables/useMenu'

export default {
  name: 'AdminSidebar',

  setup() {
    const { permissions, userCan } = useAuth()
    const { ADMIN_MENU_ITEMS } = useMenu()

    return { ADMIN_MENU_ITEMS, permissions, userCan }
  },

  data() {
    return {
      selectedItem: null
    }
  },

  computed: {
    showSidebar({ $store }) {
      return $store.state.theme.admin.showSidebar
    },
    sidebarSize({ $store }) {
      return $store.state.theme.admin.sidebarSize
    },
    isSidebarSmall({ $store }) {
      return $store.state.theme.admin.isSidebarSmall
    },
    selectedSubItem({ $store }) {
      return $store.state.theme.admin.selectedSubItem
    },
    menuItems() {
      return this.filterMenus(this.ADMIN_MENU_ITEMS)
    }
  },

  mounted() {
    // if back button is pressed
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },

  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },

  methods: {
    ...mapMutations({
      updateLayout: 'theme/UPDATE_LAYOUT',
      updateSidebarSize: 'theme/UPDATE_SIDEBAR_SIZE',
      minimizeSidebar: 'theme/MINIMIZE_SIDEBAR',
      maximizeSidebar: 'theme/MAXIMIZE_SIDEBAR',
      toggleSidebar: 'theme/TOGGLE_SIDEBAR'
    }),
    filterMenus(menus) {
      const items = this.mapAuthorizedMenus(menus)
      return items.filter((item) => {
        return item.menus.find((menu) => {
          if (!menu.submenus) {
            return menu
          }

          if (menu.submenus && menu.submenus.length > 0) {
            return menu
          }

          return undefined
        })
      })
    },
    mapAuthorizedMenus(menuItems) {
      const menus = cloneDeep(menuItems)
      return menus.reduce((array, menu) => {
        if (menu.menus && menu.menus.length > 0) {
          menu.menus = this.mapAuthorizedMenus(menu.menus)
          array.push(menu)
        } else if (menu.submenus && menu.submenus.length > 0) {
          menu.submenus = this.mapAuthorizedMenus(menu.submenus)
          array.push(menu)
        } else if ((!menu.menus || !menu.submenus) && !menu.permissions) {
          array.push(menu)
        } else if (menu.permissions && this.userCan(menu.permissions)) {
          array.push(menu)
        }

        return array
      }, [])
    },
    setValueSelected(event) {
      let showSidebar = this.showSidebar
      let selectedSubItem = null

      if (!event.submenus) {
        showSidebar = !showSidebar
        selectedSubItem = null
      } else if (this.selectedItem !== event.title) {
        selectedSubItem = null
      }

      const selectedItem = event.title
      this.updateLayout({
        layout: 'admin',
        data: { showSidebar, selectedSubItem, selectedItem }
      })
    },
    setValueSubItem(subTitle, title) {
      this.updateLayout({
        layout: 'admin',
        data: {
          selectedSubItem: subTitle,
          selectedItem: title
        }
      })
    },
    expandSidebar() {
      this.updateSidebarSize({ layout: 'admin', size: 64 })
    },
    collapseSidebar() {
      if (!this.isSidebarSmall) {
        return
      }

      this.updateSidebarSize({ layout: 'admin', size: 16 })
    },
    async logout() {
      await this.$auth.logout()
    },
    handleResize() {
      const data = { windowWidth: window.innerWidth, showSidebar: true }
      if (data.windowWidth <= this.mobileSize) {
        data.isSidebarSmall = false
        data.sidebarSize = 64
        data.showSidebar = false
      }

      this.updateLayout({ layout: 'admin', data })
    }
  }
}
</script>
