<template>
  <div class="hidden lg:block">
    <ul class="flex items-center space-x-4 text-base py-4">
      <li
        v-for="menu in menuItems"
        :key="menu.title"
        @mouseover="showDropdown(menu.title)"
        @mouseleave="dMenuOpen = ''"
      >
        <router-link
          class="px-4 py-5"
          :to="localePath(menu.link) || ''"
          :class="{
            [menuDefaultClass]: true,
            [activeDefaultClass]: selectedMenu == menu.title
          }"
          @click.native="updateSelectedMenu(menu)"
        >
          {{ $t(menu.title) }}
          <i v-if="menu.subItems" class="fa fa-angle-down fa-sm" />
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
                'active text-primary': selectedSub == menu.title + submenu.title
              }"
              :to="localePath(submenu.link) || ''"
              @click.native="updateSelectedSubmenu(menu.title, submenu.title)"
            >
              <div
                class="flex justify-between transition transform hover:translate-x-3 duration-300"
              >
                <span>{{ $t(submenu.title) }}</span>
                <span
                  v-if="submenu.amount > -1"
                  class="items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-primary rounded-full"
                >
                  {{ submenu.amount || zero }}
                </span>
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
import { mapGetters } from 'vuex'
import { cloneDeep } from 'lodash'
import { ListingPurpose } from '@/enums/ListingPurpose'
import { PropertyTypeGroup } from '@/enums/PropertyTypeGroup'

