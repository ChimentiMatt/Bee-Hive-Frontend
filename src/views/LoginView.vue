<template>
    <div class="bg-primary-blue h-screen">

        <div class="flex flex-col items-center drop-shadow-lg">
            <h1 class="text-[68px] lilitaFont text-primary-yellow mt-[2rem] sm:mt-[5rem] sm:text-[120px]">Bee Hive</h1>
            <h3 class="text-white">Login to Play</h3>
        </div>

        <form class="flex flex-col items-center w-full text-white mt-[3rem]" v-on:submit.prevent="submitForm">

            <div class="flex flex-col w-[20rem]">
                <p>Welcome</p>
                <p class="opacity-60">Please sign in</p>
            </div>
            <Input v-model="form.email" label="Email" field="email"/>

            <Input v-model="form.password" label="Password" field="password"/>

            <p class="w-[20rem] opacity-[50%] mt-1 text-end">Forgot Password</p>
            
            <SubmitBtn text="Login" />

            <div class="flex justify-end items-end w-[20rem]">
                <p class="text-center mt-[1rem]">Need an Account? </p>
                <RouterLink class="ml-2 text-center text-primary-green" to="/signup">Sign up</RouterLink>
            </div>
            
        </form>
    </div>
</template>

<script>

import { useUserStore } from '@/stores/user';
import { useToastStore } from '@/stores/toast';
import Navbar from '@/components/Navbar.vue'
import SubmitBtn from '@/components/SubmitBtn.vue'
import Input from '@/components/Input.vue';
import axios from 'axios'


export default {
    setup() {
        const userStore = useUserStore();
        const toastStore = useToastStore();
        
        return {
            userStore,
            toastStore,
        };
    },

    components: { 
        Navbar, 
        SubmitBtn,
        Input
    },

    data() {
        return {
            form: {
                email: '',
                password: '',
            },
            errors: []
        };
    },
    methods: {
        async submitForm() {
            this.errors = [];
            if (this.form.email === '')
                this.errors.push('Your e-mail is missing');
            if (this.form.password === '')
                this.errors.push('Your password is missing');
            if (this.errors.length === 0) {
                await axios
                    .post('/api/login/', this.form)
                    .then(response => {
                    this.userStore.setToken(response.data);
                    axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.access;
                    this.$router.push('/');
                })
                    .catch(error => {
                    console.log('error', error);
                    this.toastStore.showToast(5000, ['Unable to login'], 'bg-red-300');
                });
            }
        }
    },

}
</script>