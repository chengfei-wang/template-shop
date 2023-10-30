import { ElSwitch } from "element-plus";
import { defineComponent } from "vue";
import { ControlListItem } from "./ControlListItem";

const ConfigPanelRoot = defineComponent({
    name: "ConfigPanelRoot",
    props: {
        headerOn: Boolean,
        footerOn: Boolean,
    },
    emits: ["headerOn", "footerOn"],
    setup(props, ctx) {
        return () => (
            <>
                <ControlListItem title='应用栏'>
                    <ElSwitch value={props.headerOn} onChange={() => { ctx.emit('headerOn') }}></ElSwitch>
                </ControlListItem>

                <ControlListItem title='导航栏'>
                    <ElSwitch value={props.footerOn} onChange={() => { ctx.emit('footerOn') }}></ElSwitch>
                </ControlListItem>
            </>
        )
    }
})

export default ConfigPanelRoot;