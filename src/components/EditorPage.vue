<script lang="ts">
import Draggable from "vuedraggable";
import Toolbar from "./Toolbar.vue";
import PageBody from "./PageBody.vue";
import ConfigPanelItem from "./ConfigPanelItem.vue";
import ConfigPanelContainer from "./ConfigPanelContainer.vue";
import TemplateDraggable from "./TemplateDraggable";

import { ref } from "vue";
import { template_widgets, eval_widget_json } from "../Widget"
import { Widget } from "../Widget"
import { request } from "../Request";
import { eval_template, Template } from "../Model";
import mdui from "mdui"

export default {
  name: "EditorPage",
  components: { Draggable, Toolbar, PageBody, TemplateDraggable, ConfigPanelItem, ConfigPanelContainer }
}
</script>

<script setup lang="ts">
const content_template = template_widgets
const content_editor = ref<Array<Widget>>([])

const page_title = ref<string>("")
const page_tid = ref<string>("")

const selected_item = ref<Widget | undefined>(undefined)

function export_data(): string {
  return JSON.stringify(content_editor.value)
}

function import_data(value?: string) {
  if (value == null || value.length == 0) return
  let widget_array = <Array<any>>JSON.parse(value)
  content_editor.value = widget_array.map(eval_widget_json)
  console.log("import_data")
  console.log(content_editor.value)
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

function preview_template() {
  window.location.href = `preview?tid=${page_tid.value}`
}

function select_item(widget?: Widget) {
  console.log(`item select: ${widget?.id}`)
  selected_item.value = widget
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

    <a class="mdui-btn mdui-btn-icon" @click="preview_template">
      <i class="mdui-icon material-icons">photo</i>
    </a>
  </toolbar>
  <page-body>
    <div class="mdui-container-fluid">
      <div class="mdui-col-md-3">
        <div id="template-source" class="template-source mdui-center">
          <template-draggable :preview="true" :data="content_template" :selected_item="selected_item" :select_item="select_item" />
        </div>

        <div class="mdui-divider" style="margin: 16px 0;"></div>

        <div>
          <div class="mdui-text-center mdui-center">垃圾桶</div>
          <draggable
            id="template-trash"
            class="template-trash mdui-center"
            group="editor"
            item-key="id"
          >
            <template #item="{}">
              <div style="visibility: hidden"></div>
            </template>
          </draggable>
        </div>
      </div>

      <div class="mdui-col-md-6">
        <div class="mdui-container-fluid">
          <div class="mdui-textfield">
            <label class="mdui-textfield-label">页面标题</label>
            <input class="mdui-textfield-input" type="text" v-model="page_title" />
          </div>
        </div>
        <div id="template-container-root" class="template-container-root" @click="(e) => { select_item(undefined) }">
          <template-draggable :preview="false" :data="content_editor" @select_item="select_item" :selected_item="selected_item" :select_item="select_item" />
        </div>
      </div>

      <div class="mdui-col-md-3">
        <div v-if="selected_item !== undefined">
          <config-panel-container
            v-if="selected_item.is_container()"
            :selected_item="(selected_item)"
            :key="`container-${selected_item.id}`"
          />
          <config-panel-item
            v-else
            :selected_item="selected_item"
            :key="`item-${selected_item.id}`"
          />
          <pre style="white-space: pre-wrap;word-wrap: break-word;">{{ selected_item }}</pre>
        </div>
      </div>
    </div>
  </page-body>
</template>

<style lang="css">
@import "../template.css";

.template-container-root {
  min-height: 720px;
  border: 1px solid #aaaaaa !important;
  height: auto;
  padding: 2px;
}

.template-trash {
  width: 100%;
  height: 80px;
  margin-top: 8px;
  margin-bottom: 8px;
  border: 1px solid #aaaaaa;
}

.template-selected {
  border: 2px solid #000000 !important;
}

.choice_selected {
  border: 2px solid #cccccc;

  height: 32px;
  background-color: #dddddd;
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
  border: 1px dotted #eeeeee;
  padding: 8px 0;
}

.style_editor_group > p {
  text-align: center;
  height: 32px;
  line-height: 32px;
}
</style>