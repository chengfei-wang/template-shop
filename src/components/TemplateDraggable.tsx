import { defineComponent, PropType } from "vue"
import { TemplateWidget, templates, template_render_function } from "./Template"
import VueDraggable from "vuedraggable"
import { SlotProp, Widget, widget_is_container } from "../Widget"

export const TemplateDraggable = defineComponent({
    name: "TemplateDraggable",
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
        const group_data = { name: "editor" }
        const sort_data = true
        const slots_data = {
            item: (slot_props: { element: Widget, index: number }): JSX.Element => {
                let element = slot_props.element
                const selected_class = props.selected_item?.id == element.id ? 'template-selected' : ''
                if (widget_is_container(element)) {
                    return function_draggable_inner(element, selected_class)
                } else {
                    const render = template_render_function(element)
                    return (
                        <div class={`template-item ${selected_class}`} id={element.id} onClick={(e) => { props.select_item(element); e.stopPropagation() }}>
                            {render.editor_view(element)}
                        </div>
                    )
                }
            }
        }

        const function_draggable_inner = (container: Widget, selected_class: string) => {
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
    },
})

export const TemplateDraggableSource = defineComponent({
    name: "TemplateDraggableSource",
    components: {
        VueDraggable
    },
    setup() {
        const slots_data = {
            item: (slot_props: { element: TemplateWidget, index: number }): JSX.Element => {
                let element = slot_props.element
                return element.preview
            }
        }

        const attr_data = {
            sort: false,
            group: { name: 'editor', pull: 'clone', put: false },
            clone: (element: TemplateWidget) => element.template()
        }

        return () => (
            <VueDraggable list={templates} item-key='name' v-slots={slots_data} {...attr_data} />
        )
    }
})