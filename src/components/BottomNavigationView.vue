<script lang="ts">
export default {
  name: "BottomNavigationView"
}
</script>

<script setup lang="ts">

defineProps<{
  onPageChange: (page: number) => void
}>()

</script>

<template>
  <div class="mdui-bottom-nav mdui-bottom-nav-text-auto mdui-color-white">
    <a v-on:click="onPageChange(0)" class="mdui-ripple mdui-bottom-nav-active">
      <i class="mdui-icon material-icons">language</i>
      <label>模版市场</label>
    </a>
    <a v-on:click="onPageChange(1)" class="mdui-ripple">
      <i class="mdui-icon material-icons">grid_on</i>
      <label>开始创作</label>
    </a>
    <a v-on:click="onPageChange(2)" class="mdui-ripple">
      <i class="mdui-icon material-icons">account_box</i>
      <label>个人中心</label>
    </a>
  </div>
</template>
