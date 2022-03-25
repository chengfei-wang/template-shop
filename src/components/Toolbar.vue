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
  <div class="mdui-appbar">
    <div class="mdui-toolbar mdui-color-theme">
      <a href="/" class="mdui-typo-headline">TemplateShop</a>
      <a href="javascript:" class="mdui-typo-title">{{ title }}</a>
      <div class="mdui-toolbar-spacer"></div>
      <a href="javascript:" class="mdui-btn mdui-btn-icon">
        <i class="mdui-icon material-icons">search</i>
      </a>
    </div>
  </div>
</template>

<style scoped>

</style>