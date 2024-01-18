<template>
    <div v-if="userStore.user.isAuthenticated">
        <button @click="logout" class="cursor-pointer ml-2 mt-2 text-primary-blue font-bold"> Log out </button>
    </div>
</template>

<script>
import { useUserStore } from '../stores/user';

export default {
    setup() {
      const userStore = useUserStore()

      return {
        userStore,
      }
    },

    methods: {
      logout() {
        this.userStore.removeToken()
        this.$router.push('/')
      }
    }
}
</script>