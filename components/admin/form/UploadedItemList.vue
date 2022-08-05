<template>
  <div class="grid grid-cols-4 gap-4 mb-4">
    <div v-for="(file, key) in files" :key="key">
      <card class="relative">
        <template #header>
          <admin-form-uploaded-item :value="file" />
          <div class="text-right absolute top-1 right-1">
            <i
              class="pi pi-trash bg-red-600 px-2 py-2 rounded-md text-white cursor-pointer"
              @click="$emit('delete-file', file)"
            />
          </div>
        </template>
      </card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminFormUploadedItemList',
  props: {
    files: {
      type: Array,
      required: true
    }
  }
}
</script>
