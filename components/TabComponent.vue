<template>
  <div>
    <div
      :class="{
        'flex space-x-4  ': variant === 'horizontal'
      }"
    >
      <ul
        class="w-full list-none bg-blue-900 p-2 rounded-lg text-center overflow-auto whitespace-nowrap mb-4"
        :class="{
          'flex items-center': variant === 'vertical',
          'sm:flex items-center': variant === 'vertical-sm:horizontal'
        }"
      >
        <li
          v-for="(tab, index) in tabList"
          :key="index"
          class="px-4 py-2 rounded-lg"
          :class="{
            'text-blue-600 bg-white shadow-xl': tab === currentTab,
            'text-white': tab !== currentTab
          }"
        >
          <label
            class="cursor-pointer block"
            @click="onTabChanged(tab)"
            v-text="$t(tab)"
          />
        </li>
      </ul>
      <slot :name="currentTab" />

      <!-- <div class="my-12">
        <div class="flex flex-wrap">
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabList: {
      type: Array,
      required: true
    },
    thisTab: {
      type: String,
      required: true
    },
    variant: {
      type: String,
      required: false,
      default: () => 'vertical',
      validator: (value) =>
        ['horizontal', 'vertical', 'vertical-sm:horizontal'].includes(value)
    }
  },
  data() {
    return {
      currentTab: this.thisTab
    }
  },
  methods: {
    onTabChanged(tab) {
      this.currentTab = tab
    }
  }
}
</script>
