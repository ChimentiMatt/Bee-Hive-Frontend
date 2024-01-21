<template>
    <div class="bg-primary-green h-screen">
        <Navbar />
        
        <form v-on:submit.prevent="submitForm" class="flex flex-col justify-center items-center drop-shadow-lg">
            <div class="w-[20rem] flex flex-col border-b-2 items-center mt-[2rem] text-[24px] font-bold text-primary-blue">

                <h1 class="text-[40px] text-white drop-shadow-lg">Game Settings</h1>
                
                <div class="w-[20rem] flex border-b-2 items-center mt-[4rem] text-right">
                    <label>Difficulty</label>
                    <select v-model="forms.difficulty" class="w-full ml-[2rem]  mt-2 bg-transparent text-right pr-2">
                        <option value="easy">Easy</option>
                        <option value="hard">Hard</option>
                        <option value="myWords">My Words</option>
                    </select>
                </div>
                
                <div class="w-[20rem] flex border-b-2 items-center mt-[1rem] whitespace-nowrap">
                    <label>Number of Words</label>
                    <input
                        v-model="forms.numOfWords"
                        type="number"
                        class="text-right w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg bg-transparent border-none outline-none"
                    >
                </div>
                
                <div class="w-[20rem] flex border-b-2 items-center mt-[2rem]">
                    <label>Voice</label>
                    <select v-model="forms.voice" @change="changeVoice($event)" ref="voiceSelect" class="w-full ml-[2rem] mt-2 bg-transparent text-right pr-2">
                        <option>Choose a voice</option>
                    </select>
                </div>
            </div>
            
            <SubmitBtn text="Game Start"/>
        </form>

    </div>
        
</template>

<script>
import Input from '@/components/Input.vue'
import Navbar from '@/components/Navbar.vue'
import PlayView from './PlayView.vue'
import LogoutBtn from '@/components/LogoutBtn.vue'
import SubmitBtn from '@/components/SubmitBtn.vue'
import { useToastStore } from '@/stores/toast'
import { useVoiceStore } from '@/stores/voice'
import { useGameSettings } from '@/stores/gameSettings'
import axios from 'axios';


export default {
    setup() {
        const toastStore = useToastStore()
        const voiceStore = useVoiceStore()
        const gameSettings = useGameSettings()

        return {
            toastStore,
            voiceStore,
            gameSettings
        };
    },

    components: { 
        Input,
        SubmitBtn,
        Navbar,
        PlayView,
        LogoutBtn,
        useToastStore,
        useVoiceStore,
        useGameSettings
    },

    data() {
        return {
            forms: {
                difficulty: 'easy',
                numOfWords: 10,
                voice: '',
            },
            errors: [],
            test: this.gameSettings.settingsChosen
        }
    },

    mounted() {
        this.populateVoiceFromAPI()
    },

    methods: {
        submitForm() {
            console.log(this.$refs.voiceSelect.value)
            if (this.$refs.voiceSelect.value === 'Choose a voice') {
                this.toastStore.showToast(5000, ['Please select a Voice'], 'bg-red-300');
                return

            }
            this.gameSettings.difficulty = this.forms.difficulty
            this.gameSettings.numOfWords = this.forms.numOfWords
            this.voiceStore.currentVoice = this.forms.voice

            // prevents user from using My Words when they have none in their list
            if (this.forms.difficulty === 'myWords') {
                this.getWords()
            }
            else {
                this.gameSettings.settingsChosen = true;
                this.voiceStore.currentVoice = this.$refs.voiceSelect
            }
            
        },

        // TODO api call should be moved to an earlier point and sent to store. Temporary code
        getWords() {
            console.log('in')
            axios
                .get('/api/words/user_words')
                .then(response => {
                    if ( response.data.data.length < 1) {
                        this.toastStore.showToast(5000, ['Unable to select My Words. No current words in list.'], 'bg-red-300');
                    }
                    else {
                        this.gameSettings.settingsChosen = true;
                    }
                })
                .catch(error => {
                    console.log('error', error)
                })
        },

        getVoices() {
            return new Promise(
                function (resolve, reject) {
                    let synth = window.speechSynthesis
                    let id

                    id = setInterval(() => {
                        if (synth.getVoices().length !== 0) {
                            resolve(synth.getVoices())
                            clearInterval(id);
                        }
                    })
                }
            )
        },

        // TODO GameSettings.vue and PlayView have similar functions See if can be put in store.
        populateVoiceFromAPI() {
            const data = this.getVoices();
            const voiceArray = []

            data.then((voices) => {
                for(let i = 0; i < voices.length; i++) {
                    const option = document.createElement('option');
                    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
                    option.value = i;
                    this.$refs.voiceSelect.appendChild(option);
                    voiceArray.push(voices[i])
                }     
            });
            this.voiceStore.voices = voiceArray
        },

        changeVoice(event) {
            this.voiceStore.setVoice(event)
            this.voiceStore.sayWord(event.target.value, 'Welcome to Bee Hive')
        }
    }
}
</script>

