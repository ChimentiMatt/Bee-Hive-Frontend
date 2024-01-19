<template>
    <div class="bg-primary-blue h-screen">

        <form class="flex flex-col items-center w-full text-white" v-on:submit.prevent="submitForm">
            <div class="flex flex-col items-center drop-shadow-lg">
                <h1 class="text-[68px] lilitaFont text-primary-yellow mt-[2rem] sm:mt-[5rem] sm:text-[120px]">Bee Hive</h1>
                <h3 class="text-white">Create your acccount</h3>
            </div>

            <Input v-model="form.name" label="Name" field="text"/>

            <Input v-model="form.email" label="Email" field="email"/>

            <Input v-model="form.password1" label="Password" field="password"/>

            <Input v-model="form.password2" label="Confirm Password" field="password"/>
            
            
            <SubmitBtn text="Sign up" />
            <div class="flex justify-end items-end w-[20rem]">
                <p class="text-center mt-[1rem]">Already have an Account?</p>
                <RouterLink class="ml-1 text-center text-primary-green" to="/login">Login</RouterLink>
                
            </div>
        </form>
        
    </div>
</template>

<script>
import SubmitBtn from '@/components/SubmitBtn.vue'
import Input from '@/components/Input.vue';
import { useToastStore } from '@/stores/toast';
import axios from 'axios';

export default {
    setup() {
        const toastStore = useToastStore()

        return {
            toastStore
        }
    },

    components: { 
        SubmitBtn,
        Input
    },

    data() {
        return {
            form: {
                email: '',
                name: '',
                password1: '',
                password2: ''
            },
            errors: [],
        }
    },

    methods: {
        submitForm() {
            this.errors = []
            
            if (this.form.email === '') this.errors.push('Your e-mail is missing')

            if (this.form.name === '') this.errors.push('Your name is missing')

            if (this.form.password1 === '') this.errors.push('Your password is missing')

            if (this.form.password1 !== this.form.password2) this.errors.push('The password does not match')

            if (this.errors.length === 0) {
                axios
                .post('/api/signup/', this.form )
                .then(response => {
                    if (response.data.status === 'success') {
                        this.toastStore.showToast(5000, ['The user is Registered. Please Log in'], 'bg-primary-green')

                        this.form.email = ''
                        this.form.name = ''
                        this.form.password1 = ''
                        this.form.password2 = ''

                        this.$router.push('/')

                    } else {
                        this.toastStore.showToast(5000, ['Something went wrong. Please try again'], 'bg-red-300')
                    }

                })
                .catch(error => {
                    console.log('error', error)
                })
            } else {
                this.toastStore.showToast(5000, this.errors, 'bg-red-300')
            }
        },
        
    }
}
</script>