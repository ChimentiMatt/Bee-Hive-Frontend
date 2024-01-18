<template>
    <div class="w-[20rem] flex border-b-2 items-center mt-[1rem] whitespace-nowrap">
        <label>{{ label }}</label>
        <input
            @input="$emit('update:modelValue', $event.target.value)"
            :type="field"
            class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg bg-transparent border-none outline-none"
        >
    </div>
</template>

<script>
export default {
    props: {
        label: String,
        field: String
    },
    emits: ['update:modelValue']
}
</script>