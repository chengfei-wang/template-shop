
import { ElInput, ElRadioButton, ElRadioGroup } from "element-plus";
import { defineComponent } from "vue";
import ControlListItem from "./ControlListItem.vue";

const ConfigPanelRoot = defineComponent({
    name: "ConfigPanelRoot",
    props: {
        // prop of is-header-on
        isHeaderOn: { type: Boolean, required: true },
        //prop of is-footer-on
        isFooterOn: { type: Boolean, required: true },
    },
    emits: ["headerOn", "footerOn"],
    setup(props, ctx) {
        return () => (
            <div class=''>
                <ControlListItem title='应用栏'>
                    <ElRadioGroup>
                        <ElRadioButton label='显示' value={true} onInput={() => { ctx.emit("headerOn") }} />
                        <ElRadioButton label='隐藏' value={false} onInput={() => { ctx.emit("headerOn") }} />
                    </ElRadioGroup>

                </ControlListItem>
                <ElInput></ElInput>
                <div class='style_editor_group'>
                    <p>开启Header</p>
                    <div class={'mdui-text-center'}>
                        <label class="mdui-switch">
                            <input type='checkbox' checked={props.isHeaderOn} onChange={() => { ctx.emit('headerOn') }} />
                            <i class="mdui-switch-icon"></i>
                        </label>
                    </div>
                </div>

                <div class='style_editor_group'>
                    <p>开启Footer</p>
                    <div class={'mdui-text-center'}>
                        <label class="mdui-switch">
                            <input type='checkbox' checked={props.isFooterOn} onChange={() => { ctx.emit('footerOn') }} />
                            <i class="mdui-switch-icon"></i>
                        </label>
                    </div>
                </div>
            </div>
        )
    }
})

export default ConfigPanelRoot;