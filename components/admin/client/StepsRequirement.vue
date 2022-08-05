<template>
  <div class="my-3 px-4 w-full relative py-5 pt-20 sm:pt-10">
    <div class="w-full bg-gray-300 h-3 flex items-center z-10">
      <div class="w-10/12 flex justify-between items-center relative">
        <div
          v-for="step in steps"
          :key="step.id"
          class="flex transform transition duration-500 cursor-pointer hover:scale-125 z-30"
        >
          <p
            class="absolute text-xs md:text-sm transform -rotate-90 md:rotate-0 sm:-top-9 -left-3 -top-14 whitespace-nowrap"
          >
            {{ $t(step.title) }}
          </p>
          <button
            :class="
              step.color + ' ring-8 bg-white rounded-full w-4 h-4 sm:w-6 sm:h-6'
            "
            :value="step.value"
            @click="handleStepClick(step)"
          />
        </div>
      </div>
      <span :class="line + ' bg-green-600 h-1  absolute left-0 z-20 '" />
    </div>
  </div>
</template>

<script>
import { RequirementStep } from '@/enums/RequirementStep'

export default {
  props: {
    activeStep: {
      type: String,
      default: RequirementStep.VISIT
    }
  },
  data() {
    return {
      line: 'w-2/12',
      width: '',
      steps: [
        {
          title: 'step_component.find_visit',
          width: 'w-2/12',
          color: 'ring-purple-500',
          value: RequirementStep.VISIT
        },
        {
          title: 'step_component.negotiation',
          width: 'w-5/12',
          color: 'ring-yellow-500',
          value: RequirementStep.NEGOTIATION
        },
        {
          title: 'step_component.payment',
          width: 'w-8/12',
          color: 'ring-blue-500',
          value: RequirementStep.PAYMENT
        },
        {
          title: 'step_component.completion',
          width: 'w-full',
          color: 'ring-green-600',
          value: RequirementStep.COMPLETION
        }
      ]
    }
  },

  watch: {
    activeStep(step) {
      this.line = this.steps.find((i) => i.value === step).width
    }
  },

  methods: {
    handleStepClick(step) {
      this.line = step.width
      this.$emit('step-change', step.value)
    }
  }
}
</script>
