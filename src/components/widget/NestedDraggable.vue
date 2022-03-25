<script setup lang="ts">
import {Widget, Container, WidgetType} from "../../widget";

defineProps<{
  content: Array<Widget>
}>()
</script>

<template>
  <draggable
      class="template-item template-container"
      :list="content"
      v-bind="{ animation: 200 }"
      :group="{ name: 'editor' }"
      item-key="id">
    <template #item="{ element }">
      <nested-draggable
          v-if="element.widget_type === WidgetType.CONTAINER"
          :id="element.id"
          :content="element.children">
      </nested-draggable>
      <div v-else-if="element.widget_type === WidgetType.WIDGET"
           :id="element.id"
           v-html="element.description">
      </div>
      <div v-else>Unknown</div>
    </template>
  </draggable>
</template>

<script lang="ts">
import draggable from "vuedraggable";

export default {
  name: "NestedDraggable",
  components: {draggable},
}
</script>

<style>
@import "../template/template.css";
</style>