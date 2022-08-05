<template>
  <div
    class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-4 bg-white"
  >
    <div class="space-y-3">
      <div>
        <p class="mb-2 font-bold">
          {{ $t('common.property_code') }}
        </p>
        <input-text type="text" class="h-9 w-full" />
      </div>
      <div>
        <p class="mb-2 font-bold">
          {{ $t('proposal_form.title') }}
        </p>
        <input-text type="text" class="h-9 w-full" />
      </div>
      <div>
        <p class="mb-2 font-bold">
          {{ $t('common.image') + 1 }}
        </p>
        <dropdown
          v-model="image1"
          :options="image1s"
          option-label="name"
          :placeholder="$t('common.select')"
          class="w-full h-9 items-center"
        />
      </div>
      <div>
        <p class="mb-2 font-bold">
          {{ $t('common.image') + 2 }}
        </p>
        <dropdown
          v-model="image2"
          :options="image2s"
          option-label="name"
          :placeholder="$t('common.select')"
          class="w-full h-9 items-center"
        />
      </div>
      <div>
        <p class="mb-2 font-bold">
          {{ $t('common.image') + 3 }}
        </p>
        <dropdown
          v-model="image3"
          :options="image3s"
          option-label="name"
          :placeholder="$t('common.select')"
          class="w-full h-9 items-center"
        />
      </div>
    </div>
    <div class="space-y-3">
      <div>
        <p class="pb-3">{{ $t('proposal_form.show_map') }}</p>
        <div class="grid grid-cols-2">
          <div class="p-field-radiobutton">
            <radio-button
              :id="'radMapYes' + randomId"
              v-model="radShowMap"
              name="radShowMap"
              value="Yes"
            />
            <label :for="'radMapYes' + randomId">{{ $t('common.yes') }}</label>
          </div>
          <div class="p-field-radiobutton">
            <radio-button
              :id="'radMapNo' + randomId"
              v-model="radShowMap"
              name="radShowMap"
              value="No"
            />
            <label :for="'radMapNo' + randomId">{{ $t('common.no') }}</label>
          </div>
        </div>
      </div>
      <div>
        <p class="pb-3">{{ $t('proposal_form.show_company') }}</p>
        <div class="grid grid-cols-2">
          <div class="p-field-radiobutton">
            <radio-button
              :id="'radInfoYes' + randomId"
              v-model="radShowCompanyInfo"
              name="radShowCompanyInfo"
              value="Yes"
            />
            <label :for="'radInfoYes' + randomId">{{ $t('common.yes') }}</label>
          </div>
          <div class="p-field-radiobutton">
            <radio-button
              :id="'radInfoNo' + randomId"
              v-model="radShowCompanyInfo"
              name="radShowCompanyInfo"
              value="No"
            />
            <label :for="'radInfoNo' + randomId">{{ $t('common.no') }}</label>
          </div>
        </div>
      </div>
      <div>
        <p class="pb-3">{{ $t('proposal_form.show_agent') }}</p>
        <div class="grid grid-cols-2">
          <div class="p-field-radiobutton">
            <radio-button
              :id="'radAgentYes' + randomId"
              v-model="radShowAgentInfo"
              name="radShowAgentInfo"
              value="Yes"
            />
            <label :for="'radAgentYes' + randomId">{{
              $t('common.yes')
            }}</label>
          </div>
          <div class="p-field-radiobutton">
            <radio-button
              :id="'radAgentNo' + randomId"
              v-model="radShowAgentInfo"
              name="radShowAgentInfo"
              value="No"
            />
            <label :for="'radAgentNo' + randomId">{{ $t('common.no') }}</label>
          </div>
        </div>
      </div>
      <div>
        <p class="pb-2 font-bold">{{ $t('common.name') }}</p>
        <admin-advance-custom-combo-box :item="sticker" />
      </div>
    </div>
    <div class="space-y-4 font-serif">
      <div class="bg-gray-200 h-52 w-72 grid grid-cols-1 place-items-center">
        <img
          v-if="image"
          :src="image"
          alt=""
          class="w-full h-full object-cover"
        />
        <p v-else class="text-7xl font-serif">1</p>
      </div>
      <div class="grid lg:grid-cols-2 grid-cols-1 gap-4">
        <div class="bg-gray-200 h-32 w-36 grid grid-cols-1 place-items-center">
          <img
            v-if="image"
            :src="image"
            alt=""
            class="w-full h-full object-cover"
          />
          <p v-else class="text-7xl font-serif">2</p>
        </div>
        <div class="bg-gray-200 h-32 w-36 grid grid-cols-1 place-items-center">
          <img
            v-if="image"
            :src="image"
            alt=""
            class="w-full h-full object-cover"
          />
          <p v-else class="text-7xl font-serif">3</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sticker from '~/static/dummyData/admin/advanceCustomComboBox/sticker.json'
export default {
  name: 'ProposalComponent',
  data() {
    return {
      sticker: Sticker,
      image: null,
      randomId: null,
      radShowMap: null,
      radShowCompanyInfo: null,
      radShowAgentInfo: null,
      image1: null,
      image2: null,
      image3: null,
      image1s: [
        { name: 'a', code: 'a' },
        { name: 'b', code: 'b' },
        { name: 'c', code: 'c' }
      ],
      image2s: [
        { name: 'd', code: 'd' },
        { name: 'e', code: 'e' },
        { name: 'f', code: 'f' }
      ],
      image3s: [
        { name: 'g', code: 'g' },
        { name: 'h', code: 'h' },
        { name: 'i', code: 'i' }
      ]
    }
  },

  mounted() {
    this.randomId = Math.random()
  }
}
</script>
