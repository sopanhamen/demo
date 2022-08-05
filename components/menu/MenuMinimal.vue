<template>
  <div class="hidden lg:block">
    <ul class="flex items-center space-x-4 text-base py-4">
      <li
        v-for="menu in menuItemsMinimal"
        :key="menu.title"
        class="transition transform hover:-translate-y-1 duration-300"
      >
        <router-link
          class="px-4 pt-4 pb-5"
          :to="localePath(menu.link) || ''"
          :class="{
            [menuMinimalClass]: true,
            [activeMinimalClass]: selectedMenu == menu.title
          }"
          @click.native="updateSelectedMenu(menu)"
        >
          {{ $t(menu.title) }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    menuMinimalClass: {
      type: String,
      default() {
        return 'hover:text-primary'
      }
    },
    activeMinimalClass: {
      type: String,
      default() {
        return 'active font-bold text-primary'
      }
    }
  },

  data() {
    return {
      selectedMenu: ''
    }
  },

  computed: {
    menuItemsMinimal() {
      return [
        {
          title: 'menu.properties',
          link: 'properties'
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
    updateSelectedMenu(menu) {
      this.selectedMenu = menu.title
    }
  }
}
</script>