export default {
  props: {
    menuDefaultClass: {
      type: String,
      default() {
        return 'hover:text-primary'
      }
    },
    activeDefaultClass: {
      type: String,
      default() {
        return 'active text-primary font-bold'
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
    ...mapGetters({
      getPropertyCounts: 'listing/getPropertyCounts'
    }),
    menuItemsDefault() {
      return [
        {
          title: 'menu.home',
          link: '/'
        },
        {
          title: 'menu.for_rent',
          subItems: [
            {
              title: 'property_type_group.model.homes',
              link: this.propertyLink(
                ListingPurpose.RENT,
                PropertyTypeGroup.HOMES
              ),
              listingPurpose: ListingPurpose.RENT,
              propertyTypeGroup: PropertyTypeGroup.HOMES,
              amount: 0
            },
            {
              title: 'property_type_group.model.lands_plots',
              link: this.propertyLink(
                ListingPurpose.RENT,
                PropertyTypeGroup.LANDS_PLOTS
              ),
              listingPurpose: ListingPurpose.RENT,
              propertyTypeGroup: PropertyTypeGroup.LANDS_PLOTS,
              amount: 0
            },
            {
              title: 'property_type_group.model.commercial',
              link: this.propertyLink(
                ListingPurpose.RENT,
                PropertyTypeGroup.COMMERCIAL
              ),
              listingPurpose: ListingPurpose.RENT,
              propertyTypeGroup: PropertyTypeGroup.COMMERCIAL,
              amount: 0
            },
            {
              title: 'property_type_group.model.business',
              link: this.propertyLink(
                ListingPurpose.RENT,
                PropertyTypeGroup.BUSINESS
              ),
              listingPurpose: ListingPurpose.RENT,
              propertyTypeGroup: PropertyTypeGroup.BUSINESS,
              amount: 0
            },
            {
              title: 'property_type_group.model.industrial',
              link: this.propertyLink(
                ListingPurpose.RENT,
                PropertyTypeGroup.INDUSTRIAL
              ),
              listingPurpose: ListingPurpose.RENT,
              propertyTypeGroup: PropertyTypeGroup.INDUSTRIAL,
              amount: 0
            },
            {
              title: 'property_type_group.model.petrol_station',
              link: this.propertyLink(
                ListingPurpose.RENT,
                PropertyTypeGroup.PETROL_STATION
              ),
              listingPurpose: ListingPurpose.RENT,
              propertyTypeGroup: PropertyTypeGroup.PETROL_STATION,
              amount: 0
            }
          ]
        },
        {
          title: 'menu.for_sale',
          subItems: [
            {
              title: 'property_type_group.model.homes',
              link: this.propertyLink(
                ListingPurpose.SALE,
                PropertyTypeGroup.HOMES
              ),
              listingPurpose: ListingPurpose.SALE,
              propertyTypeGroup: PropertyTypeGroup.HOMES,
              amount: 0
            },
            {
              title: 'property_type_group.model.lands_plots',
              link: this.propertyLink(
                ListingPurpose.SALE,
                PropertyTypeGroup.LANDS_PLOTS
              ),
              listingPurpose: ListingPurpose.SALE,
              propertyTypeGroup: PropertyTypeGroup.LANDS_PLOTS,
              amount: 0
            },
            {
              title: 'property_type_group.model.commercial',
              link: this.propertyLink(
                ListingPurpose.SALE,
                PropertyTypeGroup.COMMERCIAL
              ),
              listingPurpose: ListingPurpose.SALE,
              propertyTypeGroup: PropertyTypeGroup.COMMERCIAL,
              amount: 0
            },
            {
              title: 'property_type_group.model.business',
              link: this.propertyLink(
                ListingPurpose.SALE,
                PropertyTypeGroup.BUSINESS
              ),
              listingPurpose: ListingPurpose.SALE,
              propertyTypeGroup: PropertyTypeGroup.BUSINESS,
              amount: 0
            },
            {
              title: 'property_type_group.model.industrial',
              link: this.propertyLink(
                ListingPurpose.SALE,
                PropertyTypeGroup.INDUSTRIAL
              ),
              listingPurpose: ListingPurpose.SALE,
              propertyTypeGroup: PropertyTypeGroup.INDUSTRIAL,
              amount: 0
            },
            {
              title: 'property_type_group.model.petrol_station',
              link: this.propertyLink(
                ListingPurpose.SALE,
                PropertyTypeGroup.PETROL_STATION
              ),
              listingPurpose: ListingPurpose.SALE,
              propertyTypeGroup: PropertyTypeGroup.PETROL_STATION,
              amount: 0
            }
          ]
        },
        {
          title: 'menu.for_rent_sale',
          subItems: [
            {
              title: 'property_type_group.model.homes',
              link: this.propertyLink(
                ListingPurpose.RENT_OR_SALE,
                PropertyTypeGroup.HOMES
              ),
              listingPurpose: ListingPurpose.RENT_OR_SALE,
              propertyTypeGroup: PropertyTypeGroup.HOMES,
              amount: 0
            },
            {
              title: 'property_type_group.model.lands_plots',
              link: this.propertyLink(
                ListingPurpose.RENT_OR_SALE,
                PropertyTypeGroup.LANDS_PLOTS
              ),
              listingPurpose: ListingPurpose.RENT_OR_SALE,
              propertyTypeGroup: PropertyTypeGroup.LANDS_PLOTS,
              amount: 0
            },
            {
              title: 'property_type_group.model.commercial',
              link: this.propertyLink(
                ListingPurpose.RENT_OR_SALE,
                PropertyTypeGroup.COMMERCIAL
              ),
              listingPurpose: ListingPurpose.RENT_OR_SALE,
              propertyTypeGroup: PropertyTypeGroup.COMMERCIAL,
              amount: 0
            },
            {
              title: 'property_type_group.model.business',
              link: this.propertyLink(
                ListingPurpose.RENT_OR_SALE,
                PropertyTypeGroup.BUSINESS
              ),
              listingPurpose: ListingPurpose.RENT_OR_SALE,
              propertyTypeGroup: PropertyTypeGroup.BUSINESS,
              amount: 0
            },
            {
              title: 'property_type_group.model.industrial',
              link: this.propertyLink(
                ListingPurpose.RENT_OR_SALE,
                PropertyTypeGroup.INDUSTRIAL
              ),
              listingPurpose: ListingPurpose.RENT_OR_SALE,
              propertyTypeGroup: PropertyTypeGroup.INDUSTRIAL,
              amount: 0
            },
            {
              title: 'property_type_group.model.petrol_station',
              link: this.propertyLink(
                ListingPurpose.RENT_OR_SALE,
                PropertyTypeGroup.PETROL_STATION
              ),
              listingPurpose: ListingPurpose.RENT_OR_SALE,
              propertyTypeGroup: PropertyTypeGroup.PETROL_STATION,
              amount: 0
            }
          ]
        },
        {
          title: 'menu.about_us',
          subItems: [
            {
              title: 'menu.our_agent',
              link: '/agents'
            },
            {
              title: 'menu.submenu.company_profile',
              link: '/about'
            },
            {
              title: 'menu.submenu.contact_us',
              link: '/contact'
            }
          ]
        }
      ]
    },
    menuItems() {
      return cloneDeep(this.menuItemsDefault).map((menuItem) => {
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
    }
  },

  methods: {
    propertyLink(purpose, propertyTypeGroup) {
      return this.localePath({
        path: `/properties?filtering=false&purpose=${purpose}&group=${propertyTypeGroup}`
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
