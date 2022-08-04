<template>
    <div
        class="block transition delay-500 ease-in-out animate__animated animate__fadeIn"
        :class="{ 'opacity-0': !showLogo, 'opacity-100': showLogo }"
    >
        <nuxt-link v-if="$nuxt.$route.path !== '/'" :to="localePath('/')">
            <nuxt-img
                v-if="company.logo.url"
                :src="company.logo.url"
                :alt="company.name + ' logo'"
                :class="imageClass"
            />
        </nuxt-link>
        <a v-else href="#">
            <nuxt-img
                v-if="company.logo.url"
                :src="company.logo.url"
                :alt="company.name + ' logo'"
                :class="imageClass"
            />
        </a>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { app } from '@/config'

export default {
    props: {
        imageClass: {
            type: [Array, String],
            default() {
                return ''
            }
        }
    },
    data() {
        return {
            showLogo: false
        }
    },

    computed: {
        ...mapGetters({
            getCompany: 'company/getCompanies'
        }),
        company() {
            return (
                this.getCompany[0] || {
                    name: app.name,
                    logo: {
                        url: app.logo
                    }
                }
            )
        }
    },
    mounted() {
        setTimeout(() => {
            this.showLogo = true
            console.log('company', this.company)
        }, 500)
    }
}
</script>
