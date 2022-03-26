<script lang="ts">
import Draggable from "vuedraggable";
import SlotDraggable from "./SlotDraggable.vue";

import {ref} from "vue";
import {Widget, Container, SlotProp, randomId, template_widgets} from "../widget"

export default {
  components: {Draggable, SlotDraggable}
}
</script>

<script setup lang="ts">
function clone_item(item: Widget): Widget {
  return item.clone()
}

const content_template = template_widgets
const content_editor = ref<Array<Widget>>([])
</script>

<template>
  <div class="mdui-container">
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

    <div class="mdui-col-sm-7">
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

    <div class="mdui-col-sm-2">
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