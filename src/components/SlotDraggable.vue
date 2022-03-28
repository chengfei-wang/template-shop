<script lang="ts">
import Draggable from "vuedraggable"

import { SlotProp } from "../widget";
import { render_node_prop } from "../render";

export default {
  name: "SlotDraggable",
  components: {Draggable}
}
</script>

<script setup lang="ts">
defineProps<{
  slot: SlotProp,
  select_item: (id: string) => void,
  selected_item: string,
}>()
</script>

<template>
  <draggable
      :list="slot.children"
      :class="`template-slot mdui-col-xs-${slot.size}`"
      v-bind="{animation: 200}"
      group="editor"
      item-key="id">
    <template #item="{element}">
      <div v-if="element.is_container()" :id="element.id" @click.stop="select_item(element.id)" class="template-container template-item mdui-container-fluid" :class="{'template-selected': element.id === selected_item}">
        <slot-draggable :id="`${element.id}-${index}`" :select_item="select_item" :selected_item="selected_item" v-for="(_slot, index) in element.children" :slot="_slot"></slot-draggable>
      </div>
      <div v-else-if="!element.is_container()" :id="element.id" @click.stop="select_item(element.id)" v-html="render_node_prop(element.html, element.node_prop)" :class="{'template-selected': element.id === selected_item}"></div>
      <div v-else>Unknown</div>
    </template>
  </draggable>
</template>

<style>
@import "../template.css";
</style>