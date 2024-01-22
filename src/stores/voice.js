import { defineStore } from 'pinia'

export const useVoiceStore = defineStore({
    id: 'voice',

    state: () => ({
        voices: [],
        currentVoiceIndex: 0,
        currentVoice: '',
        browserPermissions: false  
    }),

    actions: {
        setVoice(event) {
            this.currentVoiceIndex = event.target.value
        },

        sayWordPermissions(text) {
            /* 
            Browsers does not let sounds play before a user interacts at least once with a button or @click. 
            Function plays text while giving permissions. Not for use on Selects or anything other than @click
            */ 
            this.browserPermissions = true 

            const utterance  = new SpeechSynthesisUtterance()
            utterance.text = text
            utterance.voice = this.voices[this.currentVoiceIndex]
            window.speechSynthesis.speak(utterance)
        },

        sayWord(voiceIndex, word) {
            /* 
            Now that user has interacted with a sound @click, browsers allows the use of sound freely
            Needed for selects.
            */
            if (this.browserPermissions) {
                const utterance  = new SpeechSynthesisUtterance()
                utterance.text = word
                utterance.voice = this.voices[voiceIndex]
                window.speechSynthesis.speak(utterance)
            }
        },
        
    }
})