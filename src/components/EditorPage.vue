<script lang="ts">
import Draggable from "vuedraggable";
import SlotDraggable from "./SlotDraggable.vue";
import Toolbar from "./Toolbar.vue";

import {ref} from "vue";
import mdui from "mdui"
import {Widget, Container, SlotProp, randomId, template_widgets, eval_widget_json} from "../widget"

export default {
  components: {Draggable, SlotDraggable, Toolbar}
}
</script>

<script setup lang="ts">
function clone_item(item: Widget): Widget {
  return item.clone()
}

function export_data() {
  console.log(JSON.stringify(content_editor.value))
}

function import_data() {
  mdui.prompt(
      '请输入Widget Json',
      function (value: string) {
        content_editor.value = <Array<any>>JSON.parse(value).map(eval_widget_json)
      },
      function (value: string) {},
      {
        type: 'textarea'
      }
  );
}

const content_template = template_widgets
const content_editor = ref<Array<Widget>>([])
</script>

<template>
  <toolbar title="编辑页面" />
  <div class="mdui-container" style="margin-top: 32px">
    <div class="mdui-col-sm-3">
      <div id="template-source" class="template-source mdui-center">
        <draggable
            :list="content_template" :clone="clone_item" v-bind="{animation: 200}"
            :group="{name: 'editor', pull: 'clone', put: false}" item-key="id">
          <template #item="{element}">
            <div v-if="element.is_container()" class="template-container template-item mdui-container-fluid">
              <slot-draggable :id="`${element.id}-${index}`" v-for="(slot, index) in element.children" :slot="slot"></slot-draggable>
            </div>
            <div v-else-if="!element.is_container()" :id="element.id" v-html="element.html"></div>
            <div v-else>Unknown</div>
          </template>
        </draggable>
      </div>
    </div>

    <div class="mdui-col-sm-6">
      <draggable
          id="template-container-root" class="template-container-root"
          :list="content_editor" v-bind="{animation: 200}"
          group="editor" item-key="id">
        <template #item="{element}">
          <div v-if="element.is_container()" class="template-container template-item mdui-container-fluid">
            <slot-draggable :id="`${element.id}-${index}`" v-for="(slot, index) in element.children" :slot="slot"></slot-draggable>
          </div>
          <div v-else-if="!element.is_container()" :id="element.id" v-html="element.html"></div>
          <div v-else>Unknown</div>
        </template>
      </draggable>
    </div>

    <div class="mdui-col-sm-3">
      <button class="mdui-btn mdui-center mdui-color-green mdui-text-color-white" @click="import_data">导入数据</button>
      <button class="mdui-btn mdui-center mdui-color-green mdui-text-color-white" @click="export_data">导出数据</button>
      <draggable id="template-trash" class="template-trash mdui-center" group="editor" item-key="id">
        <template #item="{element}">
          <div style="visibility: hidden"></div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<style lang="css">
@import "../template.css";
</style>