<template>
    <div class="bg-primary-green h-screen ">
        <Navbar />

        <h1 class="text-[40px] mt-[2rem] text-center text-white drop-shadow-lg font-bold">Spelling List</h1>

        <div class="flex justify-center ">
            <p class="ml-[1.5rem] text-white">p. {{ page }}</p>
            <div class="w-[2rem] ml-[16rem]">
                <img v-if="page > 1" @click="previousPage" class="h-[1rem] cursor-pointer rotate-180 hover:opacity-50" src="../assets/images/arrow.webp"/>
            </div>
            <div class="w-[2rem]">
                <img v-if="start + wordsPerPage <= words.length" @click="nextPage" class="h-[1rem] cursor-pointer hover:opacity-50" src="../assets/images/arrow.webp"/>
            </div>
        </div>
  
        <div 
            class="flex flex-col items-center mt-[1rem] text-primary-blue font-bold overflow-hidden whitespace-nowrap">

            <div class="flex justify-center w-[21rem] border-b-2 ">
                <p class="w-[20rem]">Word</p>
                <p class="w-[20rem] text-start">Misspell</p> 
            </div>

            <div class="flex justify-center">
                <div class="flex flex-col">
                    <div v-for="word in filteredItems" v-bind:key="word.id" class="text-white">
                        <p class="w-[10rem] pt-2 border-b-[1px]">{{ word.correct_spelling }}</p>
                    </div>
                    <input v-if="filteredItems.length < 17"  @keyup.enter="addWord" ref="wordInput" type="text" class="relative w-[10rem] mt-1 outline-none">
                </div>

                <div class="border-r-2 border-l-2 h-[35.1rem]"></div>
                
                <div class="flex flex-col">
                    <div v-for="word in filteredItems" v-bind:key="word.id" class="flex text-white">
                        <p class="w-[10rem] text-start pl-1 pt-2 border-b-[1px]">{{ word.incorrect_spelling }}</p>
                        <button @click="deleteWord(word.id)" class="hover:text-red-300 ">x</button>
                    </div>
                    <button v-if="filteredItems.length < 17" @click="addWord" class="mt-1 relative  w-[10rem]">add word</button>
                </div>
            </div>
        </div>
        
    </div>
</template>
  
<script>
import Navbar from '@/components/Navbar.vue'
import LogoutBtn from '@/components/LogoutBtn.vue';
import axios from 'axios';

export default {
    name: 'SpellingListVue',

    components: {
        Navbar,
        LogoutBtn
    },

    data() {
        return {
            words: [],
            page: 1,
            start: 0,
            stop: 17,
            wordsPerPage: 17
        }
    },

    mounted() {
        this.getWords()
    },

    computed: {
        filteredItems () {
            return this.words.slice(this.start, this.start + this.wordsPerPage)
        }
    },

    methods: {
        getWords() {
            axios
                .get('/api/words/user_words')
                .then(response => {
                    this.words = response.data.data
                })
                .catch(error => {
                    console.log('error', error)
                })
        },

        deleteWord(id) {
            axios
                .delete(`/api/words/${id}/delete_word`)
                .then(response => {
                    this.getWords()
                })
                .catch(error => {
                    console.log('error', error)
                })
        },

        addWord() {
            if (this.$refs.wordInput.value !== '') {

                axios
                .post('/api/words/create', { correct_spelling: this.$refs.wordInput.value, incorrect_spelling: 'n/a' })
                .then(response => { 
                    this.getWords()
                })
                .catch(error => {
                    console.log('error', error)
                })   
            }
        },

        nextPage() {
            this.page++
            this.start += this.wordsPerPage
        },

        previousPage() {
            this.page--
            this.start -= this.wordsPerPage
        }
    }
}
</script>