<template>
    <Navbar />
    
    <div class="bg-primary-green fixed bg-fixed h-screen w-screen">
        <LogoutBtn />
    </div>
</template>

<script>

import Navbar from '@/components/Navbar.vue'
import LogoutBtn from '@/components/LogoutBtn.vue'

export default {

    components: {
        Navbar,
        LogoutBtn,
    },
    methods: {
        logout() {
        this.userStore.removeToken()
        this.$router.push('/')
        }
    }
}
</script>