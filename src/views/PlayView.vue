<template>
    
    <div class="bg-primary-green h-screen">
        <Navbar />
        {{ currentVoice.name }}
        <img class="absolute h-[1.5rem] rotate-180 ml-5 mt-[0.5rem] cursor-pointer hover:opacity-80 " src="../assets/images/arrow.webp"
            @click="back"
        />

        <div class="flex mr-[10rem] pt-2 justify-center md:mt-2">
            <img class="h-[2.5rem] rotate-[-10deg] cursor-pointer hover:opacity-50" src="../assets/images/wings.png" />
        </div>

        <div class="flex justify-center">
            <canvas ref="canvas" width="350" height="50" class='border-2 border-black rounded-2xl bg-white'></canvas>
        </div>

        <div class="flex flex-col items-center mt-[0.5rem] font-bold ">
            <div class="text-white w-[20rem]">
                <div class="flex justify-center ">
                    <p class="w-[5rem]">voice</p>
                    <select v-model="currentVoice" @change="voiceStore.setVoice($event)" ref="voiceSelect" 
                        class="bg-primary-green border-b-2  text-black outline-none ml-2 w-[15rem]">
                    </select>
                </div>
                <p>Definition</p>
            </div>

            <div class="h-[8rem] sm:h-[12rem] w-[20rem] hover:opacity-50">
                <p @click="hearWord(definition)" class="mt-[0.5rem]">{{ definition }}</p>
                <img @click="hearWord(definition)" class="h-[1rem] cursor-pointer hover:opacity-50" src="../assets/images/soundIcon.png" />
            </div>

            <div class="flex justify-end h-[1rem] w-[20rem] gap-5">
                <p v-for="missedWords in attempts" class="text-red-500">{{missedWords}}</p>
            </div>

            <div class="flex items-center cursor-pointer hover:opacity-50" @click="hearWord(word)">
                <p class="text-[.5rem]">hear word</p>
                <img class="h-[2.5rem]" src="../assets/images/soundIcon.png" />
            </div>

            <form v-on:submit.prevent="submitWord">
                <div class="w-[20rem] flex border-b-2 items-center md:mt-[1rem]">
                    <label class="flex items-end text-white">Answer</label>
                    <input ref="wordInput" type="text" class="text-[24px] w-full ml-4 py-4 px-6 border border-gray-200 rounded-lg bg-transparent border-none outline-none">
                </div>

                <SubmitBtn text="Submit"/>
            </form>
            <p @click="skipWord" class="w-[5rem] ml-[15rem] text-right mt-[1rem] opacity-50 cursor-pointer hover:opacity-80">Skip Word</p>
        </div>

    </div>
  </template>

<script>
import Navbar from '@/components/Navbar.vue'
import LogoutBtn from '@/components/LogoutBtn.vue'
import SubmitBtn from '@/components/SubmitBtn.vue'
import EasyList from '../assets/easyWords'
import HardList from '../assets/hardWords'

import axios from 'axios';
import { useUserStore } from '../stores/user'
import { useToastStore } from '@/stores/toast';
import { useVoiceStore } from '@/stores/voice'
import { useGameSettings } from '@/stores/gameSettings'

