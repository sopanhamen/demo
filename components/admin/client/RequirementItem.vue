<template>
  <div
    class="w-52 rounded-md px-3 py-2 mr-3 cursor-pointer relative"
    :class="{
      'bg-red-100': requirement.result === RequirementResult.FAILED,
      'bg-gray-100': requirement.result === RequirementResult.CANCELLED,
      'bg-blue-100': requirement.result === RequirementResult.IN_PROGRESS,
      'bg-yellow-100': requirement.result === RequirementResult.PENDING,
      'bg-green-100': requirement.result === RequirementResult.SUCCESS
    }"
  >
    <nuxt-link
      :to="
        localePath(
          `/admin/clients/${requirement.id}/client-requirement/${requirement.id}?ref=${$route.path}`
        )
      "
    >
      <div class="font-bold text-base underline-offset-2 mb-2">
        {{ requirement.code }}
      </div>
      <div class="text-sm truncate">
        <span>{{ $t('common.purpose') }}: </span>
        <span class="text-indigo-600">{{ requirement.purpose }}</span>
      </div>
      <div class="text-sm truncate">
        <span>{{ $t('requirement_service.label') }}: </span>
        <span class="text-indigo-600">
          {{ requirementServiceLabel(requirement.service) }}
        </span>
      </div>
      <div class="text-sm truncate">
        <span>{{ $t('priority.label') }}: </span>
        <span class="text-yellow-600">
          {{ priorityLabel(requirement.priority) }}
        </span>
      </div>
      <div class="text-sm truncate">
        <span>{{ $t('common.created_at') }}: </span>
        <span class="text-yellow-600">
          {{ requirement.created_at | formatDate }}
        </span>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import { RequirementResult } from '@/enums/RequirementResult'
import { PriorityLabel } from '@/enums/Priority'
import { RequirementServiceLabel } from '@/enums/RequirementService'

export default {
  props: {
    requirement: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      RequirementResult
    }
  },

  methods: {
    priorityLabel(priority) {
      return this.$t('priority.model.' + PriorityLabel[priority])
    },
    requirementServiceLabel(RequirementService) {
      return this.$t(
        'requirement_service.model.' +
          RequirementServiceLabel[RequirementService]
      )
    },

    toggleMenu(event, requirement) {
      if (this.$refs['menu' + requirement.id]) {
        this.$refs['menu' + requirement.id].toggle(event)
      }
    }
  }
}
</script>
