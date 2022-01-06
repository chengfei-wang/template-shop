<script setup lang="ts">
import Toolbar from './Toolbar.vue'
import ApplyPage from './templates/ApplyPage/ApplyPage.vue'
</script>

<template>
  <Toolbar title="开始创作"/>
  <ApplyPage :form="{method: 'POST', url: 'http://localhost:8080/26313987'}" :data="{data: []}" :style="{}"/>
</template>