export default {
    setup() {
        const userStore = useUserStore()
        const toastStore = useToastStore()
        const voiceStore = useVoiceStore()
        const gameSettings = useGameSettings()

        return {
            userStore,
            toastStore,
            voiceStore,
            gameSettings
        }
    },

    components: {
        Navbar,        
        LogoutBtn,
        SubmitBtn,
        useGameSettings
    },

    mounted() {
        // TODO get play's voice select to populate with current voice
        // this.currentVoice = this.voiceStore.voices[this.voiceStore.currentVoiceIndex]
        // console.log(this.currentVoice.name)
        // this.currentVoice = this.currentVoice.name
        this.drawFace()
        this.getMyWords()
        this.populateVoiceFromStore()
        this.$refs.voiceSelect.value = 'test'

    },

    data() {
        return {
            word: 'dog',
            definition: 'a domesticated carnivorous mammal that typically has a long snout, an acute sense of smell, nonretractable claws, and a barking, howling, or whining voice.',
            score: 0,
            points: 35,
            attempts: [],
            missedWords: [],
            currentVoice: ''
        }
    },

    methods: {
        hearWord(targetWord) {
            const utterance  = new SpeechSynthesisUtterance();
            utterance.text = targetWord;
            utterance.voice = this.voiceStore.voices[this.voiceStore.currentVoiceIndex]
            window.speechSynthesis.speak(utterance);
        },


        getWord() {
            let index = 0

            if (this.gameSettings.difficulty === 'easy') {
                index = Math.floor(Math.random() * (EasyList.list.length - 0) + 0);
                this.word = EasyList.list[index]
            }
            else if (this.gameSettings.difficulty === 'hard') {
                index = Math.floor(Math.random() * (HardList.list.length - 0) + 0);
                this.word = HardList.list[index]
            }
            else if (this.gameSettings.difficulty === 'myWords') {
                index = Math.floor(Math.random() * (this.missedWords.length - 0) + 0);
                this.word = this.missedWords[index].correct_spelling
            }

            this.getDefinition()

            this.hearWord(this.word)
        },

        getDefinition() {
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${this.word}`)
            .then(res => res.json())
            .then((res)=> {
                this.definition = res[0]['meanings'][0]['definitions'][0]['definition']
            })
            .catch((error) => {
                console.log(`Word ${this.word} did not work with dictionary api, fetching new word`, error)
            })
        },

        submitWord() {
            // if input value is correct spelling
            if (this.$refs.wordInput.value.toLowerCase() === this.word.toLowerCase()) {
                this.getWord()
                this.$refs.wordInput.value = ''

                this.score ++
                this.drawProgress()
                this.resetWord()
            }
            else if (this.attempts.length === 3) { 
                this.toastStore.showToast(5000, [`The word "${this.word.toUpperCase()}" added to your words`], 'bg-green-300')
                this.postMissedWord()
                this.resetWord()
                this.getWord()
            }
            else {
                this.attempts.push(this.$refs.wordInput.value.toLowerCase())
                this.$refs.wordInput.style = 'color: red' 
            }
        },

        skipWord() {
            this.resetWord()
            this.getWord()
        },

        resetWord() {
            this.attempts = []
            this.$refs.wordInput.style = 'color: black' 
            this.$refs.wordInput.value = ''
        },

        drawProgress() {
            const pointsPerCorrect = 350 /  this.gameSettings.numOfWords
            
            const ctx = this.$refs.canvas.getContext("2d");
            this.score % 2 === 0 ? ctx.fillStyle = "#F7F06A" : ctx.fillStyle = "black"
        
            // x y width height
            ctx.fillRect(this.points, 0, pointsPerCorrect, 100);
            this.points += pointsPerCorrect
                        
            if (this.points >= 350) {
                this.points = 35
                this.score = 0
                ctx.clearRect(0, 0, 350, 50)
                this.drawFace()
            }
        },

        drawFace() {
            const ctx = this.$refs.canvas.getContext("2d"); 

            // yellow head
            ctx.fillStyle = "#F7F06A"
            ctx.fillRect(0, 0, 35, 100);
            
            // mouth
            ctx.beginPath();
            ctx.arc(20, 20, 5, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fillStyle = 'black';
            ctx.fill()

            // eye
            ctx.beginPath();
            ctx.arc(0, 32, 10, 0, 0.5 * Math.PI);
            ctx.lineWidth = 2;
            ctx.stroke();
        },

        detectIfNewWord() {
            for (let i = 0; i < this.missedWords.length; i++) {
                if (this.missedWords[i].correct_spelling === this.word) {
                    return true
                }
            }
            return false
        },

        postMissedWord() {
            if (!this.detectIfNewWord()) {
                axios
                .post('/api/words/create', { correct_spelling: this.word, incorrect_spelling: this.$refs.wordInput.value })
                .then(response => { 
                        this.missedWords.push(this.word)
                    })
                    .catch(error => {
                        console.log('error', error)
                })
             }
        },

        getMyWords() {
            axios
                .get('/api/words/user_words')
                .then(response => {
                    this.missedWords = response.data.data
                    this.getWord()
                })
                .catch(error => {
                    console.log('error', error)
                })
        },

        // TODO GameSettings.vue and PlayView have similar functions See if can be put in store.
        populateVoiceFromStore() {
            for(let i = 0; i < this.voiceStore.voices.length; i++) {
                    const option = document.createElement('option');
                    option.textContent = this.voiceStore.voices[i].name + ' (' + this.voiceStore.voices[i].lang + ')';
                    option.value = i;
                    this.$refs.voiceSelect.appendChild(option);
                }     
                
        },

        back() {
            this.gameSettings.settingsChosen = false
        }

    },
}
</script>