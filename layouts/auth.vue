<template>
    <main class="bg-gray-100 h-screen grid grid-cols-1 place-items-center">
        <nuxt class="text-sm" />
    </main>
</template>
<script>
export default {
    name: 'LayoutAuth',
    head() {
        return {
            title: this.$config.app.name
        }
    }
}
</script>
