<script setup lang="ts">
import {dragstart_handler} from "../drag_handler"

defineProps<{}>();
</script>

<template>
  <div draggable="true" v-on:dragstart="dragstart_handler($event)"
       class="template-item template-flag mdui-textfield mdui-textfield-floating-label">
    <label class="mdui-textfield-label">简单文本框</label>
    <input class="mdui-textfield-input" type="text"/>
  </div>
</template>


<style scoped>
@import "../template.css";
</style>