<template>
  <component :is="props.style.name" />
</template>

<script>
export default {
  name: 'AgentList',
  props: {
    props: {
      type: Object,
      required: true
    }
  }
}
</script>
