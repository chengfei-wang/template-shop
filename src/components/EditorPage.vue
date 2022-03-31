<script lang="ts">
import Draggable from "vuedraggable";
import SlotDraggable from "./SlotDraggable.vue";
import Toolbar from "./Toolbar.vue";
import PageBody from "./PageBody.vue";

import {ref} from "vue";
import mdui from "mdui"
import {Widget, template_widgets, eval_widget_json, class_group, NodeProp, ClassProp} from "../widget"
import { request } from "../requests";
import { eval_template, Template } from "../model";
import { render_node_prop } from "../render";

export default {
  components: {Draggable, SlotDraggable, Toolbar, PageBody}
}
</script>

<script setup lang="ts">
const content_template = template_widgets
const content_editor = ref<Array<Widget>>([])

const page_title= ref<string>("")
const page_tid = ref<string>("")

const selected_item = ref<Widget | undefined>(undefined)

function clone_item(item: Widget): Widget {
  return item.clone()
}

function export_data(): string {
  return JSON.stringify(content_editor.value)
}

function import_data(value?: string) {
  if (value == null || value.length == 0) return
  let widget_array = <Array<any>>JSON.parse(value)
  console.log(widget_array)
  content_editor.value = widget_array.map(eval_widget_json)
}

function get_template() {
  if (page_tid.value == null || page_tid.value.length == 0) {
    return
  }
  request(
    `template/${page_tid.value}`,
    {},
    (status, obj) => {
      if (status == 200 && obj.code == 200 && obj.data != null) {
        let template = eval_template(obj.data.template)
        // console.log(template)
        page_title.value = template.title
        import_data(template.content)
      } else if (status == 200) {
        console.log(obj)
        page_tid.value = ""
        mdui.snackbar({
          message: '模版不存在',
          position: 'bottom',
        });
      }
    }
  )
}

function save_template() {
  console.log(page_tid.value)
  request(
    "template/save", 
    {
      tid: page_tid.value,
      title: page_title.value,
      content: export_data(),
    },
    (status, obj) => {
      if (status == 200 && obj.code == 200) {
        mdui.snackbar({
          message: '保存成功',
          position: 'bottom',
        });
      } else if (status == 200 && obj.message != null) {
        mdui.snackbar({
          message: obj.message,
          position: 'bottom',
        });
      } else {
        mdui.snackbar({
          message: '未知异常',
          position: 'bottom',
        });
      }
    }
  )
}

function select_item(widget?: Widget) {
  console.log(`item select: ${widget?.id}`)
  selected_item.value = widget
}

function item_set_background_color(clazz: string) {
  if (selected_item.value?.prop != undefined) {
    let prop = selected_item.value.prop
    if (prop.clazz == undefined) {
      prop.clazz = new ClassProp()
    }
    prop.clazz.backgroundColor = clazz
  }
}

function item_set_text_color(clazz: string) {
  if (selected_item.value?.prop != undefined) {
    let prop = selected_item.value.prop
    if (prop.clazz == undefined) {
      prop.clazz = new ClassProp()
    }
    prop.clazz.textColor = clazz
  }
}

function item_set_text_size(clazz: string) {
  if (selected_item.value?.prop != undefined) {
    let prop = selected_item.value.prop
    if (prop.clazz == undefined) {
      prop.clazz = new ClassProp()
    }
    prop.clazz.textSize = clazz
  }
}

function item_set_text_align(clazz: string) {
  if (selected_item.value?.prop != undefined) {
    let prop = selected_item.value.prop
    if (prop.clazz == undefined) {
      prop.clazz = new ClassProp()
    }
    prop.clazz.textAlign = clazz
  }
}

const params = new URLSearchParams(location.search)
const _tid = params.get('tid')
if (_tid != null && _tid.length > 0) {
  page_tid.value = _tid
}

get_template()
</script>

