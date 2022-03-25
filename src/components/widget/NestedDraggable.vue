<script setup lang="ts">
import DivDraggable from "./DivDraggable.vue"

const props = defineProps<{
  children: number
}>()
</script>

<template>
  <div :class="`mdui-row-xs-${children}`" class="template-container mdui-col">
    <div-draggable v-for="index in children"></div-draggable>
  </div>
</template>

<script lang="ts">

export default {
  name: "NestedDraggable",
}
</script>

<style>
@import "../template/template.css";
</style>