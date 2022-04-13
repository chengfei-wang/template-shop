<script lang="ts">
import { ref } from "vue";
import { FormProp, Widget } from "../Widget";
import { form_group, widget_is_form } from "../Widget"

export default {
    name: "ConfigPanelContainer"
}
</script>

<script setup lang="ts">
let props = defineProps<{
    selected_item: Widget
}>()

const is_form = ref<Array<number>>(widget_is_form(props.selected_item) ? [0] : [])

const form_prop = ref<FormProp>(props.selected_item.form_prop)

console.log(is_form.value.length == 1)

function change_form_or_container() {
    if (is_form.value.length === 0) {
        props.selected_item.type = 'CONTAINER'
    } else {
        props.selected_item.type = 'FORM'
    }
}
</script>

<template>
    <div class="style_editor_group">
        <p>是否为表单组件</p>
        <div class="mdui-text-center">
            <label class="mdui-switch">
                <input type="checkbox" v-model="is_form" :value="0" @change="change_form_or_container" />
                <i class="mdui-switch-icon"></i>
            </label>
        </div>
    </div>

    <div v-if="widget_is_form(selected_item)">
        <div class="style_editor_group">
            <p>表单提交方式</p>
            <div class="mdui-container-fluid">
                <div v-for="method in form_group.method" class="mdui-col-xs-6 mdui-text-center">
                    <label class="mdui-radio">
                        <input type="radio" name="form-method" v-model="form_prop.method" :value="method.name" />
                        <i class="mdui-radio-icon" />
                        {{ method.name }}
                    </label>
                </div>
            </div>
        </div>

        <div class="style_editor_group" v-if="false">
            <p>表单提交地址</p>
            <div class="mdui-textfield">
                <input class="mdui-textfield-input" placeholder="表单提交地址" type="url" v-model="form_prop.url" disabled />
            </div>
        </div>
    </div>
</template>