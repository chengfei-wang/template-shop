export class SlotProp {
    size: number

    constructor(size: number = 12) {
        this.size = size
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

    constructor(id: string, html: string) {
        this.id = id
        this.html = html
        this.container = false
    }

    clone(): Widget {
        let widget = new Widget(this.id, this.html)
        console.log(widget)
        return widget
    }

    is_container(): boolean {
        return this.container
    }
}

export class Container extends Widget {
    children: Array<SlotProp>

    constructor(id: string, html: string, children: Array<SlotProp>) {
        super(id, html)
        this.children = children
        this.container = true
    }

    clone(): Container {
        let container = new Container(this.id, this.html, SlotProp.clone_props(this.children))
        console.log(container)
        return container
    }
}