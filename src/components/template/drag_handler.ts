function isTemplate(element: Element) {
    return element.classList.contains('template-flag')
}

function copyElement(element: Element, parent: HTMLElement) {
    const node = <Element>element.cloneNode(true)
    node.classList.remove('template-flag')
    deepId(node)
    parent.appendChild(node)
    return node
}

function deepId(element: Element) {
    element.id = randomId()
    const nodes = element.children
    if (nodes.length > 0) {
        for (let i = 0; i < nodes.length; i++) {
            if (nodes[i] != null) {
                deepId(nodes[i])
            }
        }
    }
}

export function randomId(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    const len = chars.length
    let s = ''
    for (let i = 0; i < 32; i++) {
        s += chars.charAt(Math.floor(Math.random() * len))
    }
    return s
}

export function dragstart_handler(event: DragEvent, content: string) {
    const data: DataTransfer | null = event.dataTransfer
    if (data != null) {
        data.setData('application/element-id', content)
    }
}

export function dragover_handler(event: DragEvent) {
    event.preventDefault()
}

export function drop_handler(event: DragEvent, callback: (data: string) => {}) {
    event.preventDefault()

    const target: Element | null = <Element | null>event.target
    const transfer: DataTransfer | null = event.dataTransfer
    if (target != null && transfer != null) {
        const data = transfer.getData('application/element-id')
        if (data != null && target.classList.contains('template-container-root') || target.classList.contains('template-slot')) {
            callback(data)
        } else if (target.classList.contains('template-item') || target.classList.contains('template-container')) {

        }
    }
}

export function delete_handler(event: DragEvent) {
    event.preventDefault()
    const transfer = event.dataTransfer
    if (transfer != null) {
        const data = transfer.getData('application/element-id')
        document.getElementById(data)?.remove()
    }
}
