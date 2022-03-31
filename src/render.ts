import { NodeProp } from "./widget";

export function render_node_prop(id: string, html: string, prop: NodeProp): string {
    let element: HTMLElement = document.createElement("div")
    element.innerHTML = html
    element = <HTMLElement>(element.children[0])

    element.id = id

    if (prop.name != null) {
        let input_element = find_input_element(element)
        if (input_element != undefined) {
            input_element.name = prop.name
        }
    }

    let clazz = prop?.clazz
    if (clazz?.backgroundColor != undefined) {
        element.classList.add(clazz.backgroundColor)
    }
    if (clazz?.textSize != undefined) {
        element.classList.add(clazz.textSize)
    }
    if (clazz?.textColor != undefined) {
        element.classList.add(clazz.textColor)
    }
    if (clazz?.textAlign != undefined) {
        element.classList.add(clazz.textAlign)
    }

    if (prop.content != undefined) {
        console.log(`内容："${prop.content}"`)
    }
    // console.log(element.outerHTML)

    return element.outerHTML
}

function find_input_element(element: HTMLElement): HTMLInputElement | undefined {
    // console.log(element.tagName)

    if (element.tagName === 'INPUT') {
        // console.log(element)
        return <HTMLInputElement>element
    }
    let children = element.children
    if (children.length > 0) {
        for(let i = 0; i< children.length; i++) {
            let e = find_input_element(<HTMLElement>children[i])
            if (e != undefined) {
                return e
            }
        }
    }
    return undefined
}