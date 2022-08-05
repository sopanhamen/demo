<template>
  <div class="exclusive-ribbon">
    <i class="pi pi-star"></i>
    {{ $t('common.exclusive') }}
    <i class="pi pi-star"></i>
  </div>
</template>

<style lang="postcss" scoped>
.exclusive-ribbon {
  @apply z-5 bg-primary text-white w-64 text-center py-2 absolute top-32 -right-5 tracking-wider;
  @apply text-sm origin-bottom-right transform rotate-45 shadow-md;
}
</style>
