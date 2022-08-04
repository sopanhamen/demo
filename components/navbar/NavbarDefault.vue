<template>
    <nav class="fixed w-full px-6 bg-white z-90 drop-shadow-sm">
        <div class="container mx-auto flex items-center justify-between">
            <!-- Header logo -->
            <div class="py-4">
                <app-logo :image-class="['h-14']" />
            </div>

            <!-- Mobile toggle -->
            <div class="lg:hidden">
                <button @click="drawer">
                    <i class="fa fa-bars fa-2x" />
                </button>
            </div>

            <!-- Menu -->
            <div class="hidden lg:block">
                <div class="flex flex-cols items-center gap-x-2">
                    <component :is="menu.name" />
                    <language-bar />
                </div>
            </div>

            <!-- Dark Background Transition -->
            <transition
                enter-class="opacity-0"
                enter-active-class="ease-out transition-medium"
                enter-to-class="opacity-100"
                leave-class="opacity-100"
                leave-active-class="ease-out transition-medium"
                leave-to-class="opacity-0"
            >
                <div
                    v-show="isOpen"
                    class="z-10 fixed inset-0 transition-opacity lg:hidden"
                    @keydown.esc="isOpen = false"
                >
                    <div
                        class="absolute h-screen inset-0 bg-black opacity-50"
                        tabindex="0"
                        @click="isOpen = false"
                    />
                </div>
            </transition>

            <!-- Drawer Menu -->
            <aside
                class="p-5 transform top-0 left-0 w-full sm:w-64 bg-white fixed h-screen overflow-auto ease-in-out transition-all duration-300 z-30 lg:hidden"
                :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
            >
                <div class="close">
                    <button
                        class="absolute top-0 right-0 mt-4 mr-4"
                        @click="isOpen = false"
                    >
                        <i class="fa fa-times fa-lg" />
                    </button>
                </div>

                <div class="" @click="isOpen = false">
                    <AppLogo :image-class="['h-12']" />
                </div>

                <ul class="divide-y">
                    <li
                        v-for="menu in menuItems"
                        :key="menu.title"
                        @click="toggleSubmenu(menu.title)"
                    >
                        <router-link
                            :to="localePath(menu.link) || ''"
                            class="my-2 inline-block"
                            :class="{
                                'active text-primary-thick':
                                    selectedMenu == menu.title
                            }"
                            @click.native="updateSelectedMenu(menu)"
                        >
                            {{ $t(menu.title) }}
                            <i v-if="menu.subItems" class="fa fa-angle-down" />
                        </router-link>
                        <ul
                            v-if="menu.subItems && mMenuOpen == menu.title"
                            class="ml-6"
                        >
                            <li
                                v-for="submenu in menu.subItems"
                                :key="submenu.title"
                                class="my-2 hover:text-primary"
                            >
                                <router-link
                                    :class="{
                                        'active text-primary-thick':
                                            selectedSub ==
                                            menu.title + submenu.title
                                    }"
                                    :to="localePath(submenu.link) || ''"
                                    @click.native="
                                        updateSelectedSubmenu(
                                            menu.title,
                                            submenu.title
                                        )
                                    "
                                >
                                    <div
                                        class="flex justify-between transition transform hover:translate-x-2 duration-300"
                                    >
                                        <span>{{ $t(submenu.title) }}</span>
                                        <span
                                            v-if="submenu.amount > -1"
                                            class="items-center justify-center px-2 py-1 text-xs font-bold text-red-100 bg-red-600 rounded-full"
                                        >
                                            {{ submenu.amount || zero }}
                                        </span>
                                    </div>
                                </router-link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <language-bar />
                    </li>
                </ul>
            </aside>
        </div>
    </nav>
</template>

<script>
import { createHelpers } from 'vuex-map-fields'
import { cloneDeep } from 'lodash'
import { mapGetters } from 'vuex'

const { mapFields } = createHelpers({
    getterType: 'theme/getField'
})

export default {
    props: {
        items: {
            type: Array,
            required: true
        }
    },

    data() {
        return {
            isOpen: false,
            mMenuOpen: '',
            selectedMenu: '',
            selectedSub: '',
            zero: 0
        }
    },

    computed: {
        ...mapGetters({
            getPropertyCounts: 'listing/getPropertyCounts'
        }),
        ...mapFields({
            getMenu: 'website.menu'
        }),
        menu() {
            return (
                this.getMenu || {
                    label: 'Default',
                    name: 'LazyMenuDefault',
                    props: {
                        showLanguageSwitcher: true
                    }
                }
            )
        },
        menuItems() {
            return cloneDeep(this.items).map((menuItem) => {
                if (!menuItem.subItems) {
                    return menuItem
                }

                return {
                    ...menuItem,
                    subItems: menuItem.subItems.map((subMenuItem) => {
                        if (typeof subMenuItem.amount === 'undefined') {
                            return subMenuItem
                        }

                        return {
                            ...subMenuItem,
                            amount: this.getPropertyCounts(
                                subMenuItem.propertyTypeGroup,
                                subMenuItem.listingPurpose
                            )
                        }
                    })
                }
            })
        }
    },

    watch: {
        isOpen: {
            immediate: true,
            handler(isOpen) {
                if (process.client) {
                    if (isOpen) {
                        document.body.style.setProperty('overflow', 'hidden')
                    } else {
                        document.body.style.removeProperty('overflow')
                    }
                }
            }
        }
    },

    mounted() {
        document.addEventListener('keydown', (e) => {
            if (e.keyCode === 27 && this.isOpen) {
                this.isOpen = false
            }
        })
    },

    methods: {
        // Mobile screen case
        toggleSubmenu(menuTitle) {
            if (this.mMenuOpen === menuTitle) {
                this.mMenuOpen = ''
            } else {
                this.mMenuOpen = menuTitle
            }
        },
        // Desktop screen case
        updateSelectedMenu(menu) {
            if (menu.subItems) {
                return
            }
            this.selectedMenu = menu.title
            this.selectedSub = ''
        },
        updateSelectedSubmenu(menuTitle, submenuTitle) {
            this.selectedMenu = menuTitle
            this.selectedSub = menuTitle + submenuTitle
        },
        drawer() {
            this.isOpen = !this.isOpen
        }
    }
}
</script>
