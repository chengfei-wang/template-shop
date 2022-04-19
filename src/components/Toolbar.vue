<script setup lang="ts">
defineProps<{
  title: string,
}>()
</script>

<script lang="ts">
export default {
  name: "Toolbar"
}
</script>

<template>
  <div class="mdui-appbar mdui-appbar-fixed mdui-color-white">
    <div class="mdui-toolbar mdui-color-theme">
      <a href="/" class="mdui-typo-title">TemplateShop</a>
      <a href="javascript:" class="mdui-typo-body2">{{ title }}</a>
      <div class="mdui-toolbar-spacer"></div>
      <slot></slot>
    </div>
  </div>
</template>