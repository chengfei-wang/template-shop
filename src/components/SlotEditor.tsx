import { ElButton, ElInputNumber } from "element-plus";
import mdui from "mdui";
import { defineComponent, PropType } from "vue";
import VueDraggable from 'vuedraggable';
import { SlotProp } from "../Widget";

const SlotEditor = defineComponent({
    name: "SlotEditor",
    components: {
        VueDraggable
    },
    props: {
        container_slot: {
            type: Array as PropType<SlotProp[]>,
            default: () => [], required: true
        },
    },
    methods: {

    },
    setup(props) {
        const add_container_slot = (size: number = 6) => {
            props.container_slot.push(
                {
                    size: size,
                    children: []
                }
            )
        }
        const remove_container_slot = (index: number) => {
            if (props.container_slot[index].children.length > 0) {
                mdui.snackbar({
                    message: "删除前请先清空子项",
                    position: "bottom",
                })
            } else {
                props.container_slot.splice(index, 1)
            }
        }
        const update_container_slot = (index: number, size: number) => {
            props.container_slot[index].size = size
        }
        const slots_data = {
            item: (slot_props: { element: SlotProp, index: number }): JSX.Element => {
                let slot = slot_props.element
                return (
                    <div class='mdui-list-item'>
                        <i class='mdui-list-item-icon mdui-icon material-icons slot-control-item-handle'>format_line_spacing</i>
                        <div class='mdui-list-item-content'>
                            <ElInputNumber v-model={slot.size} min={1} max={12} onChange={(value) => update_container_slot(slot_props.index, value || 6)}></ElInputNumber>
                        </div>
                        <i class='mdui-list-item-icon mdui-icon material-icons' onClick={() => remove_container_slot(slot_props.index)}>remove_circle</i>
                    </div>
                )
            },
            footer: (): JSX.Element => {
                return (
                    <ElButton style='width: 100%;' onClick={() => add_container_slot()}>添加插槽</ElButton>
                )
            }
        }

        const slot_attrs = {
            handle: '.slot-control-item-handle',
            animation: 200,
        }

        return () => (
            <div class='mdui-list mdui-list-dense'>
                <VueDraggable list={props.container_slot} itemKey='id' v-slots={slots_data} {...slot_attrs}></VueDraggable>
            </div>
        )
    }
})

export default SlotEditor;