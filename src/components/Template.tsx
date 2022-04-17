import { ElInput } from "element-plus";
import { defineComponent, PropType } from "vue";
import { Widget, ClassProp, FormProp, SlotProp, random_id } from "../Widget";
import ControlListItem from "./ControlListItem.vue";
import { ListItemEdit } from "./ListItemEdit";

function create_class_list(init: string[], prop?: ClassProp): string[] {
    let classList = Array.from(init)

    if (prop != undefined) {
        if (prop.backgroundColor != undefined) {
            classList.push(prop.backgroundColor)
        }
        if (prop.textColor != undefined) {
            classList.push(prop.textColor)
        }
        if (prop.textSize != undefined) {
            classList.push(prop.textSize)
        }
        if (prop.textAlign != undefined) {
            classList.push(prop.textAlign)
        }
    }

    return classList
}

export interface TemplateWidget<T = any> {
    name: string
    preview: JSX.Element
    template: () => Widget
    editor_view: (content: Widget) => JSX.Element
    release_view: (content: Widget) => JSX.Element
    universal_prop?: () => T
    configuration?: (widget: Widget) => JSX.Element
}

const unknown: TemplateWidget = {
    name: "UNKNOWN",
    preview: <div>未知组件</div>,
    template: () => {
        return { id: random_id(), type: "UNKNOWN", node_prop: {}, children: [], form_prop: {} }
    },
    editor_view: (content: Widget) => {
        return <div>未知组件</div>
    },
    release_view: (content: Widget) => {
        return <div>未知组件</div>
    }
}

export const button: TemplateWidget = {
    name: "BUTTON",
    preview: (<button class='template-item template-default-button'>普通按钮</button>),
    template: () => {
        return { id: random_id(), type: 'BUTTON', node_prop: {}, children: [], form_prop: {} }
    },
    editor_view: (content: Widget) => {
        const prop = content.node_prop
        if (prop.content == undefined) {
            prop.content = '普通按钮'
        }
        let classList: string[] = create_class_list(['template-item', 'template-default-button'], prop.clazz)
        return (<button class={classList}>{prop.content}</button>)
    },
    release_view: (content: Widget) => {
        const prop = content.node_prop
        if (prop.content == undefined) {
            prop.content = '普通按钮'
        }
        let classList: string[] = create_class_list(['template-item', 'template-default-button'], prop.clazz)
        return (<button class={classList} disabled>{prop.content}</button>)
    }
}

export const text_single: TemplateWidget = {
    name: "TEXT_SINGLE",
    preview: (<p class='template-item template-default-text-single mdui-text-center'>单行文本</p>),
    template: () => {
        return { id: random_id(), type: 'TEXT_SINGLE', node_prop: {}, children: [], form_prop: {} }
    },
    editor_view: (content: Widget) => {
        const prop = content.node_prop
        if (prop.content == undefined) {
            prop.content = '单行文本'
        }
        let classList: string[] = create_class_list(['template-item', 'template-default-text-single'], prop.clazz)
        return (<p class={classList} style={prop.styles}>{prop.content}</p>)
    },
    release_view: (content: Widget) => {
        const prop = content.node_prop
        if (prop.content == undefined) {
            prop.content = '单行文本'
        }
        let classList: string[] = create_class_list(['template-item', 'template-default-text-single'], prop.clazz)
        return (<p class={classList} style={prop.styles}>{prop.content}</p>)
    }
}

export const text_multi: TemplateWidget = {
    name: "TEXT_MULTI",
    preview: (<p class='template-item template-default-text-multi mdui-text-center'>多行文本<br />多行文本</p>),
    template: () => {
        return { id: random_id(), type: 'TEXT_MULTI', node_prop: {}, children: [], form_prop: {} }
    },
    editor_view: (content: Widget) => {
        const prop = content.node_prop
        if (prop.content == undefined) {
            prop.content = '多行文本'
        }
        let classList: string[] = create_class_list(['template-item', 'template-default-text-multi'], prop.clazz)
        return (<p class={classList} style={prop.styles}>{prop.content}</p>)
    },
    release_view: (content: Widget) => {
        const prop = content.node_prop
        if (prop.content == undefined) {
            prop.content = '多行文本'
        }
        let classList: string[] = create_class_list(['template-item', 'template-default-text-multi'], prop.clazz)
        return (<p class={classList} style={prop.styles}>{prop.content}</p>)
    }
}


