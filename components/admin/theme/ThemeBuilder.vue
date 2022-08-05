<template>
  <div>
    <h2 class="text-2xl font-bold mb-2">
      {{ title }}
    </h2>
    <div class="grid grid-cols-5 gap-4">
      <div class="col-span-3 rounded-lg bg-slate-50 p-4">
        <div class="flex justify-end">
          <pv-button class="p-button-link" icon="pi pi-plus" @click="addRow" />
        </div>

        <div>
          <div class="column p-4 opacity-60">Navbar</div>
        </div>

        <template v-if="workingComponent.name">
          <div v-show="showComponentSettingDialog">
            <component
              :is="workingComponentName"
              :key="workingComponent.id"
              :props="workingComponent.props"
              @close="showComponentSettingDialog = false"
              @update="updateComponentSetting($event)"
            />
          </div>
        </template>

        <overlay-panel ref="rowMenu">
          <div v-if="workingRow">
            <strong>Grids</strong>
            <div class="flex flex-wrap gap-x-4 gap-y-3 mb-2">
              <div class="col-item group h-5 w-8" @click="setGrid(1)">
                <div class="col-grid h-5 w-8 border"></div>
              </div>
              <div class="col-item group w-8" @click="setGrid(2)">
                <div class="col-grid h-5 w-4 border"></div>
                <div class="col-grid h-5 w-4 border"></div>
              </div>
              <div class="col-item group w-9" @click="setGrid(3)">
                <div class="col-grid h-5 w-3 border"></div>
                <div class="col-grid h-5 w-3 border"></div>
                <div class="col-grid h-5 w-3 border"></div>
              </div>
              <div class="col-item group w-12" @click="setGrid(4)">
                <div class="col-grid h-5 w-3 border"></div>
                <div class="col-grid h-5 w-3 border"></div>
                <div class="col-grid h-5 w-3 border"></div>
                <div class="col-grid h-5 w-3 border"></div>
              </div>
            </div>

            <strong>Paddings</strong>
            <div class="flex gap-x-2 mb-2">
              <div>
                <div>Top</div>
                <input
                  v-model="workingRow.props.paddings.top"
                  class="tiny-input"
                  placeholder="0px"
                  @input="onWorkingRowChange()"
                />
              </div>
              <div>
                <div>Bottom</div>
                <input
                  v-model="workingRow.props.paddings.bottom"
                  class="tiny-input"
                  placeholder="0px"
                  @input="onWorkingRowChange()"
                />
              </div>
              <div>
                <div>Left</div>
                <input
                  v-model="workingRow.props.paddings.left"
                  class="tiny-input"
                  placeholder="0px"
                  @input="onWorkingRowChange()"
                />
              </div>
              <div>
                <div>Right</div>
                <input
                  v-model="workingRow.props.paddings.right"
                  class="tiny-input"
                  placeholder="0px"
                  @input="onWorkingRowChange()"
                />
              </div>
            </div>

            <strong>Margins</strong>
            <div class="flex gap-x-2 mb-2">
              <div>
                <div>Top</div>
                <input
                  v-model="workingRow.props.margins.top"
                  class="tiny-input"
                  placeholder="0px"
                  @input="onWorkingRowChange()"
                />
              </div>
              <div>
                <div>Bottom</div>
                <input
                  v-model="workingRow.props.margins.bottom"
                  class="tiny-input"
                  placeholder="0px"
                  @input="onWorkingRowChange()"
                />
              </div>
              <div>
                <div>Left</div>
                <input
                  v-model="workingRow.props.margins.left"
                  class="tiny-input"
                  placeholder="0px"
                  @input="onWorkingRowChange()"
                />
              </div>
              <div>
                <div>Right</div>
                <input
                  v-model="workingRow.props.margins.right"
                  class="tiny-input"
                  placeholder="0px"
                  @input="onWorkingRowChange()"
                />
              </div>
            </div>

            <strong>CSS Class</strong>
            <div class="mb-2">
              <input
                v-model="workingRow.props.classList"
                class="border rounded py-1 px-2 w-full"
                placeholder="class-name"
                @input="onWorkingRowChange()"
              />
            </div>

            <strong>Background Color</strong>
            <div class="flex gap-x-1 mb-2">
              <color-picker
                v-model="workingRow.props.backgroundColor"
                @input="onWorkingRowChange()"
              />
              <input
                v-model="workingRow.props.backgroundColor"
                class="flex-auto border rounded py-1 px-2"
                placeholder="transparent"
                @input="onWorkingRowChange()"
              />
            </div>

            <strong>Background Image</strong>
            <div class="mb-2">
              <input
                v-model="workingRow.props.backgroundImage"
                class="border rounded py-1 px-2 w-full"
                placeholder="https://example.com/image.jpg"
                @input="onWorkingRowChange()"
              />
            </div>

            <pv-button
              class="p-button-text bg-slate-50 p-button-sm w-full"
              label="Remove"
              @click="removeRow"
            />
          </div>
        </overlay-panel>

        <div v-for="(row, rowKey) in data.sections" :key="rowKey" class="flex">
          <div :class="`flex-auto grid grid-cols-${row.columns.length} gap-2`">
            <div
              v-for="column in row.columns"
              :key="column.id"
              :class="{
                'border-indigo-500': focusedColumn.id === column.id,
                'bg-gray-100': dragoverColumn === column.id
              }"
              class="column"
              @dragover.prevent
              @dragenter.prevent
              @drop="onDropComponent($event, column)"
              @click="updateColumn(column)"
            >
              <div
                v-if="column.components.length === 0"
                class="shadow rounded p-3 my-1 text-gray-300"
              >
                [BLANK]
              </div>
              <template v-else>
                <div
                  v-for="(component, componentKey) in column.components"
                  :key="componentKey"
                  class="component-item"
                  draggable
                  @dragstart="onDragComponent($event, { component, column })"
                >
                  <div
                    class="text-center flex-auto -mr-14"
                    @click="toggleComponentSetting(component)"
                  >
                    {{ component.label }}
                  </div>
                  <div class="flex-none w-14">
                    <i
                      class="pi pi-times"
                      @click="removeComponent(column, component)"
                    />
                  </div>
                </div>
              </template>
            </div>
          </div>
          <div class="flex-none w-6 flex items-center text-center">
            <div class="flex-auto">
              <i
                class="pi pi- pi-ellipsis-v cursor-pointer"
                @click="toggleRowMenu($event, row)"
              ></i>
            </div>
          </div>
        </div>
        <div>
          <div class="column p-4 opacity-60">Footer</div>
        </div>
      </div>
      <div class="col-span-2">
        <h3 class="font-semibold text-2xl mb-1">Components</h3>
        <div class="flex flex-wrap gap-y-2 gap-x-2 mb-5">
          <div
            v-for="component in components"
            :key="component.name"
            class="bg-white border rounded px-2 py-1 hover:bg-indigo-50 cursor-pointer"
            @click="addComponent(focusedColumn, component)"
          >
            {{ component.label }}
          </div>
        </div>

        <h3 class="font-semibold text-2xl mb-1">Settings</h3>
        <div class="flex flex-col gap-y-2">
          <form-field-input-switch
            v-model="showPageHeader"
            label="Show Page Header"
            @input="update({ showPageHeader: $event })"
          />
          <form-field-input-switch
            v-model="showBreadcrumb"
            label="Show Breadcrumb"
            @input="update({ showBreadcrumb: $event })"
          />
          <div>
            <strong>Background Color</strong>
            <div class="flex gap-x-1 mb-2">
              <color-picker
                v-model="backgroundColor"
                @input="update({ backgroundColor: $event })"
              />
              <input
                v-model="backgroundColor"
                class="flex-auto border rounded py-1 px-2"
                placeholder="transparent"
                @input="(e) => update({ backgroundColor: e.target.value })"
              />
            </div>
          </div>
          <div>
            <strong>CSS Class</strong>
            <div class="mb-2">
              <input
                v-model="classList"
                class="border rounded py-1 px-2 w-full"
                placeholder="class-name"
                @input="(e) => update({ classList: e.target.value })"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { v4 as uuid } from 'uuid'
