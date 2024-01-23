import { defineStore } from 'pinia'

export const useGameSettings = defineStore({
    id: 'gameSettings',

    state: () => ({
        settingsChosen: false,
        difficulty: 'easy',
        numOfWords: 10,
        attempts: 3,
    }),

    actions: {

    }
})