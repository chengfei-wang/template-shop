<script setup lang="ts">
import NestedDraggable from "./NestedDraggable.vue";
import {ref} from "vue";
import {SlotProp, Widget, WidgetType} from "../../widget";
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
      v-bind="{animation: 200}"
      :group="{ name: 'editor' }"
      item-key="id">
    <template #item="{element}">
      <nested-draggable
          v-if="element.widget_type === WidgetType.CONTAINER"
          :id="element.id"
          :slots="element.children">
      </nested-draggable>
      <div
          v-else-if="element.widget_type === WidgetType.WIDGET"
          :id="element.id"
          v-html="element.description">
      </div>
      <div v-else>Unknown</div>
    </template>
  </draggable>
</template>

<script lang="ts">

</script>

<style>
@import "../template/template.css";
</style>