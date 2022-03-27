<script lang="ts">
import Toolbar from "./Toolbar.vue"
import TemplateCardItem from "./TemplateCardItem.vue";
import PageBody from "./PageBody.vue";

import {request} from "../requests";
import {Template} from "../model";
import {ref} from "vue"

export default {
  name: "CraftPage",
  components: {Toolbar, PageBody, TemplateCardItem}
}
</script>

<script setup lang="ts">
const templates = ref<Array<Template>>([])


function getTemplateList() {
  request("template/list", {}, (status, obj) => {
    if (status == 200 && obj?.code === 200 && obj.data !== null) {
      templates.value = (<Array<any>>obj.data.templates).map(value => new Template(value.tid, value.creator, value.title, value.content))
    }
  })
}

getTemplateList()
</script>

<template>
  <Toolbar title="开始创作"/>
  <page-body>
    <div class="mdui-container">
      <template-card-item v-for="template in templates" :tid="template.tid" :title="template.title" thumbnail="/thumbnail.png" />
      <template-card-item v-for="template in templates" :tid="template.tid" :title="template.title" thumbnail="/thumbnail.png" />
      <template-card-item v-for="template in templates" :tid="template.tid" :title="template.title" thumbnail="/thumbnail.png" />
      <template-card-item v-for="template in templates" :tid="template.tid" :title="template.title" thumbnail="/thumbnail.png" />
    </div>
  </page-body>
</template>