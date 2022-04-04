import { Widget, Container, ClassProp, NodeProp, FormProp, SlotProp } from "../Widget";

function create_class_list(init: Array<string>, prop?: ClassProp): Array<string> {
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

export function template_p(prop: NodeProp): JSX.Element {
    if (prop.content == undefined) {
        prop.content = '单行文本'
    }

    let classList: Array<string> = create_class_list(['template-item', 'template-default-p'], prop.clazz)

    return (<p class={classList} style={prop.styles}>{prop.content}</p>);
}

export function template_input(prop: NodeProp): JSX.Element {
    if (prop.content == undefined) {
        prop.content = '请输入文本'
    }

    let classList: Array<string> = create_class_list(['template-item', 'mdui-textfield-input'], prop.clazz)

    return (<input type='text' class={classList} name={prop.name} placeholder={prop.content} />)
}

export function template_button(prop: NodeProp): JSX.Element {
    if (prop.content == undefined) {
        prop.content = '普通按钮'
    }

    let classList: Array<string> = create_class_list(['template-item', 'template-default-button'], prop.clazz)

    return (<button class={classList}>{prop.content}</button>)
}

export function template_checkbox(prop: NodeProp) {
    if (prop.content == undefined) {
        prop.content = '多选框'
    }

    if (prop.name == undefined) {
        prop.name = 'default_checkbox_group'
    }

    let classList: Array<string> = create_class_list(['template-item'], prop.clazz)

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

export function template_radio(prop: NodeProp): JSX.Element {
    if (prop.content == undefined) {
        prop.content = '单选框'
    }

    if (prop.name == undefined) {
        prop.name = 'default_radio_group'
    }

    let classList: Array<string> = create_class_list(['template-item'], prop.clazz)

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

export function template_container(prop: NodeProp): JSX.Element {
    return (<div>容器组件</div>)
}

export function template_unknown(prop: NodeProp): JSX.Element {
    return (<div>未知组件{prop}</div>)
}

export const type_render_functions: { [key: string]: (prop: NodeProp) => JSX.Element } = {
    'P': template_p,
    'INPUT': template_input,
    'BUTTON': template_button,
    'CHECKBOX': template_checkbox,
    'RADIO': template_radio,
    'CONTAINER': template_container,
}

// function preview_form(container: Container): JSX.Element {
//     let form_prop: FormProp = container.form_prop
//     let children: SlotProp[] = container.children

//     let items = children.map((child: SlotProp, index: number) => {
//         return (
//             <div class={`templat-slot mdui-col-xs-${child.size}`} id={`${container.id}-${index}`}>
//                 {preview_page(child.children)}
//             </div>
//         )
//     })
//     return (
//         <form method={form_prop.method} action={form_prop.url}>
//             <div class="template-item mdui-container-fluid" id={container.id}>
//                 {items}
//             </div>
//         </form>
//     )
// }

function preview_container(container: Container): JSX.Element {
    let children: SlotProp[] = container.children

    let items = children.map((child: SlotProp, index: number) => {
        return (
            <div class={`template-slot mdui-col-xs-${child.size}`} id={`${container.id}-${index}`}>
                {preview_page(child.children)}
            </div>
        )
    })

    return (
        <div class="template-container template-item mdui-container-fluid" id={container.id}>
            {items}
        </div>
    )
}

export function preview_page(widgets: Widget[]): JSX.Element {
    return (
        <div>
            {widgets.map((widget: Widget) => {
                if (widget.is_container()) {
                    let container: Container = widget as Container
                    if (widget.is_form()) {
                        let form_prop: FormProp = container.form_prop
                        return (
                            <form method={form_prop.method} action={form_prop.url}>
                                {preview_container(container)}
                            </form>
                        )
                    } else {
                        return preview_container(widget as Container)
                    }
                } else {
                    let render = type_render_functions[widget.type] || template_unknown
                    return render(widget.node_prop)
                }
            })}
        </div>
    )
}