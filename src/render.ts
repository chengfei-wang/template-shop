import { NodeProp } from "./widget";

export function render_node_prop(html: string, prop: NodeProp): string {
    let element: HTMLElement = document.createElement("div")
    element.innerHTML = html

    element = <HTMLElement>element.childNodes[0]

    if (prop?.clazz != null) {
        prop.clazz.forEach(clazz => {
            element.classList.add(clazz)
        });
    }

    // console.log(element.outerHTML)

    return element.outerHTML
}