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
        <!-- <Navbar /> -->
        <div v-if="!test.settingsChosen">
                <GameSettings />
        </div>
        <div v-else>
            <PlayView />
        </div>
        </div>
</template>


<script>
    import PlayView from './PlayView.vue';
    import GameSettings from './GameSettings.vue';
    import Navbar from '@/components/Navbar.vue';
    import { useUserStore } from '../stores/user';
    import { useGameSettings } from '@/stores/gameSettings'

    export default {
      setup() {
        const userStore = useUserStore()
        const test = useGameSettings()

        return {
          userStore,
          useGameSettings,
          test
        }
      },

      components: {
        PlayView,
        GameSettings,
        Navbar,
        useUserStore,
        useGameSettings
      },
    }
</script>