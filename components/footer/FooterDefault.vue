<template>
  <footer>
    <div class="bg-gray-200 w-full sm:flex-col">
      <div
        class="container mx-auto flex flex-col lg:flex-row md:justify-between"
      >
        <div
          class="flex justify-center lg:justify-start flex-col lg:flex-row items-center mb-6 mt-6"
        >
          <app-logo
            image-class=" h-24 py-4 "
            class="inline mx-auto sm:mx-none"
          />
          <div class="text-sm pl-4 max-w-sm text-center lg:text-left">
            {{ company.summary || footer.summary }}
          </div>
        </div>

        <div
          class="flex-auto flex items-center justify-center lg:justify-end text-lg mb-6"
        >
          <div class="flex flex-col md:flex-row items-center">
            <div class="text-center max-w-lg pr-2">
              {{ $t('common.follow_us') }}:
            </div>
            <div class="flex justify-center space-x-5">
              <template v-for="row in social">
                <a
                  v-if="row.disabled"
                  :key="row.id"
                  :href="row.link"
                  target="_blank"
                >
                  <i
                    :class="[
                      row.icon,
                      'fa-lg hover:stroke-current hover:text-primary text-2xl'
                    ]"
                  />
                </a>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-stone-800 text-gray-300">
      <div class="container mx-auto sm:bg-transparent sm:px-0 px-4 py-5">
        <div
          class="grid lg:grid-cols-6 md:grid-cols-3 grid-cols gap-6 md:text-left sm:text-center text-center"
        >
          <!-- Address block -->
          <div class="col-span-2 space-y-2">
            <p :class="labelClass">
              {{ $t('footer.address.label') }}
            </p>
            <p class="text-sm lg:max-w-xs">
               <p v-for="row in getAddress" :key="row.id" class="text-base">
                <a :href="row.link" target="_blank"
                  > {{ $t(row.address) }} </a
                >
              </p>
            </p>
            <!-- Get in touch block -->
            <div>
              <p :class="labelClass">
                {{ $t('footer.get_in_touch') }}
              </p>
              <p v-for="row in getInTouch" :key="row.id" class="text-sm">
                <a :href="row.link" class="hover:text-primary text-gray-300">
                  {{ $t(row.contact) }}
                </a>
              </p>
            </div>
          </div>
          <!-- About us -->
          <div>
            <p :class="labelClass">
              {{ $t('company_profile.about_us.label') }}
            </p>
            <ul>
              <li v-for="row in aboutUs" :key="row.id">
                <nuxt-link
                  :to="localePath(row.link)"
                  class="hover:text-primary text-gray-300"
                >
                  {{ $t(row.title) }}</nuxt-link
                >
              </li>
            </ul>
          </div>
          <!-- For rent -->
          <div>
            <p :class="labelClass">
              {{ $t('menu.for_rent') }}
            </p>
            <ul>
              <li v-for="row in footer.for_rent" :key="row.id">
                <nuxt-link
                  :to="row.link"
                  class="hover:text-primary text-gray-300"
                >
                  {{ $t(row.title) }}</nuxt-link
                >
              </li>
            </ul>
          </div>
          <!-- For sale -->
          <div>
            <p :class="labelClass">
              {{ $t('menu.for_sale') }}
            </p>
            <ul>
              <li v-for="row in footer.for_sale" :key="row.id">
                <nuxt-link
                  :to="row.link"
                  class="hover:text-primary text-gray-300"
                >
                  {{ $t(row.title) }}</nuxt-link
                >
              </li>
            </ul>
          </div>
          <!-- For rent or sale -->
          <div>
            <p :class="labelClass">
              {{ $t('menu.for_rent_sale') }}
            </p>
            <ul>
              <li v-for="row in footer.for_rent_sale" :key="row.id">
                <nuxt-link
                  :to="row.link"
                  class="hover:text-primary text-gray-300"
                >
                  {{ $t(row.title) }}</nuxt-link
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div
      class="px-4 bg-stone-900 text-gray-400 text-sm leading-6 py-2 sm:flex-wrap"
    >
      <div class="container mx-auto">
        <span class="font-bold">
          {{ footer.copyright.text }} <i :class="footer.copyright.icon"></i>
          {{ footer.copyright.year }}
        </span>
        <span class="px-4">
          {{ company.name || footer.name }} {{ footer.text }}
        </span>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex'
import { ListingPurpose } from '@/enums/ListingPurpose'
import { PropertyTypeGroup } from '@/enums/PropertyTypeGroup'

