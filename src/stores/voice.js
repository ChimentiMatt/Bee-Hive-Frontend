import { defineStore } from 'pinia'

export const useVoiceStore = defineStore({
    id: 'voice',

    state: () => ({
        voices: [],
        currentVoiceIndex: 0
    }),

    actions: {

    }
})