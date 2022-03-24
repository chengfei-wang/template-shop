<script setup lang="ts">
import TextInput from "./template/element/TextInput.vue";
import {dragover_handler, drop_handler, delete_handler, randomId} from "./template/drag_handler.ts"
import {ref, h} from "vue";

</script>

<template>
  <div class="mdui-container">
    <div class="mdui-col-sm-3">
      <div id="template-source" class="template-source">
        <draggable
            @drop="drop_handler($event, (data) => {content.push({component: data})})"
            @dragover="dragover_handler($event)"
            v-model="content"
            @start="drag=true"
            @end="drag=false"
            tag="transition-group"
            item-key="id">
          <template #item="{element}">
            <component is="text-input"/>
          </template>
        </draggable>
      </div>
    </div>

    <div class="mdui-col-sm-7">
      <div id="template-container-root"
           class="template-container-root">
        <draggable
            @drop="drop_handler($event, (data) => {content.push({component: data})})"
            @dragover="dragover_handler($event)"
            v-model="content"
            @start="drag=true"
            @end="drag=false"
            tag="transition-group"
            item-key="id">
          <template #item="{element}">
            <component is="text-input"/>
          </template>
        </draggable>
      </div>

    </div>

    <div class="mdui-col-sm-2">
      <div
          class="template-trash mdui-center"
          @drop="delete_handler($event)"
          @dragover="dragover_handler($event)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import draggable from "vuedraggable";
import {ref} from "vue";

export default {
  components: {draggable},
  data() {
    return {
      drag: false,
      content: [{component: "TextInput"}]
    }
  }
}
</script>

<style scoped lang="css">
@import "./template/template.css";
</style>