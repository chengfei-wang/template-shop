<script lang="ts">
import Toolbar from "./Toolbar.vue"
import TemplateCardItem from "./TemplateCardItem.vue";
import PageBody from "./PageBody.vue";

import { request } from "../Request";
import { eval_template, Template } from "../Model";
import { ref } from "vue"
import mdui from "mdui";

export default {
  name: "CraftPage",
  components: { Toolbar, PageBody, TemplateCardItem }
}
</script>

<script setup lang="ts">
const templates = ref<Array<Template>>([])


function getTemplateList() {
  request("template/list", {}, (status, obj) => {
    if (status == 200 && obj?.code === 200 && obj.data !== null) {
      templates.value = (<Array<any>>obj.data.templates).map(value => eval_template(value))
    }
  })
}

function createTemplate() {
  mdui.prompt('模版标题', (value: string) => {
    if (value.length > 0) {
      request("template/insert", { title: value, content: JSON.stringify([]) }, (status, obj) => {
        if (status == 200 && obj?.code === 200 && obj.data != null) {
          mdui.snackbar({
            message: '创建成功',
            position: 'bottom',
          });

          window.location.href = `editor?tid=${obj.data.tid}`
        }
      })
    } else {
      mdui.snackbar({
        message: '请输入标题',
        position: 'bottom',
      });
    }
  })
}

getTemplateList()
</script>

<template>
  <Toolbar title="开始创作" />
  <page-body>
    <div class="mdui-container">
      <template-card-item
        v-for="template in templates"
        :tid="template.tid"
        :title="template.title"
        :update-time="template.updateTime"
        thumbnail="/thumbnail.png"
      />
    </div>

    <button
      @click="createTemplate"
      class="mdui-fab mdui-fab-fixed mdui-ripple mdui-color-green mdui-text-color-white"
      style="margin-bottom: 48px"
    >
      <i class="mdui-icon material-icons">add</i>
    </button>
  </page-body>
</template>