export default {
  data() {
    return {
      labelClass: 'text-lg font-bold mt-4',
      footer: {
        name: 'Company Name',
        text: '. All Rights Reserved',
        phone: '+855',
        email: 'contact@domain.com',
        summary:
          'Company Name is a Real Estate company. We focus on a standard residential building in Phnom Penh.',
        address:
          '#1B, Sola Street(317), SangKat Steung Mean Chey, Khan Mean Chey, Phnom Penh, CAMBODIA',
        copyright: {
          text: 'Copyright ',
          icon: 'fa fa-copyright',
          year: '2022'
        },
        for_rent: [
          {
            title: 'property_type_group.model.homes',
            link: this.propertyLink(
              ListingPurpose.RENT,
              PropertyTypeGroup.HOMES
            )
          },
          {
            title: 'property_type_group.model.lands_plots',
            link: this.propertyLink(
              ListingPurpose.RENT,
              PropertyTypeGroup.LANDS_PLOTS
            )
          },
          {
            title: 'property_type_group.model.commercial',
            link: this.propertyLink(
              ListingPurpose.RENT,
              PropertyTypeGroup.COMMERCIAL
            )
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
            )
          },
          {
            title: 'property_type_group.model.petrol_station',
            link: this.propertyLink(
              ListingPurpose.RENT,
              PropertyTypeGroup.PETROL_STATION
            )
          }
        ],
        for_sale: [
          {
            title: 'property_type_group.model.homes',
            link: this.propertyLink(
              ListingPurpose.SALE,
              PropertyTypeGroup.HOMES
            )
          },
          {
            title: 'property_type_group.model.lands_plots',
            link: this.propertyLink(
              ListingPurpose.SALE,
              PropertyTypeGroup.LANDS_PLOTS
            )
          },
          {
            title: 'property_type_group.model.commercial',
            link: this.propertyLink(
              ListingPurpose.SALE,
              PropertyTypeGroup.COMMERCIAL
            )
          },
          {
            title: 'property_type_group.model.business',
            link: this.propertyLink(
              ListingPurpose.SALE,
              PropertyTypeGroup.BUSINESS
            )
          },
          {
            title: 'property_type_group.model.industrial',
            link: this.propertyLink(
              ListingPurpose.SALE,
              PropertyTypeGroup.INDUSTRIAL
            )
          },
          {
            title: 'property_type_group.model.petrol_station',
            link: this.propertyLink(
              ListingPurpose.SALE,
              PropertyTypeGroup.PETROL_STATION
            )
          }
        ],
        for_rent_sale: [
          {
            title: 'property_type_group.model.homes',
            link: this.propertyLink(
              ListingPurpose.RENT_OR_SALE,
              PropertyTypeGroup.HOMES
            )
          },
          {
            title: 'property_type_group.model.lands_plots',
            link: this.propertyLink(
              ListingPurpose.RENT_OR_SALE,
              PropertyTypeGroup.LANDS_PLOTS
            )
          },
          {
            title: 'property_type_group.model.commercial',
            link: this.propertyLink(
              ListingPurpose.RENT_OR_SALE,
              PropertyTypeGroup.COMMERCIAL
            )
          },
          {
            title: 'property_type_group.model.business',
            link: this.propertyLink(
              ListingPurpose.RENT_OR_SALE,
              PropertyTypeGroup.BUSINESS
            )
          },
          {
            title: 'property_type_group.model.industrial',
            link: this.propertyLink(
              ListingPurpose.RENT_OR_SALE,
              PropertyTypeGroup.INDUSTRIAL
            )
          },
          {
            title: 'property_type_group.model.petrol_station',
            link: this.propertyLink(
              ListingPurpose.RENT_OR_SALE,
              PropertyTypeGroup.PETROL_STATION
            )
          }
        ]
      }
    }
  },

  computed: {
    ...mapGetters({
      getCompany: 'company/getCompanies'
    }),
    company() {
      return {
        name: this.getCompany[0]?.name,
        address: this.getCompany[0]?.address,
        lat_lng: this.getCompany[0]?.lat_lng,
        summary: this.getCompany[0]?.summary,
        email: this.getCompany[0]?.email,
        primary_phone: this.getCompany[0]?.primary_phone,
        secondary_phone: this.getCompany[0]?.secondary_phone,
        facebook: this.getCompany[0]?.facebook,
        telegram: this.getCompany[0]?.telegram,
        youtube: this.getCompany[0]?.youtube,
        linked_in: this.getCompany[0]?.linked_in,
        instagram: this.getCompany[0]?.instagram
      }
    },
    getAddress() {
      return[ {
          address: this.company.address || this.footer.address,
          link:
            'http://www.google.com/maps/place/' + this.company.lat_lng,
          
      }]
    },
    getInTouch() {
      return [
        {
          contact: this.company.email || this.footer.email,
          link: 'mailto:' + this.company.email
        },
        {
          contact: this.company.primary_phone || this.footer.phone,
          link: 'tel:' + this.company.primary_phone
        },
        {
          contact: this.company.secondary_phone || this.footer.phone,
          link: 'tel:' + this.company.secondary_phone
        }
      ]
    },
    social() {
      return [
        {
          icon: 'pi pi-telegram',
          disabled: this.company.telegram,
          link: this.company.telegram || '#'
        },
        {
          icon: 'pi pi-facebook',
          disabled: this.company.facebook,
          link: this.company.facebook || '#'
        },
        {
          icon: 'pi pi-youtube',
          disabled: this.company.youtube,
          link: this.company.youtube || '#'
        },
        {
          icon: 'pi pi-instagram',
          disabled: this.company.instagram,
          link: this.company.instagram || '#'
        },
        {
          icon: 'pi pi-linkedin',
          disabled: this.company.linked_in,
          link: this.company.linked_in || '#'
        }
      ]
    },
    aboutUs() {
      return [
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
  },

  methods: {
    propertyLink(purpose, propertyTypeGroup) {
      return `/properties?filtering=false&purpose=${purpose}&group=${propertyTypeGroup}`
    }
  }
}
</script>
