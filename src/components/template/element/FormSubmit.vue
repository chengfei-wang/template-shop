<script setup lang="ts">

defineProps<{
  text: string
}>()
</script>

<template>
  <input class="mdui-btn mdui-color-amber mdui-btn-block" type="button" :value="text">
</template>

<style scoped>

</style>