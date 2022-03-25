<script lang="ts">
import DivDraggable from "./DivDraggable.vue"

import {SlotProp} from "../../widget";

export default {
  name: "NestedDraggable",
  components: {DivDraggable}
}
</script>

<script setup lang="ts">
const props = defineProps<{
  slots: Array<SlotProp>
}>()
</script>

<template>
  <div class="template-container template-item mdui-container-fluid">
    <div-draggable v-for="slot in slots" :slot="slot"></div-draggable>
  </div>
</template>

<style>
@import "../../template.css";
</style>