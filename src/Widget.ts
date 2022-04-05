export function randomId(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    const len = chars.length
    let s = ''
    for (let i = 0; i < 32; i++) {
        s += chars.charAt(Math.floor(Math.random() * len))
    }
    return s
}

export class SlotProp {
    size: number

    children: Array<Widget>

    constructor(size: number = 12, children: Array<Widget> = []) {
        this.size = size
        this.children = children
    }

    clone(): SlotProp {
        return new SlotProp(this.size)
    }

    static clone_props(props: Array<SlotProp>): Array<SlotProp> {
        return props.map(value => value.clone())
    }
}

export class FormProp {
    method: string
    url: string

    constructor(method: string = 'POST', url: string = '') {
        this.method = method
        this.url = url
    }
}

export class Widget {
    id: string
    type: string
    node_prop: NodeProp

    constructor(id: string, type: string, node_prop: NodeProp) {
        this.id = id
        this.type = type
        this.node_prop = node_prop
    }

    clone(): Widget {
        let widget = new Widget(randomId(), this.type, new NodeProp())
        console.log(widget)
        return widget
    }

    is_container(): boolean {
        return this.type === 'CONTAINER' || this.type === 'FORM'
    }

    is_form(): boolean {
        return this.type === 'FORM'
    }
}

export class Container extends Widget {
    children: Array<SlotProp>
    form_prop: FormProp

    constructor(id: string, type: string, children: Array<SlotProp>, node_prop: NodeProp, form_prop: FormProp) {
        super(id, type, node_prop)
        this.children = children
        this.form_prop = form_prop
    }

    clone(): Container {
        let container = new Container(randomId(), this.type, SlotProp.clone_props(this.children), new NodeProp(), new FormProp())
        console.log(container)
        return container
    }
}

export class ClassProp {
    textColor?: string
    textSize?: string
    backgroundColor?: string
    textAlign?: string

    constructor(textColor?: string, textSize?: string, backgroundColor?: string, textAlign?: string) {
        this.textColor = textColor
        this.textSize = textSize
        this.backgroundColor = backgroundColor
        this.textAlign = textAlign
    }
}

export class NodeProp {
    clazz?: ClassProp
    name?: string
    content?: string
    href?: string
    styles?: { [key: string]: string }
    type?: string

    constructor(clazz?: ClassProp, name?: string, content?: string, href?: string, styles?: { [key: string]: string }, type?: string) {
        this.clazz = clazz
        this.name = name
        this.content = content
        this.href = href
        this.styles = styles
        this.type = type
    }
}

export class ClassItem {
    className: string
    classDesc: string

    constructor(className: string, classDesc: string) {
        this.className = className
        this.classDesc = classDesc
    }
}

export class FormMethod {
    name: string

    constructor(name: string) {
        this.name = name
    }
}

function create_slots(...sizes: number[]): SlotProp[] {
    return sizes.map(value => new SlotProp(value))
}

function create_class_item(className: string, classDesc: string): ClassItem {
    return new ClassItem(className, classDesc)
}

function craete_form_method(method: string): FormMethod {
    return new FormMethod(method)
}

function create_widget(type: string, node_prop: NodeProp = new NodeProp()): Widget {
    return new Widget(randomId(), type, node_prop)
}

function create_container(children: Array<SlotProp>, type: string, node_prop: NodeProp = new NodeProp(), form_prop = new FormProp()): Container {
    return new Container(randomId(), type, children, node_prop, form_prop)
}

export const template_widgets: Widget[] = [
    create_widget("P"),
    create_widget("INPUT"),
    create_widget("BUTTON"),
    create_widget("CHECKBOX"),
    create_widget("RADIO"),
    create_container(create_slots(12), "FORM"),
    create_container(create_slots(12, 4, 4, 4), "CONTAINER"),
    create_container(create_slots(6, 6), "CONTAINER"),
    create_container(create_slots(3, 9), "CONTAINER")
]

export function eval_class_json(value?: any): ClassProp {
    if (value == undefined) {
        return new ClassProp()
    }

    return new ClassProp(value.textColor, value.textSize, value.backgroundColor, value.textAlign)
}

export function eval_node_prop_json(value?: any): NodeProp {
    if (value === undefined) {
        return new NodeProp();
    }
    return new NodeProp(eval_class_json(value.clazz), value.name, value.content, value.href, value.styles, value.type)
}

export function eval_form_prop_json(value?: any): FormProp {
    if (value === undefined) {
        return new FormProp()
    }

    return new FormProp(value.method, value.url)
}

export function eval_widget_json(value: any): Widget {
    if (value.type == 'CONTAINER' || value.type == 'FORM') {
        let children = value.children.map((slot: any) => new SlotProp(slot.size, slot.children.map((child: any) => eval_widget_json(child))))
        return new Container(value.id, value.type, children, eval_node_prop_json(value.node_prop), eval_form_prop_json(value.form_prop))
    } else {
        return new Widget(value.id, value.type, eval_node_prop_json(value.node_prop))
    }
}

export const class_group = {
    textColor: [
        create_class_item("mdui-text-color-green", "绿色"),
        create_class_item("mdui-text-color-blue", "蓝色"),
        create_class_item("mdui-text-color-white", "白色"),
        create_class_item("mdui-text-color-black", "黑色"),
        create_class_item("mdui-text-color-red", "红色"),
    ],
    backgroundColor: [
        create_class_item("mdui-color-green", "绿色"),
        create_class_item("mdui-color-blue", "蓝色"),
        create_class_item("mdui-color-white", "白色"),
        create_class_item("mdui-color-black", "黑色"),
        create_class_item("mdui-color-red", "红色"),
    ],
    textSize: [
        create_class_item("mdui-typo-headline", "大标题"),
        create_class_item("mdui-typo-title", "标题"),
        create_class_item("mdui-typo-subheading", "副标题"),
        create_class_item("mdui-typo-caption", "小标题"),
        create_class_item("mdui-typo-body-2", "正文2"),
        create_class_item("mdui-typo-body-1", "正文1"),
    ],
    textAlign: [
        create_class_item("mdui-text-left", "左对齐"),
        create_class_item("mdui-text-center", "居中"),
        create_class_item("mdui-text-right", "右对齐"),
    ]
}

export const form_group = {
    method: [
        craete_form_method("POST"),
        craete_form_method("GET")
    ]
}