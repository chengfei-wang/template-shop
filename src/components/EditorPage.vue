<template>
  <div class="mdui-container">
    <div class="mdui-col-sm-3">
      <p
          id="template-p"
          draggable="true"
          class="template-item template-flag"
          @dragstart="dragstart_handler($event)"
      >
        简单文本
      </p>

      <input
          id="template-input"
          draggable="true"
          type="text"
          class="template-item template-flag mdui-textfield-input"
          placeholder="请输入文本"
          @dragstart="dragstart_handler($event)"
      >

      <button
          id="template-button"
          draggable="true"
          class="template-item template-flag mdui-text-color-white mdui-color-green-400"
          @dragstart="dragstart_handler($event)"
      >
        普通按钮
      </button>

      <div
          id="template-container-6-6"
          draggable="true"
          class="template-container template-flag mdui-row-xs-2"
          @dragstart="dragstart_handler($event)"
      >
        <div
            id="template-slot-0-0"
            class="template-slot mdui-col"
        />
        <div
            id="template-slot-0-1"
            class="template-slot mdui-col"
        />
      </div>

      <div
          id="template-container-4-4-4"
          draggable="true"
          class="template-container template-flag mdui-row-xs-3"
          @dragstart="dragstart_handler($event)"
      >
        <div
            id="template-slot-1-0"
            class="template-slot mdui-col"
        />
        <div
            id="template-slot-1-1"
            class="template-slot mdui-col"
        />
        <div
            id="template-slot-1-2"
            class="template-slot mdui-col"
        />
      </div>

      <div
          id="template-container-4-8"
          draggable="true"
          class="template-container template-flag mdui-row-xs-3"
          @dragstart="dragstart_handler($event)"
      >
        <div
            id="template-slot-2-0"
            class="template-slot mdui-col-xs-4"
        />
        <div
            id="template-slot-2-1"
            class="template-slot mdui-col-xs-8"
        />
      </div>

      <div
          id="template-item-holder"
          style="position: absolute;left: -1000%"
      />
    </div>

    <div class="mdui-col-sm-7">
      <div
          id="template-container-root"
          class="template-container-root mdui-container mdui-center"
          @drop="drop_handler($event)"
          @dragover="dragover_handler($event)"
      />
    </div>

    <div class="mdui-col-sm-2">
      <div
          class="template-trash mdui-center"
          @drop="delete_handler($event)"
          @dragover="dragover_handler($event)"
      />
    </div>
  </div>
</template>

<script setup>
function isTemplate(element) {
  return element.classList.contains('template-flag')
}

function copyElement(element) {
  const node = element.cloneNode(true)
  node.classList.remove('template-flag')
  deepId(node)
  document.getElementById('template-item-holder').appendChild(node)
  return node
}

function deepId(element) {
  element.id = randomId()
  if (element.hasChildNodes()) {
    const nodes = element.childNodes
    nodes.forEach(node => deepId(node))
  }
}

function randomId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  const len = chars.length
  let s = ''
  for (let i = 0; i < 32; i++) {
    s += chars.charAt(Math.floor(Math.random() * len))
  }
  return s
}

function dragstart_handler(event) {
  const source = event.target
  if (isTemplate(source)) {
    const dest = copyElement(source)
    event.dataTransfer.setData('application/element-id', dest.id)
  } else {
    event.dataTransfer.setData('application/element-id', source.id)
  }
  event.dataTransfer.dropEffect = 'move'
}

function dragover_handler(event) {
  event.preventDefault()
  event.dataTransfer.dropEffect = 'move'
}

function drop_handler(event) {
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

function delete_handler(event) {
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
</script>

<style scoped>
.template-container-root {
  min-height: 480px;
  border: 1px solid #aaaaaa;
  height: auto;
  margin-top: 4px;
  margin-bottom: 4px;
}

.template-container {
  height: auto;
  padding-top: 8px;
  padding-bottom: 8px;
}

.template-slot {
  border: 1px dotted #aaaaaa;
  min-height: 32px;
  padding-top: 8px;
  padding-bottom: 8px;
  height: auto;
}

.template-item {
  border: 1px dotted #aaaaaa;
  width: 100% !important;
  margin-top: 8px;
  margin-bottom: 8px;
}

.template-trash {
  width: 80px;
  height: 80px;
  margin-top: 8px;
  margin-bottom: 8px;
  border: 1px solid #aaaaaa;
}

p {
  min-width: 20%;
  width: auto;
  min-height: 32px;
}

button {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  min-width: 88px;
  height: 36px;
  margin: 0;
  padding: 0 16px;
  overflow: hidden;
  color: inherit;
  font-weight: 500;
  font-size: 14px;
  line-height: 36px;
  letter-spacing: .04em;
  white-space: nowrap;
  text-align: center;
  text-transform: uppercase;
  text-decoration: none;
  vertical-align: middle;
  background: 0 0;
  border: none;
  border-radius: 2px;
  outline: 0;
  cursor: pointer;
}

.template-flag {

}
</style>
