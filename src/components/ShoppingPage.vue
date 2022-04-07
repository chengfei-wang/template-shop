<script lang="ts">
import Toolbar from "./Toolbar.vue"
import PageBody from "./PageBody.vue";
import { request } from "../Request";
import { eval_template_share, TemplateShare } from "../Model";
import { ref } from "vue";

export default {
  name: "ShoppingPage",
  components: {Toolbar, PageBody}
}
</script>

<script setup lang="ts">

const templates = ref<Array<TemplateShare>>([])

// 获取共享模版列表
function getSharedTemplateList() {
  request("template/share/list", {}, (status, obj) => {
    if (status == 200 && obj?.code === 200 && obj.data !== null) {
      console.log(obj.data)
      templates.value = (<Array<any>>obj.data.templates).map(value => eval_template_share(value))
    }
  })
}

getSharedTemplateList()
</script>


<template>
  <toolbar title="模版市场"/>
  <page-body>
    <div class="mdui-container">

    </div>
  </page-body>
</template>