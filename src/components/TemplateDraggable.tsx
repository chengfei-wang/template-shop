import { defineComponent, PropType } from "vue"

import VueDraggable from "vuedraggable"
import { Container, SlotProp, Widget } from "../Widget"
import { template_unknown, type_render_functions, preview_container } from "./Template"

const TemplateDraggable = defineComponent({
    props: {
        preview: { type: Boolean, required: true },
        data: { type: Array as PropType<Widget[]>, default: () => [], required: true },
        select_item: { type: Function as PropType<(widget?: Widget) => void>, required: true },
        selected_item: { type: Object as PropType<Widget> }
    },
    components: {
        VueDraggable
    },
    setup(props, _) {
        if (props.preview) {
            const slots_data = {
                item: (slot_props: { element: Widget, index: number }): JSX.Element => {
                    let element = slot_props.element
                    if (element.is_container()) {
                        return preview_container(element as Container)
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

            const attr_data = {
                sort: false,
                group: { name: 'editor', pull: 'clone', put: false },
                clone: (widget: Widget): Widget => widget.clone()
            }

            return () => (
                <VueDraggable list={props.data} v-slots={slots_data} item-key="id" {...attr_data} />
            )
        } else {
            const group_data = { name: "editor" }
            const sort_data = true
            const slots_data = {
                item: (slot_props: { element: Widget, index: number }): JSX.Element => {
                    let element = slot_props.element
                    const selected_class = props.selected_item?.id == element.id ? 'template-selected' : ''
                    if (element.is_container()) {
                        return function_draggable_inner(element as Container, selected_class)
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

            const function_draggable_inner = (container: Container, selected_class: string) => {
                return (
                    <div class={`template-container mdui-container-fluid ${selected_class}`} onClick={(e) => { props.select_item(container); e.stopPropagation() }}>
                        {container.children.map((slot: SlotProp, index: number) => {
                            return (
                                <div id={`${container.id}-${index}`}>
                                    <TemplateDraggable class={`template-slot mdui-col-xs-${slot.size}`} preview={false} data={slot.children} select_item={props.select_item} selected_item={props.selected_item} />
                                </div>
                            )
                        })}
                    </div>
                )
            }

            const attr_data = {
                sort: sort_data,
                group: group_data,
                animation: 200
            }
            return () => (
                <VueDraggable list={props.data} v-slots={slots_data} item-key="id" {...attr_data} />
            )
        }
    },
})

export default TemplateDraggable;