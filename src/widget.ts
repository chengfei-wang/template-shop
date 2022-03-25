export enum WidgetType {
    WIDGET, CONTAINER
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
    children: Array<Widget>

    constructor(id: string, description: string, children: Array<Widget> = []) {
        super(id, description)
        this.widget_type = WidgetType.CONTAINER
        this.children = children
    }

    clone(): Container {
        let container = new Container(this.id, this.description, [])
        console.log(container)
        return container
    }
}