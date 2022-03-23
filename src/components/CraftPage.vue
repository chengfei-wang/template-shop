<script setup lang="ts">
import Toolbar from "./widget/Toolbar.vue"
import ApplyPage from "./template/ApplyPage/ApplyPage.vue"
import {TemplateData} from "./template/TemplateData";

const data: TemplateData = {
  items: [
    {
      id: "982479823",
      desc: "电话",
      type: "tel",
    },
    {
      id: "126398126",
      desc: "邮件",
      type: "email",
    },
    {
      id: "392723423",
      desc: "地址",
      type: "address",
    }
  ]
};
</script>

<template>
  <Toolbar title="开始创作"/>
  <ApplyPage :form="{method: 'POST', url: 'http://localhost:8080/26313987'}" :data="data" :style="{}"/>
</template>