<template>
  <div class="bg-white">
    <div class="border p-4 rounded">
      <p class="font-semibold text-red-600">
        {{ $t('proposal_form.proposal') }}
      </p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
      <div class="">
        <div>
          <p class="pb-2 font-bold">
            {{ $t('proposal_form.receiver_name') }}
          </p>
          <input-text v-model="name" type="text" class="h-9 w-full" />
        </div>
        <div>
          <p class="pb-2 font-bold">
            {{ $t('proposal_form.attend_date') }}
          </p>
          <calendar
            id="icon"
            v-model="date"
            :show-icon="true"
            class="h-9 w-full"
          />
        </div>
      </div>
      <div class="lg:col-span-2">
        <p class="pb-2 font-bold">
          {{ $t('proposal_form.print_template') }}
        </p>
        <admin-advance-custom-combo-box :item="template" />
      </div>
    </div>
  </div>
</template>

<script>
import printTeamplate from '~/static/dummyData/admin/advanceCustomComboBox/printTemplate.json'
export default {
  data () {
    return {
      template: printTeamplate,
      date: null,
      name: null
    }
  }
}
</script>
