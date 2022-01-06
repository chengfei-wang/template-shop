<script setup lang="ts">
import {defineProps} from 'vue';
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
  {{ form.method }} {{ form.url }}
</template>

<style scoped>

</style>