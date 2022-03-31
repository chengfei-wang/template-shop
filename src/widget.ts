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

    static create_slots(...sizes: number[]) {
        return sizes.map(value => new SlotProp(value))
    }
}

export class Widget {
    id: string
    html: string
    container: boolean
    prop: NodeProp

    constructor(id: string, html: string, prop: NodeProp) {
        this.id = id
        this.html = html
        this.container = false
        this.prop = prop
    }

    clone(): Widget {
        let widget = new Widget(randomId(), this.html, new NodeProp())
        console.log(widget)
        return widget
    }

    is_container(): boolean {
        return this.container
    }
}

export class Container extends Widget {
    children: Array<SlotProp>

    constructor(id: string, html: string, children: Array<SlotProp>, prop: NodeProp) {
        super(id, html, prop)
        this.children = children
        this.container = true
    }

    clone(): Container {
        let container = new Container(randomId(), this.html, SlotProp.clone_props(this.children), new NodeProp())
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

    constructor(props?: {clazz?: ClassProp, name?: string, content?: string, href?: string, styles?: { [key: string]: string }, type?: string}) {
        this.clazz = props?.clazz
        this.name = props?.name
        this.content = props?.content
        this.href = props?.href
        this.styles = props?.styles
        this.type = props?.type
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

export function create_widget(html: string, prop: NodeProp = new NodeProp()): Widget {
    return new Widget(randomId(), html, prop)
}

export function create_container(children: Array<SlotProp>, description: string, prop: NodeProp = new NodeProp()): Container {
    return new Container(randomId(), description, children, prop)
}

export const template_widgets = [
    create_widget("<p class='template-item template-default-p'>单行文本</p>"),
    create_widget("<input type='text' class='template-item mdui-textfield-input' placeholder='请输入文本'/>"),
    create_widget("<button class='template-item template-default-button'>普通按钮</button>"),
    create_widget("<div class='template-item'><label class='mdui-checkbox'><input type='checkbox' name='default_checkbox_group'/><i class='mdui-checkbox-icon'></i>多选框</label></div>"),
    create_widget("<div class='template-item'><label class='mdui-radio'><input type='radio' name='default_radio_group'/><i class='mdui-radio-icon'></i>单选框</label></div>"),
    create_container(SlotProp.create_slots(12, 4, 4, 4), "<div></div>"),
    create_container(SlotProp.create_slots(6, 6), "<div></div>"),
    create_container(SlotProp.create_slots(3, 9), "<div></div>")
]

export function eval_node_prop_json(value?: any): NodeProp {
    if (value == undefined) {
        return new NodeProp();
    }
    return new NodeProp({
        clazz: value?.clazz,
        name: value?.name,
        content: value?.content,
        href: value?.href,
        styles: value?.styles,
        type: value?.type,
    })
}

export function eval_widget_json(value: any): Widget {
    if (value.container) {
        let children = value.children.map((slot: any) => new SlotProp(slot.size, slot.children.map((child: any) => eval_widget_json(child))))
        return new Container(value.id, value.html, children, eval_node_prop_json(value.prop))
    } else {
        return new Widget(value.id, value.html, eval_node_prop_json(value.prop))
    }
}

export const class_group = {
    textColor: [
        new ClassItem("mdui-text-color-green", "绿色"),
        new ClassItem("mdui-text-color-blue", "蓝色"),
        new ClassItem("mdui-text-color-white", "白色"),
        new ClassItem("mdui-text-color-black", "黑色"),
        new ClassItem("mdui-text-color-red", "红色"),
    ],
    backgroundColor: [
        new ClassItem("mdui-color-green", "绿色"),
        new ClassItem("mdui-color-blue", "蓝色"),
        new ClassItem("mdui-color-white", "白色"),
        new ClassItem("mdui-color-black", "黑色"),
        new ClassItem("mdui-color-red", "红色"),
    ],
    textSize: [
        new ClassItem("mdui-typo-headline", "大标题"),
        new ClassItem("mdui-typo-title", "标题"),
        new ClassItem("mdui-typo-subheading", "副标题"),
        new ClassItem("mdui-typo-caption", "小标题"),
        new ClassItem("mdui-typo-body-2", "正文2"),
        new ClassItem("mdui-typo-body-1", "正文1"),
    ],
    textAlign: [
        new ClassItem("mdui-text-center", "居中"),
        new ClassItem("mdui-text-left", "左对齐"),
        new ClassItem("mdui-text-right", "右对齐"),
    ]
}