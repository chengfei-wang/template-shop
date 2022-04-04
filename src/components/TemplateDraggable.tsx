import { defineComponent } from "vue"

import VueDraggable from "vuedraggable"
import { Container, SlotProp, Widget } from "../Widget"
import { template_unknown, type_render_functions } from "./Template"

const function_clone_item = (widget: Widget): Widget => widget.clone()

const function_draggable_inner = (container: Container) => {
    return (
        <div class={`template-container mdui-container-fluid`}>
            {container.children.map((slot: SlotProp, index: number) => {
                let children = slot.children
                return (
                    <div class={`template-slot mdui-col-xs-${slot.size}`} id={`${container.id}-${index}`}>
                        <TemplateDraggable source={false} data={children}></TemplateDraggable>
                    </div>
                )
            })}
        </div>
    )
}

const slots = {
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

const TemplateDraggable = defineComponent({
    props: {
        source: { type: Boolean },
        data: { type: Array, default: () => [] }
    },
    setup(props, _) {
        const group_data = props.source ? { name: 'editor', pull: 'clone', put: false } : { name: 'editor' }

        return () => (
            <VueDraggable list={props.data} clone={function_clone_item} v-slots={slots} item-key="id"></VueDraggable>
        )
    }
})

export default TemplateDraggable;