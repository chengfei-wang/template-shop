<script setup>
import TextInput from "./template/element/TextInput.vue";
import {dragstart_handler, dragover_handler, drop_handler, delete_handler} from "./template/drag_handler.ts"

</script>

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

      <TextInput />
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

<style scoped lang="css">
@import "./template/template.css";
</style>