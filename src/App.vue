<template>
  <body>
    <RouterView />
  </body>

  <Toast />
</template>

<script>
    import axios from 'axios';
    import Toast from '@/components/Toast.vue'
    import { useUserStore } from './stores/user';

    export default {
      setup() {
        const userStore = useUserStore()

        return {
          userStore
        }
      },

      components: {
        Toast,
      },

      beforeCreate() {
        this.userStore.initStore()

        const token = this.userStore.user.access
        // console.log(token)

        if (token) {
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
        } else {
          axios.defaults.headers.common['Authorization'] = ';'
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