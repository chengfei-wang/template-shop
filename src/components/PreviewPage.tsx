import { Widget } from "../Widget";
import { template_render_function } from "./Template";
import { defineComponent, ref } from "vue";
import { request } from "../Request";
import { eval_template } from "../Model";

import mdui from "mdui";

export default defineComponent({
  name: "PreviewPage",
  setup() {
    const content_widgets = ref<Widget[]>([])
    const page_tid = ref("")

    const params = new URLSearchParams(location.search)
    const _tid = params.get('tid')
    if (_tid != null && _tid.length > 0) {
      page_tid.value = _tid
    }

    const import_data = (value?: string) => {
      if (value == null || value.length == 0) return
      content_widgets.value = JSON.parse(value) as Widget[]
    }

    const get_template = () => {
      if (page_tid.value == null || page_tid.value.length == 0) {
        return
      }
      request(
        `template/${page_tid.value}`,
        {},
        (status, obj) => {
          if (status == 200 && obj.code == 200 && obj.data != null) {
            let template = eval_template(obj.data.template)
            import_data(template.content)
          } else if (status == 200) {
            console.log(obj)
            page_tid.value = ""
            mdui.snackbar({
              message: '模版不存在',
              position: 'bottom',
              timeout: 2000,
              onClosed: () => {
                window.location.href = '/'
              }
            });
          }
        }
      )
    }

    get_template()

    return () => (
      <div class='mdui-container'>
        <div class='mdui-col-md-4 mdui-col-sm-2'></div>
        <div class='mdui-col-md-4 mdui-col-sm-8'>{
          content_widgets.value.map(widget => {
            return template_render_function(widget).release_view(widget)
          })
        }</div>
        <div class='mdui-col-md-4 mdui-col-sm-2'></div>
      </div>
    )
  }
})
