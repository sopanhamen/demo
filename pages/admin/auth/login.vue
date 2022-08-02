<template>
    <div class="mx-auto container max-w-lg">
        <div class="grid justify-items-center -mt-16 py-8">
            <app-logo image-class="h-36" />
        </div>
        <pv-message
            v-if="incorrect"
            :closable="false"
            severity="error"
            class="bg-red-100 mt-2 mb-2"
        >
            {{ $t('common.something_went_wrong') }}
        </pv-message>

        <form class="bg-white shadow-md rounded-xl p-7">
            <p class="text-center font-bold text-xl mb-4">
                {{ $t('common.sign_in_title') }}
            </p>

            <div class="mb-4 p-inputgroup w-full">
                <input-text
                    v-model="credentials.email"
                    class="w-full h-12 text-base"
                    placeholder="Input Email"
                />
                <span class="p-inputgroup-addon w-12 h-12">
                    <i class="pi pi-envelope" />
                </span>
            </div>

            <div class="mb-4 p-inputgroup">
                <password
                    v-model="credentials.password"
                    :toggle-mask="true"
                    :feedback="false"
                    :placeholder="$t('common.password')"
                    class="w-full h-12 text-base rounded-lg"
                />
                <span class="p-inputgroup-addon w-12 h-12">
                    <i class="pi pi-lock" />
                </span>
            </div>

            <div class="flex items-center justify-between mb-2">
                <div class="space-x-2">
                    <input
                        id="checkbox"
                        type="checkbox"
                        class="border-gray-400"
                    />
                    <label
                        for="checkbox"
                        class="font-bold text-gray-500 cursor-pointer mt-2"
                    >
                        {{ $t('common.remember_me') }}
                    </label>
                </div>
            </div>
            <div>
                <nuxt-link
                    class="hover:text-red-500 text-sm cursor-pointer"
                    :to="localePath(`/admin/auth/forget-password`)"
                >
                    {{ $t('common.forgot_your_password') }}
                </nuxt-link>
            </div>
        </form>
    </div>
</template>

<script>
import {
    defineComponent,
    ref,
    useContext,
    useStore
} from '@nuxtjs/composition-api'

export default defineComponent({
    name: 'LayoutAuth',
    layout: 'auth',
    middleware: 'guest',
    setup() {
        const { $auth, redirect } = useContext()

        const { commit } = useStore()
        const loading = ref(false)
        const incorrect = ref(false)
        const credentials = ref({
            email: '',
            password: ''
        })

        const loginUser = async () => {
            try {
                loading.value = true
                const response = await $auth.loginWith('local', {
                    data: credentials.value
                })

                if (response) {
                    commit('theme/UPDATE_LAYOUT', {
                        layout: 'admin',
                        data: {
                            selectedItem: 'dashboard',
                            selectedSubItem: null
                        }
                    })
                    commit('crud/CLEAR_ALL_DATA')
                    commit('user/ClEAR_ALL_DATA')
                    commit('userTeam/ClEAR_ALL_DATA')
                    commit('property/ClEAR_ALL_DATA')
                    commit('client/CLEAR_CLIENT_FORM')
                    commit('project/CLEAR_PROJECT_FORM')
                    commit('role/CLEAR_ROLE_FORM')
                    commit('country/CLEAR_COUNTRY_FORM')
                    commit('province/CLEAR_PROVINCE_FORM')
                    commit('district/CLEAR_DISTRICT_FORM')
                    commit('commune/CLEAR_COMMUNE_FORM')
                    commit('clientType/CLEAR_CLIENT_TYPE_FORM')
                    commit('propertyType/CLEAR_PROPERTY_TYPE_FORM')
                    commit('developmentType/CLEAR_DEVELOPMENT_TYPE_FORM')
                    commit('developer/CLEAR_DEVELOPER_FORM')
                    commit('dashboard/CLEAR_DASHBOARD_FILTER')

                    return redirect('/admin')
                }
            } catch (error) {
                loading.value = false
                incorrect.value = true
            } finally {
                loading.value = false
            }
        }
        return { credentials, loading, incorrect, loginUser }
    }
})
</script>
