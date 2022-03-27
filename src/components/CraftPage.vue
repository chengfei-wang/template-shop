<script lang="ts">
import Toolbar from "./Toolbar.vue"
import TemplateCardItem from "./TemplateCardItem.vue";

import {request} from "../requests";
import {Template} from "../model";
import {ref} from "vue"

export default {
  name: "CraftPage",
  components: {Toolbar, TemplateCardItem}
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
  <div class="mdui-container" style="margin-top: 96px">
    <template-card-item v-for="template in templates" :tid="template.tid" :title="template.title" thumbnail="/thumbnail.png" />
    <template-card-item v-for="template in templates" :tid="template.tid" :title="template.title" thumbnail="/thumbnail.png" />
    <template-card-item v-for="template in templates" :tid="template.tid" :title="template.title" thumbnail="/thumbnail.png" />
    <template-card-item v-for="template in templates" :tid="template.tid" :title="template.title" thumbnail="/thumbnail.png" />
  </div>
</template>