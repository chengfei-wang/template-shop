<script lang="ts">
import { ref } from "vue";
import { FormProp, Widget } from "../Widget";
import { form_group, widget_is_form, config_items } from "../Widget";
import ControlListItem from "./ControlListItem.vue";

export default {
    name: "ConfigPanelContainer",
    components: {
        ControlListItem,
    },
}
</script>

<script setup lang="ts">
let props = defineProps<{
    selected_item: Widget
}>()

const is_form = ref<Array<number>>(widget_is_form(props.selected_item) ? [0] : [])

const form_prop = ref<FormProp>(props.selected_item.form_prop)

console.log(is_form.value.length == 1)
</script>

<template>

    <control-list-item title="容器类型">
        <el-radio-group v-model="selected_item.type" size="small">
            <el-radio-button label="CONTAINER">容器</el-radio-button>
            <el-radio-button label="FORM">表单</el-radio-button>
        </el-radio-group>
    </control-list-item>

    <div v-if="config_items.FORM_METHOD.includes(selected_item.type)">
        <control-list-item title="表单方法">
            <el-radio-group v-model="form_prop.method" size="small">
                <el-radio-button v-for="method in form_group.methods" :label="method.name">
                    {{ method.name }}
                </el-radio-button>
            </el-radio-group>
        </control-list-item>
    </div>
</template>