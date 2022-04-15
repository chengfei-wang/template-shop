<script lang="ts">
import { Widget } from "../Widget";
import { form_group, config_items } from "../Widget";
import ControlListItem from "./ControlListItem.vue";
import SlotEditor from "./SlotEditor";

export default {
    name: "ConfigPanelContainer",
    components: {
        ControlListItem,
        SlotEditor,
    },
}
</script>

<script setup lang="ts">
defineProps<{
    selected_item: Widget
}>()
</script>

<template>
    <control-list-item title="容器类型">
        <el-radio-group v-model="selected_item.type" size="small">
            <el-radio-button label="CONTAINER">容器</el-radio-button>
            <el-radio-button label="FORM">表单</el-radio-button>
        </el-radio-group>
    </control-list-item>

    <control-list-item title="表单方法" v-if="config_items.FORM_METHOD.includes(selected_item.type)">
        <el-radio-group v-model="selected_item.form_prop.method" size="small">
            <el-radio-button v-for="method in form_group.methods" :label="method.name">
                {{ method.name }}
            </el-radio-button>
        </el-radio-group>
    </control-list-item>

    <control-list-item title="容器插槽">
        <el-popover :width="350" trigger="click">
            <template #reference>
                <div>编辑插槽</div>
            </template>
            <template #default>
                <slot-editor :container_slot="selected_item.children"></slot-editor>
            </template>
        </el-popover>
    </control-list-item>
</template>