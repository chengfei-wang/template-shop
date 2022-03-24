<script setup lang="ts">
import {randomId} from "./template/drag_handler"
import {ref} from "vue";

class Widget {
  id: string
  description: string

  constructor(id: string, description: string) {
    this.id = id
    this.description = description
  }
}

function create_widget(html: string): Widget {
  return new Widget(randomId(), html)
}

function clone_item(item: Widget) {
  return new Widget(randomId(), item.description)
}

// const drag = ref(false)
const content_source = ref<Array<Widget>>([
  create_widget("<p class='template-item'>简单文本</p>"),
  create_widget("<input type='text' class='template-item mdui-textfield-input' placeholder='请输入文本'/>"),
  create_widget("<button class='template-item mdui-text-color-white mdui-color-green-400'>普通按钮</button>"),
])
const content_editor = ref<Array<Widget>>([])
const content_trash = ref<Array<Widget>>([])
</script>

<template>
  <div class="mdui-container">
    <div class="mdui-col-sm-3">
      <div id="template-source" class="template-source">
        <draggable
            :list="content_source"
            :clone="clone_item"
            :group="{ name: 'editor', pull: 'clone', put: false }"
            item-key="id">
          <template #item="{element}">
            <div v-html="element.description"></div>
          </template>
        </draggable>
      </div>
    </div>

    <div class="mdui-col-sm-7">
      <draggable
          id="template-container-root"
          class="template-container-root"
          :list="content_editor"
          group="editor"
          item-key="id">
        <template #item="{element}">
          <div v-html="element.description" :id="element.id"></div>
        </template>
      </draggable>
    </div>

    <div class="mdui-col-sm-2">
      <draggable
          id="template-trash"
          class="template-trash mdui-center"
          :list="content_trash"
          group="editor"
          item-key="id">
        <template #item="{element}">
          <div style="visibility: hidden"></div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script lang="ts">
import draggable from "vuedraggable";
import {ref} from "vue";
import {randomId} from "./template/drag_handler";

export default {
  components: {draggable},
}
</script>

<style lang="css">
@import "./template/template.css";
</style>