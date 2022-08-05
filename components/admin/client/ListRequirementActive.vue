<template>
  <div>
    <admin-client-dialog-requirement :display.sync="dialog" />
    <div v-if="requirements.length > 0">
      <admin-client-requirement-item :requirement="requirements[0]" />
      <!-- <carousel
        :value="requirements"
        :num-visible="2"
        :num-scroll="requirements.length"
        indicators-content-class="hidden"
        class="custom-carousel pt-5 -mx-6"
      >
        <template #item="{ data }">
          <div
            class="w-52 rounded-md bg-yellow-100 px-3 py-2 mr-3 cursor-pointer"
            @click="showRequirementDialog"
          >
            <div class="underline underline-offset-2 mb-2">
              {{ data.purpose }}
            </div>
            <div class="text-sm">
              <span>{{ $t('requirement_service.label') }}: </span>
              <span class="text-indigo-600">
                {{ $t(`requirement_service.model.${data.service}`) }}
              </span>
            </div>
            <div class="text-sm">
              <span>{{ $t('priority.label') }}: </span>
              <span class="text-yellow-600">
                {{ $t(`priority.model.${data.priority}`) }}
              </span>
            </div>
            <div class="text-sm">
              <span>{{ $t('common.created_at') }}: </span>
              <span class="text-yellow-600">
                {{ data.created_at | formatDate }}
              </span>
            </div>
          </div>
        </template>
        <template #footer></template>
      </carousel> -->
    </div>
    <div v-else>
      <div class="flex justify-center py-12 mt-2 text-sm">
        {{ $t('client.message.no_active_requirements') }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    requirements: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      dialog: false,
      requirementUuid: null
    }
  },
  methods: {
    showRequirementDialog() {
      this.dialog = true
    }
  }
}
</script>
