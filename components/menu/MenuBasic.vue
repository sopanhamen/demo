<template>
  <div class="hidden lg:block">
    <ul class="flex items-center space-x-4 text-base py-4">
      <li
        v-for="menu in menuItemsBasic"
        :key="menu.title"
        @mouseover="showDropdown(menu.title)"
        @mouseleave="dMenuOpen = ''"
      >
        <router-link
          class="px-4 pt-4 pb-5"
          :to="localePath(menu.link) || ''"
          :class="{
            [menuBasicClass]: true,
            [activeBasicClass]: selectedMenu == menu.title,
            'font-bold underline underline-offset-8 decoration-4':
              dMenuOpen == menu.title
          }"
          @click.native="updateSelectedMenu(menu)"
        >
          {{ $t(menu.title) }}
        </router-link>
        <!-- Submenu items -->
        <ul
          v-if="menu.subItems && dMenuOpen == menu.title"
          class="absolute bg-white mt-4 px-10 py-4 shadow-lg w-72"
          @mouseover="showDropdown(menu.title)"
          @mouseleave="dMenuOpen = ''"
        >
          <li
            v-for="submenu in menu.subItems"
            :key="submenu.title"
            class="my-4 text-gray-700 hover:text-primary"
          >
            <router-link
              :class="{
                'active text-primary-thick ':
                  selectedSub == menu.title + submenu.title
              }"
              :to="localePath(submenu.link) || ''"
              @click.native="updateSelectedSubmenu(menu.title, submenu.title)"
            >
              <div
                class="flex justify-between transition transform hover:translate-x-3 duration-300"
              >
                <span>{{ $t(submenu.title) }}</span>
              </div>
              <div class="border-b border-gray-700 mt-2" />
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { ListingPurpose } from '@/enums/ListingPurpose'

export default {
  props: {
    menuBasicClass: {
      type: String,
      default() {
        return 'hover:underline underline-offset-8 decoration-4 hover:text-primary'
      }
    },
    activeBasicClass: {
      type: String,
      default() {
        return 'active font-bold underline underline-offset-8 decoration-4 text-primary'
      }
    }
  },

  data() {
    return {
      dMenuOpen: '',
      selectedMenu: '',
      selectedSub: '',
      zero: 0
    }
  },

  computed: {
    menuItemsBasic() {
      return [
        {
          title: 'menu.home',
          link: '/'
        },
        {
          title: 'menu.properties',
          link: 'properties',
          subItems: [
            {
              title: 'menu.for_sale',
              link: this.listingPurposeLink(ListingPurpose.SALE)
            },
            {
              title: 'menu.for_rent',
              link: this.listingPurposeLink(ListingPurpose.RENT)
            },
            {
              title: 'menu.for_rent_sale',
              link: this.listingPurposeLink(ListingPurpose.RENT_OR_SALE)
            }
          ]
        },
        {
          title: 'menu.map',
          link: '/map'
        },
        {
          title: 'menu.our_agent',
          link: '/agents'
        },
        {
          title: 'menu.news',
          link: '/news'
        },
        {
          title: 'menu.submenu.contact_us',
          link: '/contact'
        }
      ]
    }
  },

  methods: {
    listingPurposeLink(purpose) {
      return this.localePath({
        path: 'properties',
        query: { purpose }
      })
    },
    showDropdown(menuTitle) {
      this.dMenuOpen = menuTitle
    },
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
    }
  }
}
</script>
