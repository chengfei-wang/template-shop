<script setup lang="ts">
import {} from "vue";
import {DataItem} from "../TemplateData";

defineProps<{
  item: DataItem,
}>();
</script>

<template>
  <div class="mdui-textfield mdui-textfield-floating-label">
    <label class="mdui-textfield-label">{{ item.desc }}</label>
    <input class="mdui-textfield-input" :type="item.type" :name="item.id"/>
  </div>
</template>


<style scoped>

</style>