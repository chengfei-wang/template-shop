<script setup lang="ts">

</script>

<script>
import Toolbar from "./Toolbar.vue"
import PageBody from "./PageBody.vue";

export default {
  name: "ShoppingPage",
  components: {Toolbar, PageBody}
}
</script>

<template>
  <toolbar title="模版市场"/>
  <page-body>
    <div class="mdui-container">

    </div>
  </page-body>
</template>