<script lang="ts">
import Draggable from "vuedraggable"

import {ref} from "vue";
import {SlotProp, Widget} from "../widget";

export default {
  name: "SlotDraggable",
  components: {Draggable}
}
</script>

<script setup lang="ts">
defineProps<{
  slot: SlotProp
}>()

const content = ref<Array<Widget>>([])
</script>

<template>
  <draggable
      :list="content"
      :class="`template-slot mdui-col-xs-${slot.size}`"
      v-bind="{animation: 200}"
      group="editor"
      item-key="id">
    <template #item="{element}">
      <div v-if="element.is_container()" class="template-container template-item mdui-container-fluid">
        <slot-draggable :id="element.id" v-for="_slot in element.children" :slot="_slot"></slot-draggable>
      </div>
      <div v-else-if="!element.is_container()" :id="element.id" v-html="element.html"></div>
      <div v-else>Unknown</div>
    </template>
  </draggable>
</template>

<style>
@import "../template.css";
</style>