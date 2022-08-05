<template>
  <!-- TODO: Need to Implement with Development Type combobox -->
  <div class="grid sm:grid-cols-3 grid-cols-1 gap-4 my-2">
    <div>
      <p class="mb-1 whitespace-nowrap">
        {{ $t('common.total') + ' 1 ' + $t('common.bedroom') }}
      </p>
      <input-number
        v-model="value3"
        :placeholder="$t('common.number_only')"
        mode="decimal"
        :min-fraction-digits="0"
        :max-fraction-digits="2"
        class="w-full h-9 text-sm"
      />
    </div>

    <div>
      <p class="mb-1 whitespace-nowrap">
        {{ $t('common.total') + ' 1 ' + $t('common.bedroom_size') }}
      </p>
      <div>
        <div class="p-inputgroup w-full h-9">
          <input-number
            v-model="value4"
            :placeholder="$t('common.number_only')"
            mode="decimal"
            :min-fraction-digits="0"
            :max-fraction-digits="2"
            class="w-full h-9 text-sm"
          />
          <span class="p-inputgroup-addon bg-gray-300">m²</span>
        </div>
      </div>
    </div>
    <div>
      <p class="mb-1 opacity-0">hide</p>
      <div class="p-inputgroup w-full h-9">
        <input-number
          v-model="value5"
          :placeholder="$t('common.number_only')"
          mode="decimal"
          :min-fraction-digits="0"
          :max-fraction-digits="2"
          class="w-full h-9 text-sm"
        />
        <span class="p-inputgroup-addon bg-gray-300">m²</span>
      </div>
    </div>
    <div>
      <p class="mb-1 whitespace-nowrap">
        {{ $t('common.total') + ' 2 ' + $t('common.bedroom') }}
      </p>
      <input-number
        v-model="value6"
        :placeholder="$t('common.number_only')"
        mode="decimal"
        :min-fraction-digits="0"
        :max-fraction-digits="2"
        class="w-full h-9 text-sm"
      />
    </div>
    <div>
      <p class="mb-1 whitespace-nowrap">
        {{ $t('common.total') + ' 2 ' + $t('common.bedroom_size') }}
      </p>
      <div class="p-inputgroup w-full h-9">
        <input-number
          v-model="value7"
          :placeholder="$t('common.number_only')"
          mode="decimal"
          :min-fraction-digits="0"
          :max-fraction-digits="2"
          class="w-full h-9 text-sm"
        />
        <span class="p-inputgroup-addon bg-gray-300">m²</span>
      </div>
    </div>
    <div>
      <p class="mb-1 opacity-0">hide</p>
      <div class="p-inputgroup w-full h-9">
        <input-number
          v-model="value8"
          :placeholder="$t('common.number_only')"
          mode="decimal"
          :min-fraction-digits="0"
          :max-fraction-digits="2"
          class="w-full h-9 text-sm"
        />
        <span class="p-inputgroup-addon bg-gray-300">m²</span>
      </div>
    </div>
    <div>
      <p class="mb-1 whitespace-nowrap">
        {{ $t('common.total') + ' 3 ' + $t('common.bedroom') }}
      </p>
      <input-number
        v-model="value9"
        :placeholder="$t('common.number_only')"
        mode="decimal"
        :min-fraction-digits="0"
        :max-fraction-digits="2"
        class="w-full h-9 text-sm"
      />
    </div>

    <div>
      <p class="mb-1 whitespace-nowrap">
        {{ $t('common.total') + ' 3 ' + $t('common.bedroom_size') }}
      </p>
      <div class="p-inputgroup w-full h-9">
        <input-number
          v-model="value10"
          :placeholder="$t('common.number_only')"
          mode="decimal"
          :min-fraction-digits="0"
          :max-fraction-digits="2"
          class="w-full h-9 text-sm"
        />
        <span class="p-inputgroup-addon bg-gray-300">m²</span>
      </div>
    </div>
    <div>
      <p class="mb-1 opacity-0">hide</p>
      <div class="p-inputgroup w-full h-9">
        <input-number
          v-model="value11"
          :placeholder="$t('common.number_only')"
          mode="decimal"
          :min-fraction-digits="0"
          :max-fraction-digits="2"
          class="w-full h-9 text-sm"
        />
        <span class="p-inputgroup-addon bg-gray-300">m²</span>
      </div>
    </div>

    <div>
      <p class="mb-2">{{ $t('project.penthouse') }}</p>
      <div class="p-inputgroup w-full h-9">
        <input-number
          v-model="value12"
          :placeholder="$t('common.number_only')"
          mode="decimal"
          :min-fraction-digits="0"
          :max-fraction-digits="2"
          class="w-full h-9 text-sm"
        />
        <span class="p-inputgroup-addon bg-gray-300">m²</span>
      </div>
    </div>
  </div>
</template>
