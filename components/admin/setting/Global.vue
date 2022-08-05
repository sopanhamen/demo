<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <div class="bg-gray-50 p-5 space-y-8">
      <div>
        <h3 class="pb-2">{{ $t('global_setting.system_name') }}</h3>
        <input-text
          v-model="system_name"
          class="h-10 w-full"
          type="text"
          :placeholder="$t('global_setting.system_name')"
          @keyup="console"
        />
      </div>
      <div>
        <h3 class="pb-2">{{ $t('global_setting.system_title') }}</h3>
        <input-text
          class="h-10 w-full"
          type="text"
          :placeholder="$t('global_setting.system_title')"
        />
      </div>
      <div>
        <h3 class="pb-2">{{ $t('global_setting.property_code_prefix') }}</h3>
        <input-text
          class="h-10 w-full"
          type="text"
          :placeholder="$t('global_setting.property_code_prefix')"
        />
      </div>
      <div>
        <h3 class="pb-2">{{ $t('global_setting.system_logo') }}</h3>
        <upload-component :img-center="true" />
      </div>
      <div>
        <h3 class="pb-2">{{ $t('global_setting.system_icon') }}</h3>
        <upload-component :img-center="true" />
      </div>
    </div>
    <div class="bg-gray-50 p-5 space-y-8">
      <div>
        <h3 class="pb-2">{{ $t('global_setting.add_watermark_on') }}</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="p-field-checkbox flex space-x-2">
            <checkbox id="city1" v-model="cities" value="1" name="city" />
            <label class="cursor-pointer" for="city1">{{
              $t('global_setting.property_image')
            }}</label>
          </div>
          <div class="p-field-checkbox flex space-x-2">
            <checkbox id="city3" v-model="cities" value="2" name="city" />
            <label class="cursor-pointer" for="city3">{{
              $t('global_setting.indication_image')
            }}</label>
          </div>
          <div class="p-field-checkbox flex space-x-2">
            <checkbox id="city2" v-model="cities" value="3" name="city" />
            <label class="cursor-pointer" for="city2">{{
              $t('global_setting.development_project_image')
            }}</label>
          </div>
          <div class="p-field-checkbox flex space-x-2">
            <checkbox id="city4" v-model="cities" value="4" name="city" />
            <label class="cursor-pointer" for="city4">{{
              $t('global_setting.valuation_report_image')
            }}</label>
          </div>
        </div>
      </div>
      <div>
        <h3 class="pb-2">{{ $t('global_setting.watermark_position.name') }}</h3>
        <dropdown
          v-model="selectedCity"
          :options="tests"
          option-label="name"
          :placeholder="$t('global_setting.watermark_position.title')"
          class="h-10 w-full items-center"
        />
      </div>
      <div>
        <h3 class="pb-2">{{ $t('global_setting.watermark') }}</h3>
        <upload-component :img-center="true" @showFile="console" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GlobalSetting',
  data() {
    return {
      message: '',
      system_name: '',
      cities: [],
      selectedCity: null,
      tests: [
        {
          name: this.$t('global_setting.watermark_position.bottom_right'),
          code: 'NY'
        },
        {
          name: this.$t('global_setting.watermark_position.bottom_left'),
          code: 'RM'
        },
        {
          name: this.$t('global_setting.watermark_position.top_right'),
          code: 'LDN'
        },
        {
          name: this.$t('global_setting.watermark_position.top_left'),
          code: 'IST'
        }
      ]
    }
  },
  methods: {
    console(event) {
      this.system_name = event.target.value
      this.$emit('showSystemName', this.system_name)
      console.log(this.system_name)
    }
  }
}
</script>