import { cloneDeep } from 'lodash'
import {
  computed,
  defineComponent,
  ref,
  useStore
} from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true
    },
    data: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    const showPageHeader = ref(props?.data?.showPageHeader)
    const showBreadcrumb = ref(props?.data?.showBreadcrumb)
    const backgroundColor = ref(props?.data?.backgroundColor)
    const classList = ref(props?.data?.classList)

    const workingRow = ref(null)
    const workingComponent = ref({})
    const showComponentSettingDialog = ref(false)
    const focusedColumn = ref({})
    const dragoverColumn = ref(null)

    const workingComponentName = computed(() => {
      const name = String(workingComponent.value?.name).replace('Lazy', '')
      return `AdminThemeComponents${name}`
    })

    const { state } = useStore()

    return {
      components: state.theme.components,
      focusedColumn,
      workingRow,
      workingComponent,
      workingComponentName,
      showComponentSettingDialog,
      showPageHeader,
      showBreadcrumb,
      backgroundColor,
      classList,
      dragoverColumn
    }
  },

  methods: {
    updateColumn(column) {
      this.focusedColumn = column || {}
    },
    findColumnInSection(sections, column) {
      const row = sections.find((row) =>
        row.columns?.find((col) => col.id === column.id)
      )

      return row?.columns?.find((col) => col.id === column.id)
    },
    findSectionByComponent(component) {
      const sections = cloneDeep([...this.data.sections])
      return sections.find((row) =>
        row.columns?.find((col) =>
          col.components.find((comp) => comp.id === component.id)
        )
      )
    },
    findColumnByComponent(section, component) {
      return section.columns?.find((col) =>
        col.components.find((comp) => comp.id === component.id)
      )
    },
    findComponentInSection(section, component) {
      const column = section.columns?.find((col) =>
        col.components.find((comp) => comp.id === component.id)
      )

      return column?.components?.find((comp) => comp.id === component.id)
    },
    addComponent(targetColumn, component) {
      if (!this.focusedColumn?.id && !targetColumn) {
        return false
      }

      const sections = cloneDeep([...this.data.sections])
      const target = targetColumn ? { ...targetColumn } : this.focusedColumn
      const column = this.findColumnInSection(sections, target)

      if (column) {
        column.components.push({ ...component, id: uuid() })
        this.update({ sections })
      }
    },
    removeComponent(column, component) {
      const sections = cloneDeep([...this.data.sections])
      const deletingColumn = this.findColumnInSection(sections, column)
      const index = deletingColumn?.components.findIndex(
        (i) => i.id === component.id
      )

      if (index > -1) {
        deletingColumn.components.splice(index, 1)
        this.update({ sections })
      }
    },
    addRow() {
      const sections = cloneDeep([...this.data.sections])
      sections.push({
        id: uuid(),
        props: {
          paddings: {},
          margins: {},
          backgroundColor: 'transparent',
          backgroundImage: null,
          class: ''
        },
        columns: [{ id: uuid(), components: [], props: {} }]
      })

      this.update({ sections })
    },
    removeRow() {
      const index = this.data.sections.findIndex(
        (i) => i.id === this.workingRow.id
      )
      if (index > -1) {
        const sections = [...this.data.sections]
        sections.splice(index, 1)
        this.update({ sections })
      }

      this.$refs.rowMenu.hide()
    },
    setGrid(numberOfColumns) {
      const columns = []
      for (let i = 0; i < numberOfColumns; i++) {
        columns.push(
          this.workingRow.columns[i] || {
            id: uuid(),
            components: [],
            props: {}
          }
        )
      }

      // Change working row value
      this.workingRow.columns = columns

      // Clone sections and replace data
      const sections = [...this.data.sections]
      const index = sections.findIndex((i) => i.id === this.workingRow.id)
      sections[index] = { ...this.workingRow }

      // Set state = new replaced data
      this.update({ sections })
    },
    toggleRowMenu(event, row) {
      this.workingRow = cloneDeep({ ...row })

      if (Array.isArray(this.workingRow.props.paddings)) {
        this.workingRow.props.paddings = {
          top: '',
          bottom: '',
          left: '',
          right: ''
        }
      }

      if (Array.isArray(this.workingRow.props.margins)) {
        this.workingRow.props.margins = {
          top: '',
          bottom: '',
          left: '',
          right: ''
        }
      }

      this.$refs.rowMenu.toggle(event)
    },
    onWorkingRowChange() {
      const sections = [...this.data.sections]
      const index = sections.findIndex((i) => i.id === this.workingRow.id)
      sections[index] = cloneDeep({ ...this.workingRow })

      this.update({ sections })
    },
    updateSection(section) {
      const sections = [...this.data.sections]
      const index = sections.findIndex((i) => i.id === section.id)
      sections[index] = { ...section }

      this.update({ sections })
    },
    toggleComponentSetting(component) {
      this.workingComponent = cloneDeep({ ...component })
      this.showComponentSettingDialog = true
    },
    updateComponentSetting(event) {
      const data = { ...this.workingComponent, props: event }

      this.workingComponent = {}
      this.showComponentSettingDialog = false

      const section = this.findSectionByComponent(data)
      const column = this.findColumnByComponent(section, data)
      const component = column?.components?.find((comp) => comp.id === data.id)

      if (component) {
        component.props = event
        this.updateSection(section)
      }
    },
    update(data) {
      this.$emit('change', { ...this.data, ...data })
    },
    onDragComponent(evt, { component, column }) {
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('component', JSON.stringify(component))
      evt.dataTransfer.setData('column', JSON.stringify(column))
    },
    onDropComponent(evt, targetColumn) {
      const droppedComponent = evt.dataTransfer.getData('component')
      const component = JSON.parse(droppedComponent)

      const droppedColumn = evt.dataTransfer.getData('column')
      const fromColumn = JSON.parse(droppedColumn)

      if (fromColumn.id === targetColumn.id) {
        return false
      }

      this.addComponent(targetColumn, component)
      setTimeout(() => {
        this.removeComponent(fromColumn, component)
      }, 1)
    }
  }
})
</script>

<style lang="postcss" scoped>
.column {
  @apply my-1 py-1 px-2 rounded bg-white border-dashed border text-center cursor-pointer;
}

.col-grid {
  @apply bg-gray-400 cursor-pointer group-hover:bg-indigo-500;
}

.col-item {
  @apply flex h-5 cursor-pointer;
}

.component-item {
  @apply bg-white shadow transition-transform rounded py-3 my-1 flex justify-between hover:font-bold;
}

.tiny-input {
  @apply border rounded p-1 w-14 text-center;
}
</style>
