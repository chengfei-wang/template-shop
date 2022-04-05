import { defineComponent } from "vue"

import VueDraggable from "vuedraggable"
import { Container, SlotProp, Widget } from "../Widget"
import { template_unknown, type_render_functions, preview_container } from "./Template"

const TemplateDraggable = defineComponent({
    props: {
        preview: { type: Boolean, required: true },
        data: { type: Array, default: () => [], required: true },
        select_item: {type: Function, required: true},
        selected_item: {type: Widget}
    },
    components: {
        VueDraggable
    },
    setup(props, _) {
        const group_data = props.preview ? {name: 'editor', pull: 'clone', put: false} : {name: "editor"}
        const sort_data = !props.preview
        const slots_data = {
            item: (props: { element: Widget, index: number }): JSX.Element => {
                let element = props.element
                if (element.is_container()) {
                    let container = element as Container
                    if (element.is_form()) {
                        let form_prop = container.form_prop
                        return (
                            <form method={form_prop.method} action={form_prop.url}>
                                {function_draggable_inner(container)}
                            </form>
                        )
                    } else {
                        return function_draggable_inner(container)
                    }
                } else {
                    const render = type_render_functions[element.type] || template_unknown
                    return (
                        <div class={`template-item`} id={element.id}>
                            {render(element.node_prop)}
                        </div>
                    )
                }
            }
        }

        const function_clone_item = (widget: Widget): Widget => widget.clone()

        const function_draggable_inner = (container: Container) => {
            if (props.preview) {
                return preview_container(container)
            } else {
                return (
                    <div class={`template-container mdui-container-fluid`}>
                        {container.children.map((slot: SlotProp, index: number) => {
                            let children = slot.children
                            return (
                                <div class={`template-slot mdui-col-xs-${slot.size}`} id={`${container.id}-${index}`}>
                                    <TemplateDraggable preview={false} data={children} select_item={props.select_item} selected_item={props.selected_item}/>
                                </div>
                            )
                        })}
                    </div>
                )
            }
        }

        return () => (
            <VueDraggable list={props.data} sort={sort_data} group={group_data} clone={function_clone_item} v-slots={slots_data} item-key="id"/>
        )
    },
})

export default TemplateDraggable;