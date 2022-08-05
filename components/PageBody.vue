<template>
  <div>
    <section
      v-for="row in sections"
      :key="row.id"
      :class="rowClassList(row)"
      :style="styleList(row.props)"
    >
      <div v-for="column in row.columns" :key="column.id">
        <template v-for="component in column.components">
          <component
            :is="component.name"
            :key="component.id"
            :props="component.props"
          />
        </template>
      </div>
    </section>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import useTheme from '@/composables/useTheme'

export default defineComponent({
  props: {
    sections: {
      type: Array,
      required: true
    }
  },

  setup() {
    const { styleList } = useTheme()
    return { styleList }
  },

  methods: {
    rowClassList(row) {
      const classList = []
      if (row.columns.length) {
        classList.push('grid grid-cols-' + row.columns.length)
      }

      if (row.props.classList) {
        classList.push(row.props.classList)
      }

      return classList
    }
  }
})
</script>
