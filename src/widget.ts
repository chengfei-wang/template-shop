export enum WidgetType {
    WIDGET, CONTAINER
}

export interface SlotProp {
    size: number
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

export class Container extends Widget{
    children: number

    constructor(id: string, description: string, children: number = 1) {
        super(id, description)
        this.widget_type = WidgetType.CONTAINER
        this.children = children
    }

    clone(): Container {
        let container = new Container(this.id, this.description, this.children)
        console.log(container)
        return container
    }
}