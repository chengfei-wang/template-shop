<script lang="ts">
import mdui from 'mdui';
import { TemplateOrder } from '../Model';
import { request } from '../Request';

export default {
  name: "TemplateBoughtItem"
}
</script>

<script setup lang="ts">
const props = defineProps<{
  template_order: TemplateOrder
}>()

function create_from_template() {
  request("template/bought/create", { tid: props.template_order.template.tid }, (status, obj) => {
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

<template>
  <div class="mdui-card">
    <div class="mdui-card-primary">
      <div class="mdui-card-primary-title mdui-text-uppercase">{{ template_order.template.title }}</div>
      <div class="mdui-card-primary-subtitle">{{ template_order.orderTime.toLocaleString() }}</div>
    </div>
    <div class="mdui-card-actions">
      <button class="mdui-btn mdui-ripple" disabled>以 ¥{{ template_order.price / 100 }} 购入</button>
      <button class="mdui-btn mdui-ripple mdui-float-right" @click="create_from_template">从模版创建</button>
    </div>
  </div>
</template>

<style>
.template-card-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>