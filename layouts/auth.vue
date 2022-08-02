<template></template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    name: 'adminLayout',
    middleware: ['auth', 'authorized', 'team'],
    loading: {
        continuous: true
    },
    setup() {
        const {} = useResource
    }
})
</script>
