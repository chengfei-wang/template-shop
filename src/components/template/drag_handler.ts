function isTemplate(element: Element) {
    return element.classList.contains('template-flag')
}

function copyElement(element: Element) {
    const node = <Element>element.cloneNode(true)
    node.classList.remove('template-flag')
    deepId(node)
    document.getElementById('template-item-holder')!.appendChild(node)
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

function randomId(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    const len = chars.length
    let s = ''
    for (let i = 0; i < 32; i++) {
        s += chars.charAt(Math.floor(Math.random() * len))
    }
    return s
}

export function dragstart_handler(event: DragEvent) {
    const source: Element | null = <Element | null>event.target
    const data: DataTransfer | null = event.dataTransfer
    if (source != null && data != null) {
        if (isTemplate(<Element>source)) {
            const dest = copyElement(source)
            data.setData('application/element-id', dest.id)
        } else {
            data.setData('application/element-id', source.id)
        }
        data.dropEffect = 'move'
    }
}

export function dragover_handler(event: DragEvent) {
    event.preventDefault()
    const data: DataTransfer | null = event.dataTransfer
    if (data != null) {
        data.dropEffect = 'move'
    }
}

export function drop_handler(event: DragEvent) {
    event.preventDefault()

    const target: Element | null = <Element | null>event.target
    const transfer: DataTransfer | null = event.dataTransfer
    if (target != null && transfer != null) {
        const data = transfer.getData('application/element-id')
        const source = document.getElementById(data)
        if (source != null && target.classList.contains('template-container-root') || target.classList.contains('template-slot')) {
            target.appendChild(<Node>source)
        } else if (source != null && target.classList.contains('template-item') || target.classList.contains('template-container')) {
            target.parentNode!.insertBefore(<Node>source, target)
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
