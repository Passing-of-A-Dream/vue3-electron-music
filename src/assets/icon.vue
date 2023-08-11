<script setup>
const props = defineProps({
    name: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <svg class="icon" aria-hidden="true">
        <use :xlink:href="`#${props.name}`"></use>
    </svg>
</template>

<style>
.icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>
