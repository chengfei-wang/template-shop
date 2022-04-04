<script lang="ts">
import Draggable from "vuedraggable"
import TemplateComponent from "./TemplateComponent.vue";

import { SlotProp, Widget } from "../Widget";

export default {
  name: "SlotDraggable",
  components: {Draggable, TemplateComponent}
}
</script>

<script setup lang="ts">
defineProps<{
  slot: SlotProp,
  select_item: (widget: Widget) => void,
  selected_item: Widget | undefined,
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
      <div v-if="element.is_container()" :id="element.id" @click.stop="select_item(element)" class="template-container template-item mdui-container-fluid" :class="{'template-selected': element.id === selected_item?.id}">
        <slot-draggable :id="`${element.id}-${index}`" :select_item="select_item" :selected_item="selected_item" v-for="(_slot, index) in element.children" :slot="_slot"></slot-draggable>
      </div>
      <template-component v-else-if="!element.is_container()" @click.stop="select_item(element)" :type="element.type" :node_prop="element.node_prop" :class="{'template-selected': element.id === selected_item?.id}"></template-component>
      <div v-else>Unknown</div>
    </template>
  </draggable>
</template>