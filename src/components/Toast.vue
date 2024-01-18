<template>
    <div 
        v-if="store.isVisible"
        class="transition ease-in-out delay-500 duration-500 px-6 py-6 fixed top-full right-8 rounded-xl shadow-xl font-bold"
        :class="store.classes"
    >
        <p v-for="item in store.message">
            {{ item }}
        </p>
    </div>
</template>

<script setup>
import { useToastStore } from '@/stores/toast'

const store = useToastStore()
</script>