export const input: TemplateWidget = {
    name: "INPUT",
    preview: (<input class='template-item template-default-input' placeholder='默认文本框' type='text' disabled />),
    template: () => {
        return { id: random_id(), type: 'INPUT', node_prop: {}, children: [], form_prop: {} }
    },
    editor_view: (content: Widget) => {
        const prop = content.node_prop
        if (prop.content == undefined) {
            prop.content = '默认文本框'
        }

        if (prop.type == undefined) {
            prop.type = 'text'
        }

        let classList: string[] = create_class_list(['template-item', 'template-default-input'], prop.clazz)

        return (<input type={prop.type} class={classList} name={prop.name} placeholder={prop.content} disabled />)
    },
    release_view: (content: Widget) => {
        const prop = content.node_prop
        if (prop.content == undefined) {
            prop.content = '请输入文本'
        }

        if (prop.type == undefined) {
            prop.type = 'text'
        }

        let classList: string[] = create_class_list(['template-item', 'template-default-input'], prop.clazz)

        return (<input type={prop.type} class={classList} name={prop.name} placeholder={prop.content} />)
    }
}

export const checkbox: TemplateWidget = {
    name: "CHECKBOX",
    preview: (
        <div class='template-item'>
            <label class='mdui-checkbox'>
                <input type='checkbox' disabled />
                <i class='mdui-checkbox-icon' />
                多选框
            </label>
        </div>
    ),
    template: () => { return { id: random_id(), type: 'CHECKBOX', node_prop: {}, children: [], form_prop: {} } },
    editor_view: (content: Widget) => {
        let prop = content.node_prop
        if (prop.content == undefined) prop.content = '多选框'
        if (prop.name == undefined) prop.name = 'default_checkbox_group'

        let classList: string[] = create_class_list(['template-item'], prop.clazz)

        return (
            <div class={classList}>
                <label class='mdui-checkbox'>
                    <input type='checkbox' name={prop.name} value={prop.content} disabled />
                    <i class='mdui-checkbox-icon' />
                    {prop.content}
                </label>
            </div>
        );

    },
    release_view: (content: Widget) => {
        let prop = content.node_prop
        if (prop.content == undefined) prop.content = '多选框'
        if (prop.name == undefined) prop.name = 'default_checkbox_group'

        let classList: string[] = create_class_list(['template-item'], prop.clazz)

        return (
            <div class={classList}>
                <label class='mdui-checkbox'>
                    <input type='checkbox' name={prop.name} value={prop.content} />
                    <i class='mdui-checkbox-icon' />
                    {prop.content}
                </label>
            </div>
        );
    }
}


export const radio: TemplateWidget = {
    name: "RADIO",
    preview: (
        <div class='template-item'>
            <label class='mdui-radio'>
                <input type='radio' disabled />
                <i class='mdui-radio-icon' />
                单选框
            </label>
        </div>
    ),
    template: () => { return { id: random_id(), type: 'RADIO', node_prop: {}, children: [], form_prop: {} } },
    editor_view: (content: Widget) => {
        let prop = content.node_prop
        if (prop.content == undefined) {
            prop.content = '单选框'
        }

        if (prop.name == undefined) {
            prop.name = 'default_radio_group'
        }

        let classList: string[] = create_class_list(['template-item'], prop.clazz)

        return (
            <div class={classList}>
                <label class='mdui-radio'>
                    <input type='radio' name={prop.name} value={prop.content} disabled />
                    <i class='mdui-radio-icon' />
                    {prop.content}
                </label>
            </div>
        )
    },
    release_view: (content: Widget) => {
        let prop = content.node_prop
        if (prop.content == undefined) {
            prop.content = '单选框'
        }

        if (prop.name == undefined) {
            prop.name = 'default_radio_group'
        }

        let classList: string[] = create_class_list(['template-item'], prop.clazz)

        return (
            <div class={classList}>
                <label class='mdui-radio'>
                    <input type='radio' name={prop.name} value={prop.content} />
                    <i class='mdui-radio-icon' />
                    {prop.content}
                </label>
            </div>
        )
    }
}

export const image: TemplateWidget = {
    name: "IMAGE",
    preview: (
        <div>
            <img class='template-item' src='/thumbnail.png' alt='图片' />
            <div class='template-image-title'>图片标题</div>
        </div>
    ),
    template: () => {
        return { id: random_id(), type: 'IMAGE', node_prop: {}, children: [], form_prop: {} }
    },
    editor_view: (content: Widget) => {
        let prop = content.node_prop
        let classList: string[] = create_class_list(['template-item'], prop.clazz)
        if (prop.url === undefined || prop.url.length === 0) {
            prop.url = '/thumbnail.png'
        }
        if (prop.content === undefined || prop.content.length === 0) {
            return (
                <div>
                    <img class={classList} src={prop.url} alt='图片' />
                </div>
            )
        } else {
            return (
                <div>
                    <img class={classList} src={prop.url} alt='图片' />
                    <div class={['template-image-title', ...classList]}>{prop.content}</div>
                </div>
            )
        }
    },
    release_view: (content: Widget) => {
        let prop = content.node_prop
        let classList: string[] = create_class_list(['template-item'], prop.clazz)
        if (prop.url == undefined || prop.url.length == 0) {
            prop.url = '/thumbnail.png'
        }
        if (prop.content === undefined || prop.content.length === 0) {
            return (
                <div>
                    <img class={classList} src={prop.url} alt='图片' />
                </div>
            )
        } else {
            return (
                <div>
                    <img class={classList} src={prop.url} alt='图片' />
                    <div class={['template-image-title', ...classList]}>{prop.content}</div>
                </div>
            )
        }
    }
}

