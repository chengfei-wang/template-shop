<template>
  <div class="mdui-col-xs-12 mdui-col-sm-6 mdui-col-md-4" style="margin: 16px 0;">
    <div class="mdui-card">
      <div class="mdui-card-media">
        <img :src="thumbnail" :alt="title"/>

        <div class="mdui-card-menu">
          <button class="mdui-btn mdui-btn-icon mdui-text-color-white"
                  @click="share_template">
            <i class="mdui-icon material-icons">share</i>
          </button>
          <button class="mdui-btn mdui-btn-icon mdui-text-color-white"
                  @click="edit_template">
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
  console.log('Share Template ' + props.tid)
}
</script>

<style>
.template-card-title {
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
</style>