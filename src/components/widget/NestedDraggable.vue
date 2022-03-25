<script setup lang="ts">
import {ref} from "vue"
import {Widget, Container, WidgetType} from "../../widget";
const props = defineProps<{
  children: number
}>()

const content = ref<Array<Array<Widget>>>(new Array<Array<Widget>>(props.children))
</script>

<template>
  <div :class="`mdui-row-xs-${children}`" class="template-container">
    <draggable
        class="template-slot mdui-col"
        :list="content[index]"
        v-for="index in children"
        v-bind="{ animation: 200 }"
        :group="{ name: 'editor' }"
        item-key="id">
      <template #item="{ element }">
        <nested-draggable
            v-if="element.widget_type === WidgetType.CONTAINER"
            :id="element.id"
            :children="element.children">
        </nested-draggable>
        <div v-else-if="element.widget_type === WidgetType.WIDGET"
             :id="element.id"
             v-html="element.description">
        </div>
        <div v-else>Unknown</div>
      </template>
    </draggable>
  </div>
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