<script setup lang="ts">
import NestedDraggable from "./NestedDraggable.vue";
import {ref} from "vue";
import {SlotProp, Widget} from "../../widget";
import Draggable from "vuedraggable"

defineProps<{
  slot: SlotProp
}>()

const content = ref<Array<Widget>>([])
</script>

<template>
  <draggable
      :list="content"
      class="template-slot"
      :class="'mdui-col-xs-' + slot.size"
      v-bind="{ animation: 200 }"
      :group="{ name: 'editor' }"
      item-key="id">
    <template #item="{element}">
      <nested-draggable
          v-if="element.is_container()"
          :id="element.id"
          :slots="element.children">
      </nested-draggable>
      <div
          v-else-if="!element.is_container()"
          :id="element.id"
          v-html="element.html">
      </div>
      <div v-else>Unknown</div>
    </template>
  </draggable>
</template>

<script lang="ts">
export default {
  name: "DivDraggable"
}
</script>

<style>
@import "../template/template.css";
</style>