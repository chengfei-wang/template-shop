<template>
{{ title }}
</template>

<script lang="ts">
import mdui from 'mdui';
import { request } from '../Request';

export default {
  name: "TemplateBoughtItem"
}
</script>

<script setup lang="ts">
const props = defineProps<{
  tid: string,
  title: string,
}>()

function create_from_template() {
  request("template/bought/create", { tid: props.tid }, (status, obj) => {
    if (status == 200 && obj?.code === 200 && obj.data != null) {
      mdui.snackbar({
        message: '创建成功',
        position: 'bottom',
      });
      window.location.href = `/editor?tid=${obj.data.tid}`
    } else {
      // 创建失败
      mdui.snackbar({
        message: `创建失败, ${obj?.message || '未知错误'}`,
        position: 'bottom',
      });
    }
  })
}
</script>

<style>
.template-card-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>