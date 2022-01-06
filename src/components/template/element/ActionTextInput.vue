<script setup lang="ts">
import {} from "vue";
import {DataItem} from "../TemplateData";

defineProps<{
  input: DataItem,
  button: string
}>();
</script>

<template>
    <div class="mdui-textfield mdui-textfield-floating-label">
      <label class="mdui-textfield-label">{{ input.desc }}</label>
      <input class="mdui-textfield-input" :type="input.type" :name="input.id"/>
    </div>
    <input type="button" class="mdui-btn" :value="button">
</template>


<style scoped>

</style>