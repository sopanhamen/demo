<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<template>
    <main class="dark:bg-gray-800 font-sans bg-white relative h-screen overflow-auto overflow-y-scroll">
        <NavBar/>
        <Nuxt/>
    </main>
</template>
<script>
import NavBar from './../components/navbar/navbar.vue'
export default {
    components: { NavBar },
}
</script>
