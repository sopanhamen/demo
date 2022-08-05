<template>
  <div>Version {{ pkg.version }}</div>
</template>

<script>
import pkg from '@/package.json'

export default {
  data() {
    return {
      pkg
    }
  }
}
</script>
