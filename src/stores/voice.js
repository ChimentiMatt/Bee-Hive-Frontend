import { defineStore } from 'pinia'

export const useVoiceStore = defineStore({
    id: 'voice',

    state: () => ({
        voices: [],
        currentVoiceIndex: 0
    }),

    actions: {
        setVoice(event) {
            this.currentVoiceIndex = event.target.value
        }
    }
})