<template>
  <toolbar title="编辑页面">
    <a class="mdui-btn mdui-btn-icon" @click="save_template">
      <i class="mdui-icon material-icons">save</i>
    </a>
  </toolbar>
  <page-body>
    <div class="mdui-container-fluid">
      <div class="mdui-col-md-3">
        <div id="template-source" class="template-source mdui-center">
          <draggable
              :list="content_template" :clone="clone_item" v-bind="{animation: 200}"
              :group="{name: 'editor', pull: 'clone', put: false}" item-key="id">
            <template #item="{element}">
              <div v-if="element.is_container()" class="template-container template-item mdui-container-fluid">
                <slot-draggable :id="`${element.id}-${index}`" :select_item="() => {}" :selected_item="selected_item" v-for="(slot, index) in element.children" :slot="slot"></slot-draggable>
              </div>
              <div v-else-if="!element.is_container()" v-html="render_node_prop(element.id, element.html, element.prop)"></div>
              <div v-else>Unknown</div>
            </template>
          </draggable>
        </div>

        <div class="mdui-divider" style="margin: 16px 0;"></div>

        <div>
          <div class="mdui-text-center mdui-center">垃圾桶</div>
          <draggable id="template-trash" class="template-trash mdui-center" group="editor" item-key="id">
            <template #item="{element}">
              <div style="visibility: hidden"></div>
            </template>
          </draggable>

        </div>
      </div>

      <div class="mdui-col-md-6">
        <div class="mdui-container-fluid">
          <div class="mdui-textfield">
            <label class="mdui-textfield-label">页面标题</label>
            <input class="mdui-textfield-input" type="text" v-model="page_title"/>
          </div>
        </div>
        <draggable
            id="template-container-root" class="template-container-root"
            :list="content_editor" v-bind="{animation: 200}" @click="select_item(undefined)"
            group="editor" item-key="id">
          <template #item="{element}">
            <div v-if="element.is_container()" :id="element.id" @click.stop="select_item(element)" class="template-container template-item mdui-container-fluid" :class="{'template-selected': element.id === selected_item?.id}">
              <slot-draggable :id="`${element.id}-${index}`" v-for="(slot, index) in element.children" :slot="slot" :select_item="select_item" :selected_item="selected_item"></slot-draggable>
            </div>
            <div v-else-if="!element.is_container()" @click.stop="select_item(element)" v-html="render_node_prop(element.id, element.html, element.prop)" :class="{'template-selected': element.id === selected_item?.id}"></div>
            <div v-else>Unknown</div>
          </template>
        </draggable>
      </div>

      <div class="mdui-col-md-3">
        <div v-if="selected_item !== undefined">
          <div class="style_editor_group">
            <p>文本颜色</p>
            <div class="mdui-container-fluid">
              <div v-for="choice in class_group.textColor" class="mdui-col-xs-3"
                   :class="[choice.className, selected_item.prop.clazz?.textColor === choice.className? 'choice_selected' : 'choice_unselected']"
                   @click="item_set_text_color(choice.className)">
                {{ choice.classDesc }}
              </div>
            </div>
          </div>

          <div class="style_editor_group">
            <p>背景颜色</p>
            <div class="mdui-container-fluid">
              <div v-for="choice in class_group.backgroundColor" class="mdui-col-xs-3"
                   :class="[choice.className, selected_item.prop.clazz?.backgroundColor === choice.className? 'choice_selected' : 'choice_unselected']"
                   @click="item_set_background_color(choice.className)">
                {{ choice.classDesc }}
              </div>
            </div>
          </div>

          <div class="style_editor_group">
            <p>文本字体</p>
            <div class="mdui-container-fluid">
              <div v-for="choice in class_group.textSize" class="mdui-col-xs-6"
                   :class="[choice.className, selected_item.prop.clazz?.textSize === choice.className? 'choice_selected' : 'choice_unselected']"
                   @click="item_set_text_size(choice.className)">
                {{ choice.classDesc }}
              </div>
            </div>
          </div>

          <div class="style_editor_group">
            <p>文本样式</p>
            <div class="mdui-container-fluid">
              <div v-for="choice in class_group.textAlign" class="mdui-col-xs-4"
                   :class="[choice.className, selected_item.prop.clazz?.textAlign === choice.className? 'choice_selected' : 'choice_unselected']"
                   @click="item_set_text_align(choice.className)">
                {{ choice.classDesc }}
              </div>
            </div>
          </div>
          
          <pre style="white-space: pre-wrap;word-wrap: break-word;">{{ selected_item }}</pre>
          <pre style="white-space: pre-wrap;word-wrap: break-word;">{{ render_node_prop(selected_item.id, selected_item.html, selected_item.prop) }}</pre>
        </div>
      </div>
    </div>
  </page-body>
</template>

<style lang="css">
@import "../template.css";

.choice_selected {
  border: 2px solid #aaaaaa;

  height: 32px;
  background-color: #eeeeee;
  text-align: center;
  line-height: 32px;
}

.choice_unselected {
  height: 32px;
  background-color: #eeeeee;
  text-align: center;
  line-height: 32px;
}

.style_editor_group {
  margin-bottom: 12px;
  border: 1px dotted #cccccc;
  padding: 8px 0px;
}

.style_editor_group > p {
  text-align: center;
  height: 32px;
  line-height: 32px;
}
</style>