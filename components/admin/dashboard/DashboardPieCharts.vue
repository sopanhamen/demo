<template>
  <div
    class="bg-white rounded-lg shadow flex items-content-center relative pt-28 sm:pt-20 xl:pt-0"
  >
    <div
      class="absolute top-4 px-4 z-10 flex flex-wrap items-center justify-between w-full"
    >
      <select-button
        v-model="activeChart"
        :options="chartDisplayOptions"
        option-label="name"
        option-value="value"
      />
      <div class="inline space-x-2">
        <span>{{ $t('dashboard.sub_total_properties') }}:</span>
        <span v-if="activeChart" class="text-xl">
          <span v-if="activeChart === 'location'">{{
            totalPropertyLocation
          }}</span>
          <span v-if="activeChart === 'developer'">{{
            totalPropertyDeveloper
          }}</span>
          <span v-if="activeChart === 'project'">{{
            totalPropertyProject
          }}</span>
          <span v-if="activeChart === 'property_type_group'">
            {{ totalPropertyTypeGroupProperties }}
          </span>
        </span>
      </div>
    </div>

    <chart
      v-if="activeChart === 'location'"
      class="mx-auto"
      type="pie"
      :data="locationData"
      :options="options"
      :width="480"
      :height="280"
    />
    <chart
      v-else-if="activeChart === 'developer'"
      class="mx-auto"
      type="pie"
      :data="developerData"
      :options="options"
      :width="480"
      :height="280"
    />
    <chart
      v-else-if="activeChart === 'project'"
      class="mx-auto"
      type="pie"
      :data="projectData"
      :options="options"
      :width="480"
      :height="280"
    />
    <chart
      v-else-if="activeChart === 'property_type_group'"
      class="mx-auto"
      type="pie"
      :data="propertyTypeGroupData"
      :options="options"
      :width="480"
      :height="280"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { PropertyTypeGroupLabel } from '@/enums/PropertyTypeGroup'

export default {
  data() {
    return {
      activeChart: 'location',
      chartDisplayOptions: [
        { name: this.$t('location.label'), value: 'location' },
        { name: this.$t('developer.label'), value: 'developer' },
        { name: this.$t('project.label'), value: 'project' },
        {
          name: this.$t('property_type_group.label'),
          value: 'property_type_group'
        }
      ],
      colors: [
        '#42A5F5',
        '#66BB6A',
        '#FFA726',
        '#ef4444',
        '#0d9488',
        '#c026d3',
        '#e11d48',
        '#ea580c'
      ],
      hoverColors: [
        '#64B5F6',
        '#81C784',
        '#FFB74D',
        '#f87171',
        '#14b8a6',
        '#d946ef',
        '#f43f5e',
        '#f97316'
      ],
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right'
          }
        },
        tooltip: {
          mode: 'index'
        }
      }
    }
  },

  computed: {
    ...mapGetters({
      propertyCountsByLocation: 'dashboard/getPropertyCountsByLocation',
      propertyCountsByDeveloper: 'dashboard/getPropertyCountsByDeveloper',
      propertyCountsByProject: 'dashboard/getPropertyCountsByProject',
      propertyCountsByPropertyTypeGroup:
        'dashboard/getPropertyCountsByPropertyTypeGroup'
    }),

    totalPropertyLocation() {
      const items = this.propertyCountsByLocation
      const total = items.reduce(
        (sum, item) => (sum += item.number_of_properties),
        0
      )

      return total
    },
    locationData() {
      const items = this.propertyCountsByLocation
      return {
        labels: items.map((item) => {
          return this.formatString(item, item.name_en)
        }),
        datasets: [
          {
            data: items.map((i) => i.number_of_properties),
            backgroundColor: this.colors,
            hoverBackgroundColor: this.hoverColors
          }
        ]
      }
    },
    totalPropertyDeveloper() {
      const items = this.propertyCountsByDeveloper
      const total = items.reduce(
        (sum, item) => (sum += item.number_of_properties),
        0
      )

      return total
    },
    developerData() {
      const items = this.propertyCountsByDeveloper

      return {
        labels: items.map((item) => {
          return this.formatString(item, item.name)
        }),
        datasets: [
          {
            data: items.map((i) => i.number_of_properties),
            backgroundColor: this.colors,
            hoverBackgroundColor: this.hoverColors
          }
        ]
      }
    },
    totalPropertyProject() {
      const items = this.propertyCountsByProject
      const total = items.reduce(
        (sum, item) => (sum += item.number_of_properties),
        0
      )

      return total
    },
    projectData() {
      const items = this.propertyCountsByProject
      return {
        labels: items.map((item) => {
          return this.formatString(item, item.name)
        }),
        datasets: [
          {
            data: items.map((i) => i.number_of_properties),
            backgroundColor: this.colors,
            hoverBackgroundColor: this.hoverColors
          }
        ]
      }
    },
    totalPropertyTypeGroupProperties() {
      const items = this.propertyCountsByPropertyTypeGroup
      const total = items.reduce(
        (sum, item) => (sum += item.number_of_properties),
        0
      )

      return total
    },
    propertyTypeGroupData() {
      const items = this.propertyCountsByPropertyTypeGroup
      return {
        labels: items.map((item) => {
          return this.formatString(
            item,
            this.$t(
              'property_type_group.model.' +
                PropertyTypeGroupLabel[item.property_type_group]
            )
          )
        }),
        datasets: [
          {
            data: items.map((i) => i.number_of_properties),
            backgroundColor: this.colors,
            hoverBackgroundColor: this.hoverColors
          }
        ]
      }
    }
  },

  methods: {
    formatString(item, name) {
      return `${item.number_of_properties} - ${name.substr(0, 25)}${
        name.length >= 25 ? '...' : ''
      }`
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .p-selectbutton {
  .p-button-label {
    font-size: 0.85rem !important;
    padding-top: 0.1rem;
    padding-bottom: 0.1rem;
  }
}
::v-deep .p-button {
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
}
</style>
