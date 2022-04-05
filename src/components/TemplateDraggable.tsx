import { defineComponent } from "vue"

import VueDraggable from "vuedraggable"
import { Container, SlotProp, Widget } from "../Widget"
import { template_unknown, type_render_functions, preview_container } from "./Template"

const TemplateDraggable = defineComponent({
    props: {
        preview: { type: Boolean, required: true },
        data: { type: Array, default: () => [], required: true },
        select_item: { type: Function, required: true },
        selected_item: { type: Widget }
    },
    components: {
        VueDraggable
    },
    setup(props, _) {
        const group_data = props.preview ? { name: 'editor', pull: 'clone', put: false } : { name: "editor" }
        const sort_data = !props.preview
        const slots_data = {
            item: (slot_props: { element: Widget, index: number }): JSX.Element => {
                let element = slot_props.element
                const selected_class = props.selected_item?.id == element.id ? 'template-selected' : ''
                if (element.is_container()) {
                    let container = element as Container
                    if (element.is_form()) {
                        let form_prop = container.form_prop
                        return (
                            <form method={form_prop.method} action={form_prop.url}>
                                {function_draggable_inner(container, selected_class)}
                            </form>
                        )
                    } else {
                        return function_draggable_inner(container, selected_class)
                    }
                } else {
                    const render = type_render_functions[element.type] || template_unknown
                    return (
                        <div class={`template-item ${selected_class}`} id={element.id} onClick={(e) => { props.select_item(element); e.stopPropagation() }}>
                            {render(element.node_prop)}
                        </div>
                    )
                }
            }
        }

        const function_clone_item = (widget: Widget): Widget => widget.clone()

        const function_draggable_inner = (container: Container, selected_class: string) => {
            if (props.preview) {
                return preview_container(container)
            } else {
                return (
                    <div class={`template-container mdui-container-fluid ${selected_class}`} onClick={(e) => { props.select_item(container); e.stopPropagation() }}>
                        {container.children.map((slot: SlotProp, index: number) => {
                            let children = slot.children
                            return (
                                <div class={`template-slot mdui-col-xs-${slot.size}`} id={`${container.id}-${index}`}>
                                    <TemplateDraggable preview={props.preview} data={children} select_item={props.select_item} selected_item={props.selected_item} />
                                </div>
                            )
                        })}
                    </div>
                )
            }
        }

        const attr_data = {
            sort: sort_data,
            group: group_data,
            clone: props.preview ? function_clone_item : undefined
        }

        return () => (
            <VueDraggable list={props.data} v-slots={slots_data} item-key="id" {...attr_data} />
        )
    },
})

export default TemplateDraggable;