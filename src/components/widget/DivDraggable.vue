<script setup lang="ts">
import NestedDraggable from "./NestedDraggable.vue";
import {ref} from "vue";
import {Widget, WidgetType} from "../../widget";
import Draggable from "vuedraggable"

const content = ref<Array<Widget>>([])
</script>

<template>
  <draggable
      :list="content"
      class="template-slot mdui-col"
      v-bind="{animation: 200}"
      :group="{ name: 'editor' }"
      item-key="id">
    <template #item="{element}">
      <nested-draggable
          v-if="element.widget_type === WidgetType.CONTAINER"
          :id="element.id"
          :children="element.children">
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