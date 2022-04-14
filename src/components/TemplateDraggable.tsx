import { defineComponent, PropType } from "vue"
import { TemplateWidget, templates, template_render_function } from "./Template"
import VueDraggable from "vuedraggable"
import { SlotProp, Widget, widget_is_container } from "../Widget"

export const TemplateDraggable = defineComponent({
    name: "TemplateDraggable",
    props: {
        data: { type: Array as PropType<Widget[]>, default: () => [], required: true },
        select_item: { type: Function as PropType<(widget?: Widget) => void>, required: true },
        selected_item: { type: Object as PropType<Widget> }
    },
    components: {
        VueDraggable
    },
    setup(props, _) {
        const group_data = { name: "editor" }
        const slots_data = {
            item: (slot_props: { element: Widget, index: number }): JSX.Element => {
                let element = slot_props.element
                const selected_class = props.selected_item?.id == element.id ? 'template-selected' : ''
                if (widget_is_container(element)) {
                    return (
                        <div class={`template-container mdui-container-fluid ${selected_class}`} onClick={(e) => { props.select_item(element); e.stopPropagation() }}>
                            {element.children.map((slot_prop: SlotProp, index: number) => {
                                return (
                                    <div id={`${element.id}-${index}`}>
                                        <TemplateDraggable class={`template-slot mdui-col-xs-${slot_prop.size}`} data={slot_prop.children} select_item={props.select_item} selected_item={props.selected_item} />
                                    </div>
                                )
                            })}
                        </div>
                    )
                } else {
                    return (
                        <div class={`template-item ${selected_class}`} id={element.id} onClick={(e) => { props.select_item(element); e.stopPropagation() }}>
                            {template_render_function(element).editor_view(element)}
                        </div>
                    )
                }
            }
        }

        const attr_data = {
            group: group_data,
            animation: 200,
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
                return <div class='template-preview'>{element.preview}</div>
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

export const TemplateDraggableTrash = defineComponent({
    name: "TemplateDraggableTrash",
    components: {
        VueDraggable
    },
    setup() {
        const slots_data = {
            item: (slot_props: { element: TemplateWidget, index: number }): JSX.Element => {
                return <></>
            }
        }

        const attr_data = {
            group: { name: 'editor' },
        }

        return () => (
            <VueDraggable list={[]} item-key="id" v-slots={slots_data} {...attr_data} />
        )
    }
})