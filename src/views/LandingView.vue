<template>
    <div v-if="!userStore.user.isAuthenticated">

        <div class="bg-primary-blue h-screen">
            
            <div class="flex flex-col items-center drop-shadow-lg">
                <h1 class="text-[68px] lilitaFont text-primary-yellow mt-[2rem] sm:mt-[5rem] sm:text-[120px]">Bee Hive</h1>
                <h3 class="text-white">It's fun to lean to spell</h3>
            </div>
            
            <div class="flex flex-col items-center mt-[10rem] drop-shadow-lg">
                <RouterLink class="text-[24px] text-center w-[15rem] py-2 font-bold mt-[2rem] bg-white text-primary-blue rounded-[10rem] hover:bg-primary-green" to="/login">Login</RouterLink>
                <RouterLink class="text-[24px] text-white text-center w-[15rem] py-2 font-bold  mt-[2rem] bg-primary-green rounded-[10rem] hover:bg-primary-green" to="/signup">Create account</RouterLink>
            </div>
        </div> 
    </div>
    
    <div v-else>
        <GameSettings />
    </div>
</template>


<script>
    import PlayView from './PlayView.vue';
    import GameSettings from './GameSettings.vue';
    import { useUserStore } from '../stores/user';

    export default {
      setup() {
        const userStore = useUserStore()

        return {
          userStore
        }
      },

      components: {
        PlayView,
        GameSettings
      },
    }
</script>