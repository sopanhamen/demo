<template>
  <div class="border bg-white rounded-xl mx-auto lg:max-w-4xl sm:w-full">
    <div class="p-6 grid lg:grid-cols-3 sm:grid-cols-1 xs:grid-cols-1 gap-4">
      <div>
        <span class="p-float-label">
          <input-text
            id="name"
            v-model="filters.name"
            type="text"
            class="text-sm w-full pt-3 pb-3 px-4 rounded-lg"
          />
          <label for="name">{{ $t('common.name') + '...' }}</label>
        </span>
      </div>
      <div>
        <span class="p-float-label">
          <input-text
            id="phone"
            v-model="filters.phone"
            type="text"
            class="text-sm w-full pt-3 pb-3 px-4 rounded-lg"
          />
          <label for="phone">{{ $t('common.phone') + '...' }}</label>
        </span>
      </div>
      <div>
        <span class="p-float-label">
          <input-text
            id="email"
            v-model="filters.email"
            type="text"
            class="text-sm w-full pt-3 pb-3 px-4 rounded-lg"
          />
          <label for="email">{{ $t('common.email') + '...' }}</label>
        </span>
      </div>
    </div>

    <div class="mx-6 pb-6 text-center">
      <button
        class="w-full py-3 bg-primary text-white rounded-md"
        @click="searchAgent()"
      >
        <i class="fa fa-search" />
        {{ $t('common.search') }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filters: {
        name: null,
        email: null,
        phone: null
      }
    }
  },

  methods: {
    searchAgent() {
      this.$router.push({
        path: this.localePath('/agents'),
        query: {
          ...this.filters
        }
      })
    }
  }
}
</script>

<style scoped>
@import '~/assets/css/collapse.scss';
</style>

<style lang="scss" scoped>
::v-deep .p-inputtext {
  box-shadow: none !important;
}

::v-deep .p-selectbutton {
  .p-button {
    &,
    &:focus,
    &:active {
      outline: none !important;
      border-color: transparent !important;
      box-shadow: none !important;
      padding-top: 0.9rem;
      padding-bottom: 0.9rem;
    }
  }

  .p-button.p-highlight {
    background: #374151 !important;
    color: rgb(250 204 21 / var(--tw-bg-opacity)) !important;
    padding-top: 0.95rem;
    padding-bottom: 0.95rem;

    .p-button-label {
      font-weight: bold !important;
    }
  }
}
</style>
