<template>
    <div>
        <error-401 v-if="error.statusCode === 401" />
        <error-403 v-else-if="error.statusCode === 403" />
        <error-404 v-else-if="error.statusCode === 404" />
        <error-500 v-else-if="error.statusCode === 500" />
        <error-unknown v-else />
    </div>
</template>

<script>
export default {
    layout: 'error',
    props: {
        error: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    head() {
        return {
            title: this.$config.app.name
        }
    }
}
</script>
