<template>
  <footer>
    <div class="bg-stone-800 text-gray-300">
      <div class="container mx-auto sm:bg-transparent sm:px-0 px-4 py-16">
        <div
          class="flex justify-between lg:flex-row md:flex-row sm:flex-col flex-col gap-6 md:text-left sm:text-center text-center"
        >
          <!-- Contact Us block -->
          <div class="col-span-2 space-y-2">
            <div>
              <p class="text-lg font-bold mb-4">
                {{ $t('contact.title') }}
              </p>
              <p v-for="row in contactUs" :key="row.id" class="text-base">
                <a :href="row.link" target="_blank"
                  ><i :class="row.icon" /> {{ $t(row.contact) }}</a
                >
              </p>
            </div>
          </div>
          <!-- Social Media block -->
          <div class="space-y-2">
            <template v-if="facebook.url">
              <a :href="facebook.url" class="grid justify-items-center">
                <iframe
                  :src="
                    facebookPluginLink +
                    `?href=${encodeURI(
                      facebook.url
                    )}&tabs&width=340&height=130&small_header=false&adapt_container_width=false&hide_cover=false&show_facepile=false&appId`
                  "
                  width="340"
                  style="border: none; overflow: hidden"
                  scrolling="no"
                  frameborder="0"
                  allowfullscreen="true"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share`"
                ></iframe>
              </a>
            </template>
          </div>
        </div>
      </div>
    </div>

    <div
      class="px-4 bg-stone-900 text-gray-400 text-sm leading-6 py-4 sm:flex-wrap"
    >
      <div class="container mx-auto flex justify-between">
        <span class="font-bold">
          {{ $t(footer.copyright) || empty }}
        </span>
        <span class="font-bold">
          {{ $t(footer.company) || empty }}
        </span>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      facebookPluginLink: 'https://www.facebook.com/plugins/page.php',
      empty: 'N/A',
      phone: '+855',
      companyName: 'Company Name',
      address:
        '#1B, Sola Street(317 ), SangKat Steung Mean Chey, Khan Mean Chey, Phnom Penh, CAMBODIA'
    }
  },

  computed: {
    ...mapGetters({
      getCompany: 'company/getCompanies'
    }),
    footer() {
      return {
        copyright: 'Copyright 2022 | All Rights Reserved',
        company: this.getCompany[0]?.name || this.companyName
      }
    },
    contactUs() {
      return [
        {
          contact: this.getCompany[0]?.address || this.address,
          link:
            'http://www.google.com/maps/place/' + this.getCompany[0]?.lat_lng,
          icon: 'fa fa-home'
        },
        {
          contact: this.getCompany[0]?.email,
          link: 'mailto:' + this.getCompany[0]?.email,
          icon: 'fa fa-envelope'
        },
        {
          contact: this.getCompany[0]?.primary_phone || this.phone,
          link: 'tel:' + this.getCompany[0]?.primary_phone,
          icon: 'fa fa-mobile'
        },
        {
          contact: this.getCompany[0]?.secondary_phone || this.phone,
          link: 'tel:' + this.getCompany[0]?.secondary_phone,
          icon: 'fa fa-mobile'
        }
      ]
    },
    facebook() {
      return {
        url: this.getCompany[0]?.facebook
      }
    }
  }
}
</script>
