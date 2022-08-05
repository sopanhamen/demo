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

export default {
  data() {
    return {
      footer: {
        name: 'Company Name',
        text: '. All Rights Reserved',
        summary:
          'Company Name is a Real Estate company. We focus on a standard residential building in Phnom Penh.',
        copyright: {
          text: 'Copyright ',
          icon: 'fa fa-copyright',
          year: '2022'
        }
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
        summary: this.getCompany[0]?.summary,
        facebook: this.getCompany[0]?.facebook,
        telegram: this.getCompany[0]?.telegram,
        youtube: this.getCompany[0]?.youtube,
        linked_in: this.getCompany[0]?.linked_in,
        instagram: this.getCompany[0]?.instagram
      }
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
    }
  }
}
</script>
