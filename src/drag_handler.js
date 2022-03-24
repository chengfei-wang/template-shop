function isTemplate (element) {
  return element.classList.contains('template-flag')
}

function copyElement (element) {
  const node = element.cloneNode(true)
  node.classList.remove('template-flag')
  deepId(node)
  document.getElementById('template-item-holder').appendChild(node)
  return node
}

function deepId (element) {
  element.id = randomId()
  if (element.hasChildNodes()) {
    const nodes = element.childNodes
    nodes.forEach(node => deepId(node))
  }
}

function randomId () {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  const len = chars.length
  let s = ''
  for (let i = 0; i < 32; i++) {
    s += chars.charAt(Math.floor(Math.random() * len))
  }
  return s
}

function dragstart_handler (event) {
  const source = event.target
  if (isTemplate(source)) {
    const dest = copyElement(source)
    event.dataTransfer.setData('application/element-id', dest.id)
  } else {
    event.dataTransfer.setData('application/element-id', source.id)
  }
  event.dataTransfer.dropEffect = 'move'
}

function dragover_handler (event) {
  event.preventDefault()
  event.dataTransfer.dropEffect = 'move'
}

function drop_handler (event) {
  event.preventDefault()
  const data = event.dataTransfer.getData('application/element-id')
  const target = event.target
  const source = document.getElementById(data)
  if (target.classList.contains('template-container-root') || target.classList.contains('template-slot')) {
    target.appendChild(source)
  } else if (target.classList.contains('template-item') || target.classList.contains('template-container')) {
    target.parentNode.insertBefore(source, target)
  }
}

function delete_handler (event) {
  event.preventDefault()
  const data = event.dataTransfer.getData('application/element-id')
  const element = document.getElementById(data)
  element.remove()
}

// function ondragenter_handler(event) {
//   event.preventDefault()
//   console.log("enter")
//   console.log(event)
//   console.log(event.target)
//   let target = event.target
// }
//
// function remove_all_with_class(node, className) {
//   if (node.hasChildNodes()) {
//     node.childNodes.forEach(node => remove_all_with_class(node, className))
//   } else if (node.classList?.contains(className)) {
//     node.remove()
//   }
// }
//
// function ondragleave_handler(event) {
//   event.preventDefault()
//   console.log("leave")
//   console.log(event.target)
// }
