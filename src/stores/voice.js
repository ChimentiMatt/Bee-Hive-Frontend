import { defineStore } from 'pinia'

export const useVoiceStore = defineStore({
    id: 'voice',

    state: () => ({
        voices: [],
        currentVoiceIndex: 0,
        currentVoice: ''
    }),

    actions: {
        setVoice(event) {
            this.currentVoiceIndex = event.target.value
        },

        sayWord(voiceIndex, word) {
            const utterance  = new SpeechSynthesisUtterance()
            utterance.text = word
            utterance.voice = this.voices[voiceIndex]
            window.speechSynthesis.speak(utterance)
        }
    }
})