<template>
    <!-- Navbar -->
    <nav class="top-0 sticky h-12 bg-white shadow-lg z-100 pr-1">
        <div class="flex justify-between">
            <!-- Sidebar toggle button -->
            <div class="flex items-center">
                <button
                    class="md:block hidden p-3 bg-red-50"
                    @click="changeSidebarSize"
                >
                    <i v-if="sidebarSize === 16" class="pi pi-arrow-right" />
                    <i
                        v-else-if="sidebarSize === 64"
                        class="pi pi-arrow-left"
                    />
                </button>
                <button class="md:hidden p-3" @click="toggleSidebar('admin')">
                    <i class="fa fa-bars fa-lg" />
                </button>
                <language-bar />
            </div>
            <div class="flex space-x-2 md:text-sm text-xs">
                <div class="flex p-3">
                    <!-- TODO: Remove phone number in production environment -->
                    <p>{{ $t('common.welcome') }}, {{ $auth.user.name }}</p>
                    <p v-if="$auth.user.phone">- ({{ $auth.user.phone }})</p>
                </div>
                <pv-button
                    icon="pi pi-sign-out"
                    :label="$t('common.logout')"
                    class="p-button-sm p-button-danger my-1 py-1 px-2"
                    @click="logout"
                />
            </div>
        </div>
    </nav>
</template>

<script>
import { mapMutations } from 'vuex'
import useAuth from '@/authorizations/useAuth'

export default {
    name: 'AdminNavbar',
    middleware: ['auth'],

    setup() {
        const { logout } = useAuth()
        return { logout }
    },

    computed: {
        isSidebarSmall({ $store }) {
            return $store.state.theme.admin.isSidebarSmall
        },
        sidebarSize({ $store }) {
            return $store.getters['theme/getSideBarSize']('admin')
        }
    },

    methods: {
        ...mapMutations({
            minimizeSidebar: 'theme/MINIMIZE_SIDEBAR',
            maximizeSidebar: 'theme/MAXIMIZE_SIDEBAR',
            toggleSidebar: 'theme/TOGGLE_SIDEBAR'
        }),

        changeSidebarSize() {
            if (!this.isSidebarSmall) {
                return this.minimizeSidebar('admin')
            }

            return this.maximizeSidebar('admin')
        }
    }
}
</script>
