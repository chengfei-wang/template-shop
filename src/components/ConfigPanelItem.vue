<script lang="ts">
import { class_group } from "../Widget"
import { ClassProp, Widget } from "../Widget";

export default {
    name: "ConfigPanelItem"
}
</script>

<script setup lang="ts">
defineProps<{
    selected_item: Widget
}>()


function item_set_text_color(selected_item: Widget, clazz: string) {
    let prop = selected_item.node_prop
    if (prop.clazz == undefined) {
        prop.clazz = new ClassProp()
    }
    prop.clazz.textColor = clazz
}

function item_set_text_size(selected_item: Widget, clazz: string) {
    let prop = selected_item.node_prop
    if (prop.clazz == undefined) {
        prop.clazz = new ClassProp()
    }
    prop.clazz.textSize = clazz

}

function item_set_background_color(selected_item: Widget, clazz: string) {
    let prop = selected_item.node_prop
    if (prop.clazz == undefined) {
        prop.clazz = new ClassProp()
    }
    prop.clazz.backgroundColor = clazz
}

function item_set_text_align(selected_item: Widget, clazz: string) {
    let prop = selected_item.node_prop
    if (prop.clazz == undefined) {
        prop.clazz = new ClassProp()
    }
    prop.clazz.textAlign = clazz

}
</script>

<template>
    <div class="style_editor_group">
        <p>文本颜色</p>
        <div class="mdui-container-fluid">
            <div
                v-for="choice in class_group.textColor"
                class="mdui-col-xs-3"
                :class="[choice.className, selected_item.node_prop.clazz?.textColor === choice.className ? 'choice_selected' : 'choice_unselected']"
                @click="item_set_text_color(selected_item, choice.className)"
            >{{ choice.classDesc }}</div>
        </div>
    </div>

    <div class="style_editor_group">
        <p>背景颜色</p>
        <div class="mdui-container-fluid">
            <div
                v-for="choice in class_group.backgroundColor"
                class="mdui-col-xs-3"
                :class="[choice.className, selected_item.node_prop.clazz?.backgroundColor === choice.className ? 'choice_selected' : 'choice_unselected']"
                @click="item_set_background_color(selected_item, choice.className)"
            >{{ choice.classDesc }}</div>
        </div>
    </div>

    <div class="style_editor_group">
        <p>文本字体</p>
        <div class="mdui-container-fluid">
            <div
                v-for="choice in class_group.textSize"
                class="mdui-col-xs-6"
                :class="[choice.className, selected_item.node_prop.clazz?.textSize === choice.className ? 'choice_selected' : 'choice_unselected']"
                @click="item_set_text_size(selected_item, choice.className)"
            >{{ choice.classDesc }}</div>
        </div>
    </div>

    <div class="style_editor_group">
        <p>文本样式</p>
        <div class="mdui-container-fluid">
            <div
                v-for="choice in class_group.textAlign"
                class="mdui-col-xs-4"
                :class="[choice.className, selected_item.node_prop.clazz?.textAlign === choice.className ? 'choice_selected' : 'choice_unselected']"
                @click="item_set_text_align(selected_item, choice.className)"
            >{{ choice.classDesc }}</div>
        </div>
    </div>

    <div class="style_editor_group">
        <p>内容文本</p>
        <input
            class="mdui-textfield-input"
            type="text"
            v-model="selected_item.node_prop.content"
            placeholder="内容文本"
        />
    </div>

    <div class="style_editor_group">
        <p>字段名称</p>
        <input
            class="mdui-textfield-input"
            type="text"
            v-model="selected_item.node_prop.name"
            placeholder="字段名称"
        />
    </div>

    <div v-if="selected_item.type === 'INPUT'">
        <div class="style_editor_group">
            
        </div>
    </div>
</template>