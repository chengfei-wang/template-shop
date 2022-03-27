<script setup lang="ts">

</script>

<script lang="ts">
import Toolbar from "./Toolbar.vue"
import PageBody from "./PageBody.vue";

export default {
  name: "PersonalPage",
  components: {Toolbar, PageBody}
}
</script>

<template>
  <toolbar title="个人中心"/>
  <page-body>
    <div class="mdui-container">

    </div>
  </page-body>
</template>

