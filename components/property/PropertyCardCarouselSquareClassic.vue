<template>
  <div class="relative p-2">
    <div :class="labelClass">
      <property-tag-purpose
        :item="item"
        class="rounded-none py-1 text-sm px-4 text-white shadow"
        purpose-color="bg-primary"
      />
      <property-tag-status
        :item="item"
        class="rounded-none py-1 text-sm px-2 text-white shadow"
        status-color="bg-primary"
      />
    </div>

    <div class="bg-white border border-gray-400">
      <!-- Image carousel -->
      <div :class="imageCarouselClass">
        <component
          :is="`Property${exclusive.name}`"
          v-if="item.publishing && item.publishing.exclusive"
        />
        <nuxt-link
          class="transition duration-1000 hover:scale-125"
          :to="localePath('/detail-listing/' + item.id)"
        >
          <image-carousel
            :images="item.images || []"
            :img-class="imgClass"
            thumbnail-key="thumbnail_url"
            image-key="image_url"
          />
        </nuxt-link>
      </div>

      <div class="rounded-b-lg relative">
        <div class="px-4 space-y-2">
          <div class="absolute -top-12 left-4 text-sm text-white">
            <i class="fa fa-location-dot mr-2" />
            <a
              v-if="item.location.lat_lng"
              :href="`http://www.google.com/maps/place/${item.location.lat_lng}`"
              target="_blank"
            >
              <span class="drop-shadow-lg">{{
                fullAddress(item.location)
              }}</span>
            </a>
            <span v-else class="drop-shadow-lg">{{
              fullAddress(item.location)
            }}</span>
          </div>

          <div class="flex items-center text-primary text-lg font-bold">
            {{ item.property_type.name }}
            {{
              $t(
                'listing_purpose.model.' +
                  ListingPurposeLabel[item.listing_purpose]
              )
            }}
            {{ item.code }}
          </div>

          <div class="flex items-center">
            <property-prices
              :item="item"
              purposes-sale-style="text-primary text-md font-bold"
              purposes-rent-style="text-primary text-md font-bold"
            />
          </div>

          <div class="flex flex-col gap-y-2">
            <div
              class="font-normal text-sm text-gray-600 truncate flex flex-row items-center gap-x-2"
            >
              <span>{{ $t('location.label') }}: </span>
              <p>{{ fullAddress(item.location) }}</p>
            </div>
            <div
              class="font-normal text-sm text-gray-600 truncate flex flex-row items-center gap-x-2"
            >
              <span>{{ $t('common.price') }}: </span>
              <property-prices
                :item="item"
                purposes-sale-style="text-gray-600"
                purposes-rent-style="text-gray-600"
              />
            </div>
          </div>

          <div
            class="font-normal text-sm text-gray-600 flex flex-row items-center gap-x-6 pt-2 pb-4"
          >
            <div>
              <i class="fa fa-bed"></i>
              <span>{{ item.number_of_bedrooms || 0 }}</span>
            </div>
            <div>
              <i class="fa fa-bath"></i>
              <span>{{ item.number_of_bathrooms || 0 }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- Property Footer -->
      <slot name="footer">
        <div class="border-t border-primary mx-4 py-4">
          <div class="flex justify-between items-center gap-x-2">
            <nuxt-link
              :to="`agent-detail/${item.assignee.id}`"
              class="flex flex-row items-center gap-x-2"
            >
              <nuxt-img
                :src="item.assignee.profile.profile_picture.url || defaultImage"
                class="rounded-full"
                style="width: 30px; height: 30px"
              />
              <span class="text-sm font-bold text-primary">
                {{ item.assignee.name }}
              </span>
            </nuxt-link>
            <div class="flex text-sm text-gray-200">
              <div class="relative">
                <pv-button
                  icon="pi pi-share-alt"
                  class="last-of-type:p-button-xs p-button-secondary p-button-text z-40 py-1 w-9"
                  :aria-haspopup="true"
                  @click="$refs.menu.toggle($event)"
                />
                <pv-menu
                  ref="menu"
                  :model="items"
                  :popup="true"
                  style="width: 40px"
                />
              </div>
              <pv-button
                icon="pi pi-heart"
                class="last-of-type:p-button-xs p-button-secondary p-button-text py-1 px-0 w-9"
                :disabled="true"
              />
              <pv-button
                icon="pi pi-plus"
                class="last-of-type:p-button-xs p-button-secondary p-button-text py-1 w-9"
                :disabled="true"
              />
            </div>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
import { computed } from '@nuxtjs/composition-api'
import { ListingPurposeLabel } from '@/enums/ListingPurpose'
import { image } from '@/config'
import useLocation from '@/composables/useLocation'

export default {
  props: {
    props: {
      type: Object,
      required: true
    },
    item: {
      type: Object,
      required: true
    },
    imgClass: {
      type: Array,
      default() {
        return []
      }
    },
    cardStyle: {
      type: Object,
      default() {
        return { name: 'Default', label: 'Default' }
      }
    },
    labelClass: {
      type: String,
      default: 'absolute top-6 left-6 z-10'
    }
  },

  setup() {
    const { fullAddress } = useLocation()

    const items = computed(() => [
      {
        icon: 'pi pi-facebook',
        command: () => {
          window.open(
            `https://www.facebook.com/sharer.php?u=${window?.location?.href}`,
            '_blank'
          )
        }
      },
      {
        icon: 'pi pi-twitter',
        command: () => {
          window.open(
            `https://twitter.com/intent/tweet?text=${window?.location?.href}`,
            '_blank'
          )
        }
      },
      {
        icon: 'pi pi-whatsapp',
        command: () => {
          window.open(
            `https://api.whatsapp.com/send?text=${window?.location?.href}`,
            '_blank'
          )
        }
      },
      {
        icon: 'pi pi-envelope',
        command: () => {
          window.open(
            `mailto:email@email.com?subject=${window?.location?.href}
            &body=${window?.location?.href}`,
            '_blank'
          )
        }
      }
    ])

    return {
      items,
      fullAddress,
      ListingPurposeLabel
    }
  },

  data() {
    return {
      defaultImage: image.default.noImageLg
    }
  },

  computed: {
    exclusive() {
      return (
        this.props.exclusive || { name: 'ExclusiveRibbon', label: 'Ribbon' }
      )
    },
    imageCarouselClass() {
      if (this.exclusive.name === 'ExclusiveRibbon') {
        return 'relative overflow-hidden'
      }

      return 'relative'
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .p-menu.p-component.p-menu-overlay {
  top: 40px !important;
  left: 0 !important;
  z-index: 50;
}
</style>
