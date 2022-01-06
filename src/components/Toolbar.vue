<template>
  <div class="mdui-appbar">
    <div class="mdui-toolbar mdui-color-theme">
      <a href="javascript:;" class="mdui-typo-headline">TemplateShop</a>
      <a href="javascript:;" class="mdui-typo-title">{{ title }}</a>
      <div class="mdui-toolbar-spacer"></div>
      <a href="javascript:;" class="mdui-btn mdui-btn-icon">
        <i class="mdui-icon material-icons">search</i>
      </a>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
})
</script>

<style scoped>

</style>