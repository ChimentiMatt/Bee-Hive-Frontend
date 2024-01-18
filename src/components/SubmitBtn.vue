<template>
    <button class="text-[24px] w-[20rem] py-4 mt-[3rem] bg-white text-black font-bold rounded-[10rem] hover:opacity-80">{{ text }}</button>
</template>

<script>
export default {
    props: {
        text: 'NA',

    },
    emits: ['update:modelValue']
}
</script>