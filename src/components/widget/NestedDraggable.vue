<script setup lang="ts">
import DivDraggable from "./DivDraggable.vue"
import {SlotProp} from "../../widget";

const props = defineProps<{
  slots: Array<SlotProp>
}>()
</script>

<template>
  <div class="template-container template-item mdui-container-fluid">
    <div-draggable v-for="slot in slots" :slot="slot"></div-draggable>
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