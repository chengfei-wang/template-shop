export enum WidgetType {
    WIDGET, CONTAINER
}

export class SlotProp {
    size: number

    constructor(size: number = 12) {
        this.size = size
    }

    clone() : SlotProp {
        return new SlotProp(this.size)
    }

    static clone_props(props: Array<SlotProp>): Array<SlotProp> {
        return props.map(value => value.clone())
    }
}

export class Widget {
    id: string
    description: string
    widget_type: WidgetType

    constructor(id: string, description: string) {
        this.id = id
        this.description = description
        this.widget_type = WidgetType.WIDGET
    }

    clone(): Widget {
        let widget = new Widget(this.id, this.description)
        console.log(widget)
        return widget
    }
}

export class Container extends Widget {
    children: Array<SlotProp>

    constructor(id: string, description: string, children: Array<SlotProp>) {
        super(id, description)
        this.widget_type = WidgetType.CONTAINER
        this.children = children
    }

    clone(): Container {
        let container = new Container(this.id, this.description, SlotProp.clone_props(this.children))
        console.log(container)
        return container
    }
}