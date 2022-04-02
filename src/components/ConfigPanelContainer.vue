<script lang="ts">
import { ref } from "vue";
import { Container, Widget } from "../widget";

export default {
    name: "ConfigPanelContainer"
}
</script>

<script setup lang="ts">
let props = defineProps<{
    selected_item: Widget
}>()

const is_form = ref<Array<number>>(props.selected_item.is_form() ? [0] : [])

class FormProp {
    method: string
    url: string

    constructor(method: string = 'POST', url: string = '') {
        this.method = method
        this.url = url
    }
}

const form_prop = ref<FormProp>(new FormProp())

console.log(is_form.value.length == 1)

function change_form_or_container(event: Event) {
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
                <input
                    type="checkbox"
                    v-model="is_form"
                    :value="0"
                    @change="change_form_or_container"
                />
                <i class="mdui-switch-icon"></i>
            </label>
        </div>
    </div>

    <div v-if="selected_item.is_form()">
        <div class="style_editor_group">
            <p>表单提交方式</p>
            <div class="mdui-container-fluid">
                <div class="mdui-col-xs-6 mdui-text-center">
                    <label class="mdui-radio">
                        <input
                            type="radio"
                            name="form-method"
                            v-model="form_prop.method"
                            value="POST"
                        />
                        <i class="mdui-radio-icon" />
                        POST
                    </label>
                </div>

                <div class="mdui-col-xs-6 mdui-text-center">
                    <label class="mdui-radio">
                        <input
                            type="radio"
                            name="form-method"
                            v-model="form_prop.method"
                            value="GET"
                        />
                        <i class="mdui-radio-icon" />
                        GET
                    </label>
                </div>
            </div>
        </div>

        <div class="style_editor_group">
            <p>表单提交地址</p>
            <div class="mdui-textfield">
                <input
                    class="mdui-textfield-input"
                    placeholder="表单提交地址"
                    type="url"
                    v-model="form_prop.url"
                />
            </div>
        </div>
    </div>
</template>