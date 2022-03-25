<script setup lang="ts">
import {randomId} from "./template/drag_handler"
import {ref} from "vue";
import {Widget, Container, SlotProp} from "../widget"
import NestedDraggable from "./widget/NestedDraggable.vue";

function create_widget(html: string): Widget {
  return new Widget(randomId(), html)
}

function create_container(children: Array<SlotProp>, description: string): Container {
  return new Container(randomId(), description, children)
}

function clone_item(item: Widget): Widget {
  return item.clone()
}

// const drag = ref(false)
const content_source = ref<Array<Widget>>([
  create_widget("<p class='template-item'>简单文本</p>"),
  create_widget("<input type='text' class='template-item mdui-textfield-input' placeholder='请输入文本'/>"),
  create_widget("<button class='template-item mdui-text-color-white mdui-color-green-400'>普通按钮</button>"),
  create_container(SlotProp.create_slots(4, 4, 4, 12), "<div></div>"),
  create_container(SlotProp.create_slots(6, 6), "<div></div>")
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
            v-bind="{animation: 200}"
            :group="{name: 'editor', pull: 'clone', put: false}"
            item-key="id">
          <template #item="{element}">
            <nested-draggable
                v-if="element.is_container()"
                :id="element.id"
                :slots="element.children">
            </nested-draggable>
            <div
                v-else-if="!element.is_container()"
                :id="element.id"
                v-html="element.html">
            </div>
            <div v-else>Unknown</div>
          </template>
        </draggable>
      </div>
    </div>

    <div class="mdui-col-sm-7">
      <draggable
          id="template-container-root"
          class="template-container-root"
          :list="content_editor"
          v-bind="{animation: 200}"
          group="editor"
          item-key="id">
        <template #item="{element}">
          <nested-draggable
              v-if="element.is_container()"
              :id="element.id"
              :slots="element.children">
          </nested-draggable>
          <div
              v-else-if="!element.is_container()"
              :id="element.id"
              v-html="element.html">
          </div>
          <div v-else>Unknown</div>
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

export default {
  components: {draggable},
}
</script>

<style lang="css">
@import "./template/template.css";
</style>