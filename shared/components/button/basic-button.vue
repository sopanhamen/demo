<template>
  <button type="button" class="button">
    <LoginLoading v-if="isLoading"/>
    <template v-else>
      <template v-if="iconLeftName">
        <LoginLoading v-if="isLoadingLeft"/>
        <AppIcon v-else :name="iconLeftName"/>
        {{ text }}
      </template>

      <template v-if="iconRightName">
        <LoginLoading v-if="isLoadingRight"/>
        <AppIcon v-else :name="iconRightName"/>
        {{ text }}
      </template>
    </template>

  </button>

</template>

<script>
import LoginLoading from '../loadings/login-loading.vue';

export default {
    components: { LoginLoading },
    props: ['text','iconRightName', 'isLoadingRight', 'iconLeftName', 'isLoadingLeft' ]
}
</script>
