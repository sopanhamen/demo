<template>
  <pv-dialog
    header="Property Card Carousels"
    :container-style="{ width: '60vw' }"
    :visible="true"
    :closable="false"
    :modal="true"
  >
    <div class="grid grid-cols-4 gap-x-4">
      <div class="col-span-3 pr-4 border-r border-solid">
        <h4 class="font-bold mb-2">Style Option</h4>
        <div
          v-if="props.availableStyles"
          :class="`grid grid-cols-${props.availableStyles.length} mb-8`"
        >
          <div v-for="style in props.availableStyles" :key="style.name">
            <radio-button
              v-model="selectedStyle"
              :input-id="style"
              :value="style"
              name="style"
            />
            {{ style.label }}
          </div>
        </div>

        <div>
          <h4 class="font-bold mb-2">Exclusive Style</h4>
          <div v-if="props.exclusiveStyles" class="grid grid-cols-4 mb-8">
            <div
              v-for="exclusive in props.exclusiveStyles"
              :key="exclusive.name"
            >
              <radio-button
                v-model="selectedExclusive"
                :input-id="exclusive"
                :value="exclusive"
                name="exclusive"
              />
              {{ exclusive.label }}
            </div>
          </div>
        </div>

        <div class="grid grid-cols-4 h-52">
          <div>
            <h4 class="text-sm font-bold mb-2">Grid</h4>
            <div class="flex">
              <dropdown v-model="gridStyle" :options="[3, 4]" />
            </div>
          </div>
          <div>
            <h4 class="text-sm font-bold mb-2">Listing Purpose</h4>
            <div class="flex">
              <dropdown
                v-model="listingPurpose"
                :options="listingPurposeOptions"
                option-value="value"
                option-label="label"
              />
            </div>
          </div>
        </div>
      </div>
      <admin-theme-component-style v-model="styleProps" />
    </div>
    <template #footer>
      <pv-button
        label="Close"
        icon="pi pi-times"
        class="p-button-text"
        @click="$emit('close', true)"
      />
      <pv-button
        :class="roundSize"
        label="Okay"
        icon="pi pi-check"
        autofocus
        @click="onUpdate"
      />
    </template>
  </pv-dialog>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { ListingPurpose, ListingPurposeLabel } from '@/enums/ListingPurpose'
import useTheme from '@/composables/useTheme'

export default defineComponent({
  name: 'PropertyAdvancedSearchSetting',

  props: {
    props: {
      type: Object,
      required: true
    }
  },

  setup() {
    const { roundSize } = useTheme()
    return { roundSize }
  },

  data() {
    return {
      selectedStyle: null,
      selectedExclusive: null,
      styleProps: {
        classList: '',
        backgroundColor: '',
        backgroundImage: ''
      },
      gridStyle: 3,
      listingPurpose: 1
    }
  },

  computed: {
    listingPurposeOptions() {
      return Object.values(ListingPurpose).map((purpose) => ({
        value: purpose,
        label: this.$t('listing_purpose.model.' + ListingPurposeLabel[purpose])
      }))
    }
  },

  mounted() {
    this.selectedStyle = this.props.style
    this.selectedExclusive = this.props.exclusive
    this.gridStyle = this.props.gridStyle
    this.listingPurpose = this.props.listingPurpose
    this.styleProps = {
      classList: this.props.classList,
      backgroundColor: this.props.backgroundColor,
      backgroundImage: this.props.backgroundImage
    }
  },

  methods: {
    onUpdate() {
      this.$emit('update', {
        ...this.props,
        ...this.styleProps,
        gridStyle: this.gridStyle,
        listingPurpose: this.listingPurpose,
        style: this.selectedStyle,
        exclusive: this.selectedExclusive
      })
    }
  }
})
</script>