export const divider: TemplateWidget = {
    name: "DIVIDER",
    preview: (
        <div class='template-item template-divider'>分割线</div>
    ),
    template: () => { return { id: random_id(), type: 'DIVIDER', node_prop: {}, children: [], form_prop: {} } },
    editor_view: (content: Widget) => {
        let prop = content.node_prop
        let classList: string[] = create_class_list(['template-item'], prop.clazz)
        return (
            <div class={classList}>
                <div class='template-item template-divider'>{prop.content}</div>
            </div>
        )
    },
    release_view: (content: Widget) => {
        let prop = content.node_prop
        let classList: string[] = create_class_list(['template-item'], prop.clazz)
        return (
            <div class={classList}>
                <div class='template-item template-divider'>{prop.content}</div>
            </div>
        )
    }
}

export const container: TemplateWidget = {
    name: "CONTAINER",
    preview: (
        <div class="template-item template-container mdui-container-fluid">
            <div class='template-slot mdui-col-xs-6'>
                <p class='template-default-text-single mdui-text-center'>容器插槽</p>
            </div>
            <div class='template-slot mdui-col-xs-6'>
                <p class='template-default-text-single mdui-text-center'>容器插槽</p>
            </div>
        </div>
    ),
    template: () => {
        return { id: random_id(), type: 'CONTAINER', node_prop: {}, children: [{ size: 6, children: [] }, { size: 6, children: [] }], form_prop: {} }
    },
    editor_view: (content: Widget) => {
        return (
            <div class="template-item template-container mdui-container-fluid">
                <div class='template-slot mdui-col-xs-6'>
                    <p class='template-default-text-single mdui-text-center'>容器插槽</p>
                </div>
                <div class='template-slot mdui-col-xs-6'>
                    <p class='template-default-text-single mdui-text-center'>容器插槽</p>
                </div>
            </div>
        )
    },
    release_view: (content: Widget) => {
        let children: SlotProp[] = content.children

        let items = children.map((child: SlotProp, index: number) => {
            return (
                <div class={`template-slot-release mdui-col-xs-${child.size}`} id={`${content.id}-${index}`}>
                    {
                        child.children.map(
                            (widget: Widget) => {
                                let render = template_render_function(widget)
                                return render.release_view(widget)
                            }
                        )
                    }
                </div>
            )
        })

        return (
            <div class="mdui-container-fluid template-container-release" id={content.id}>
                {items}
            </div>
        )
    }
}

export const form: TemplateWidget = {
    name: "FORM",
    preview: (
        <div class="template-item template-container mdui-container-fluid">
            <div class='template-slot mdui-col-xs-12'>
                <p class='template-default-text-single mdui-text-center'>表单组件</p>
            </div>
        </div>
    ),
    template: () => {
        return { id: random_id(), type: 'FORM', node_prop: {}, children: [{ size: 12, children: [] }], form_prop: { method: 'POST', url: '' } }
    },
    editor_view: (content: Widget) => {
        return (
            <div class="template-item template-container mdui-container-fluid">
                <div class='template-slot mdui-col-xs-6'>
                    <p class='template-default-text-single mdui-text-center'>容器插槽</p>
                </div>
                <div class='template-slot mdui-col-xs-6'>
                    <p class='template-default-text-single mdui-text-center'>容器插槽</p>
                </div>
            </div>
        )
    },
    release_view: (content: Widget) => {
        let form_prop: FormProp = content.form_prop

        let children: SlotProp[] = content.children

        let items = children.map((child: SlotProp, index: number) => {
            return (
                <div class={`template-slot-release mdui-col-xs-${child.size}`} id={`${content.id}-${index}`}>
                    <div>
                        {
                            child.children.map(
                                (widget: Widget) => {
                                    let render = template_render_function(widget)
                                    return render.release_view(widget)
                                }
                            )
                        }
                    </div>
                </div>
            )
        })
        return (
            <form method={form_prop.method} action={form_prop.url} onSubmit={() => false}>
                <div class="mdui-container-fluid template-container-release" id={content.id}>
                    {items}
                </div>
            </form>
        )
    }
}

