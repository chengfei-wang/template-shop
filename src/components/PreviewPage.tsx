import { Widget } from "../widget";
import { eval_widget_json } from "../widget"
import { preview_page } from "../template";
import { defineComponent, ref } from "vue";
import { request } from "../requests";
import { eval_template } from "../model";
import mdui from "mdui";

import "../template.css"

export default defineComponent({
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
      let widget_array = JSON.parse(value) as Array<any>
      content_widgets.value = widget_array.map(eval_widget_json)
      console.log("import_data")
      console.log(content_widgets.value)
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
            });
          }
        }
      )
    }

    get_template()

    return () => (
      <div>
        {preview_page(content_widgets.value)}
      </div>
    )
  }
})
