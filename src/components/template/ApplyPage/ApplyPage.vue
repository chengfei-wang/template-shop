<script setup lang="ts">
import TextInput from "../element/TextInput.vue"
import FormSubmit from "../element/FormSubmit.vue"

import {TemplateForm} from "../TemplateForm";
import {TemplateStyle} from "../TemplateStyle";
import {TemplateData} from "../TemplateData";

defineProps<{
  form: TemplateForm,
  style: TemplateStyle,
  data: TemplateData,
}>()
</script>

<template>
  <form :action="form.url" :method="form.method" onsubmit="return false">
    <TextInput v-for="item in data.items" :item="item" :key="item.id"/>
    <FormSubmit text="提交"/>
  </form>
</template>

<style scoped>
form {
  padding-left: 16px;
  padding-right: 16px;
}
</style>