export const radio_group: TemplateWidget<{
    options: {
        label: string
        value: string
    }[],
}> = {
    universal_prop() {
        return {
            options: [
                { label: "Option 1", value: "option1" },
                { label: "Option 2", value: "option2" },
                { label: "Option 3", value: "option3" }
            ]
        }
    },

    configuration: (widget) => {
        const universal_prop = widget.universal_prop
        let item_slot = {
            item: (props: { element: { label: string, value: string }, index: number }) => {
                return (
                    <div class='mdui-container-fluid'>
                        <ElInput v-model={props.element.value} placeholder='选项' class='mdui-col-xs-12'></ElInput>
                    </div>
                )
            },
            add_item: () => {
                universal_prop.options.push({ label: "", value: "" })
            },
            remove_item: (index: number) => {
                universal_prop.options.splice(index, 1)
            }
        }

        return (
            <div>
                <ControlListItem title="字段名称">
                    <ElInput v-model={widget.node_prop.name}></ElInput>
                </ControlListItem>
                <ControlListItem title="选项列表" vertical={true}>
                    <ListItemEdit items={widget.universal_prop.options} item_slot={item_slot}></ListItemEdit>
                </ControlListItem>
            </div>
        )
    },
    name: "RADIO_GROUP",
    preview: (
        <div class='mdui-container-fluid'>
            <label class="mdui-col-xs-12 mdui-radio">
                <input type="radio" name='radio-group-demo' value='' disabled />
                <i class="mdui-radio-icon"></i>
                Option 1
            </label>
            <label class="mdui-col-xs-12 mdui-radio">
                <input type="radio" name='radio-group-demo' value='' disabled />
                <i class="mdui-radio-icon"></i>
                Option 1
            </label>
            <label class="mdui-col-xs-12 mdui-radio">
                <input type="radio" name='radio-group-demo' value='' disabled />
                <i class="mdui-radio-icon"></i>
                Option 1
            </label>
        </div>
    ),
    template() {
        return {
            id: random_id(),
            type: "RADIO_GROUP",
            node_prop: { name: "radio-group-demo", content: "多选框" },
            children: [],
            form_prop: {},
            universal_prop: this.universal_prop?.()
        }
    },
    editor_view: function (content: Widget): JSX.Element {
        const classList = create_class_list(['template-item'], content.node_prop.clazz)
        return (
            <div class={classList}>
                <div class="template-default-text-single">
                    {content.node_prop.content}
                </div>
                {content.universal_prop.options.map((option: { label: string, value: string }, index: number) => {
                    return (
                        <div>
                            <label class="mdui-radio">
                                <input type="radio" name={content.node_prop.name} value={option.value} disabled />
                                <i class="mdui-radio-icon"></i>
                                {option.value}
                            </label>
                        </div>
                    )
                })}
            </div>
        )
    },
    release_view: function (content: Widget): JSX.Element {
        const classList = create_class_list(['template-item'], content.node_prop.clazz)
        return (
            <div class={classList}>
                <div class="template-default-text-single">
                    {content.node_prop.content}
                </div>
                {content.universal_prop.options.map((option: { label: string, value: string }, index: number) => {
                    return (
                        <div>
                            <label class="mdui-radio">
                                <input type="radio" name={content.node_prop.name} value={option.value} />
                                <i class="mdui-radio-icon"></i>
                                {option.value}
                            </label>
                        </div>
                    )
                })}
            </div>
        )
    }
}


export const templates: TemplateWidget[] = [
    button,
    input,
    text_single,
    text_multi,
    checkbox,
    radio,
    image,
    divider,
    container,
    form,
    radio_group,
]

export const template_render: { [key: string]: TemplateWidget } = {
    "UNKNOWN": unknown,
    "BUTTON": button,
    "INPUT": input,
    "TEXT_SINGLE": text_single,
    "TEXT_MULTI": text_multi,
    "CHECKBOX": checkbox,
    "RADIO": radio,
    "IMAGE": image,
    "DIVIDER": divider,
    "CONTAINER": container,
    "FORM": form,
    "RADIO_GROUP": radio_group,
}

export function template_render_function(widget: Widget): TemplateWidget {
    return template_render[widget.type] || unknown
}

export const UniversalPropEditor = defineComponent({
    name: "UniversalPropEditor",
    props: {
        selected_item: {
            type: Object as PropType<Widget>,
            required: true
        }
    },
    setup(props) {
        return () => (
            <>
                {template_render_function(props.selected_item).configuration?.(props.selected_item)}
            </>
        )
    }
})