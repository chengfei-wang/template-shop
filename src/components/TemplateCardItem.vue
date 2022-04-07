<template>
  <div class="mdui-col-xs-12 mdui-col-sm-6 mdui-col-md-4" style="margin: 16px 0;">
    <div class="mdui-card">
      <div class="mdui-card-media">
        <img :src="thumbnail" :alt="title" />

        <div class="mdui-card-menu">
          <button class="mdui-btn mdui-btn-icon mdui-text-color-white" @click="share_template">
            <i class="mdui-icon material-icons">share</i>
          </button>
          <button class="mdui-btn mdui-btn-icon mdui-text-color-white" @click="edit_template">
            <i class="mdui-icon material-icons">edit</i>
          </button>
        </div>
      </div>

      <div class="mdui-card-primary">
        <div class="mdui-card-primary-title template-card-title">{{ title }}</div>
        <div class="mdui-card-primary-subtitle">{{ updateTime.toLocaleString() }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import mdui from 'mdui';
import { request } from '../Request';

export default {
  name: "TemplateCardItem"
}
</script>

<script setup lang="ts">
const props = defineProps<{
  tid: string,
  title: string,
  updateTime: Date,
  thumbnail: string,
}>()

function edit_template() {
  window.location.href = `editor?tid=${props.tid}`
}

function share_template() {
  mdui.prompt('请输入购买价格', '共享模版', (value: string) => {
    // 判断price是否为数字且大于0
    if (value.length > 0 && !isNaN(parseFloat(value)) && parseFloat(value) > 0) {
      // 将value四舍五入转换为整数
      const price = Math.round(parseFloat(value) * 100)
      request("template/share", { tid: props.tid, price: price }, (status, obj) => {
        if (status == 200 && obj?.code === 200 && obj.data != null) {
          mdui.snackbar({
            message: '共享成功',
            position: 'bottom',
          });
          console.log(obj.data) // 共享成功后的数据
        }
      })
    } else {
      mdui.snackbar({
        message: '请输入正确的价格',
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