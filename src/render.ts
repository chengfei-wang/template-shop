import { NodeProp } from "./widget";

export function render_node_prop(html: string, node_prop?: NodeProp): string {
    let element = document.createElement("div")
    element.innerHTML = html

    if (node_prop?.clazz != null) {
        node_prop.clazz.forEach(clazz => {
            element.classList.add(clazz)
        });
    }

    return element.outerHTML
}