<template>
    <div>Loading........</div>
</template>

<script>
export default {
    name: 'PageAdmin',
    layout: 'admin',
    mounted() {
        this.$router.push(this.localePath(`/admin/dashboard`))
    }
}
</script>
