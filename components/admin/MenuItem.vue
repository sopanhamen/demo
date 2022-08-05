<template>
  <div class="menu-item-wrapper">
    <!-- main menu -->
    <a v-if="item.target === '_blank'" :href="item.link" target="_blank">
      <div class="menu-item h-8">
        <div class="flex">
          <i class="mr-2" :class="item.icon" />
          <p class="menu-title whitespace-nowrap">
            {{ $t('sidebar_menu.' + item.title) }}
          </p>
        </div>
      </div>
    </a>
    <nuxt-link v-else :to="item.link ? localePath(item.link) : '#'">
      <div
        class="menu-item h-8"
        :class="activeClass(item)"
        @click="toggleSubmenus(item)"
      >
        <div class="flex">
          <i class="mr-2" :class="item.icon" />
          <p v-if="showLabel" class="menu-title whitespace-nowrap">
            {{ $t('sidebar_menu.' + item.title) }}
          </p>
        </div>
        <div v-if="showLabel" class="flex flex-row">
          <span v-if="item.badge" class="badge">{{ item.badge }}</span>
          <i v-if="item.submenus" class="fa fa-chevron-down fa-xs" />
        </div>
      </div>
    </nuxt-link>
    <transition name="slide">
      <ul v-if="hasSubmenu(item)" v-show="isSubmenuShown(item)" class="child">
        <template v-for="submenu in item.submenus">
          <li
            :key="submenu.title"
            @click="selectSubItemSideBar(submenu.title, item.title)"
          >
            <nuxt-link
              :to="submenu.link ? localePath(submenu.link) : '#'"
              class="submenu-item"
              :class="activeClass(submenu)"
            >
              <div class="flex">
                <div class="w-6 text-right">
                  <i class="mr-2" :class="submenu.icon" />
                </div>
                <p class="menu-title whitespace-nowrap">
                  {{ $t('sidebar_menu.' + submenu.title) }}
                </p>
              </div>
              <div v-if="submenu.badge" class="badge">{{ submenu.badge }}</div>
            </nuxt-link>
          </li>
        </template>
      </ul>
    </transition>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    showLabel: {
      type: Boolean,
      required: true
    }
  },

  computed: {
    selectedItem({ $store }) {
      return $store.state.theme.admin.selectedItem
    },
    selectedSubItem({ $store }) {
      return $store.state.theme.admin.selectedSubItem
    },
    openedSubMenu({ $store }) {
      return $store.state.theme.admin.openedSubMenu
    }
  },

  methods: {
    activeClass(menu) {
      if (menu.submenus) {
        const links = menu?.submenus?.map((item) => item.link)

        if (links && links.length > 0) {
          const activeChild = links.find((link) =>
            this.$route?.path?.includes(link)
          )

          return activeChild ? 'bg-red-100 border-l-4 border-red-400' : ''
        }
      }

      if (!menu.link) {
        return false
      }

      if (!this.$route?.path?.includes(menu.link)) {
        return false
      }

      return 'bg-red-200 border-l-4 border-red-500'
    },

    ...mapMutations({
      updateLayout: 'theme/UPDATE_LAYOUT'
    }),
    isSubmenuShown(menu) {
      return this.openedSubMenu.includes(menu.title)
    },
    hasSubmenu(menu) {
      return menu.submenus && menu.submenus.length > 0 && this.showLabel
    },
    toggleSubmenus(menu) {
      const layout = 'admin'
      if (!menu.submenus) {
        this.updateLayout({
          layout,
          data: { selectedItem: menu.title, selectedSubItem: null }
        })

        return false
      }

      const openedSubMenu = [...this.openedSubMenu]
      const index = openedSubMenu.findIndex((i) => i === menu.title)
      if (index !== -1) {
        openedSubMenu.splice(index)
      } else {
        openedSubMenu.push(menu.title)
      }

      this.updateLayout({ layout, data: { openedSubMenu } })
    },
    selectSubItemSideBar(subTitle, title) {
      this.$emit('selectedSubTitle', subTitle, title)
    }
  }
}
</script>

<style scoped>
@import '~/assets/css/collapse.scss';
</style>
