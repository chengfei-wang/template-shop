<template>
  <div class="mdui-col-sm-6 mdui-col-md-4" style="margin: 16px 0;">
    <div class="mdui-card">
      <div class="mdui-card-media">
        <img :src="thumbnail" :alt="title"/>

        <div class="mdui-card-menu">
          <button class="mdui-btn mdui-btn-icon mdui-text-color-white">
            <i class="mdui-icon material-icons">share</i>
          </button>
          <button class="mdui-btn mdui-btn-icon mdui-text-color-white"
                  @click="edit_template">
            <i class="mdui-icon material-icons">edit</i>
          </button>
        </div>
      </div>

      <div class="mdui-card-primary">
        <div class="mdui-card-primary-title">{{ title }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import mdui from "mdui"

export default {
  name: "TemplateCardItem"
}
</script>

<script setup lang="ts">
const props = defineProps<{
  tid: string,
  title: string,
  thumbnail: string,
}>()

function edit_template() {
  window.location.href = `editor?tid=${props.tid}`
}
</script>

<style scoped>

</style>