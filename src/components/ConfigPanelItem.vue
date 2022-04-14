<script lang="ts">
import { ref } from "vue";
import { class_group } from "../Widget"
import { Widget } from "../Widget";
import { eval_image, Image } from "../Model";
import { request, api } from "../Request";
export default {
    name: "ConfigPanelItem",
    components: {
    },
}
</script>

<script setup lang="ts">
defineProps<{
    selected_item: Widget
}>()


function item_set_text_color(selected_item: Widget, clazz: string) {
    let prop = selected_item.node_prop
    if (prop.clazz == undefined) {
        prop.clazz = {}
    }
    prop.clazz.textColor = clazz
}

function item_set_text_size(selected_item: Widget, clazz: string) {
    let prop = selected_item.node_prop
    if (prop.clazz == undefined) {
        prop.clazz = {}
    }
    prop.clazz.textSize = clazz

}

function item_set_background_color(selected_item: Widget, clazz: string) {
    let prop = selected_item.node_prop
    if (prop.clazz == undefined) {
        prop.clazz = {}
    }
    prop.clazz.backgroundColor = clazz
}

function item_set_text_align(selected_item: Widget, clazz: string) {
    let prop = selected_item.node_prop
    if (prop.clazz == undefined) {
        prop.clazz = {}
    }
    prop.clazz.textAlign = clazz

}

function item_set_url(selected_item: Widget, url: string) {
    let prop = selected_item.node_prop
    if (prop.clazz == undefined) {
        prop.clazz = {}
    }
    prop.url = url
}

function get_all_images() {
    request('image/list', {}, (status, result) => {
        if (status === 200 && result.code === 200) {
            console.log(result.data);
            all_images.value = (result.data as any[]).map(item => eval_image(item));
        }
    });
}

const all_images = ref<Image[]>([]);

get_all_images()
</script>

<template>
    <div v-if="selected_item.type === 'INPUT'">
        <div class="style_editor_group">
            <p>类型</p>
        </div>
    </div>

    <div class="style_editor_group" v-if="selected_item.type === 'IMAGE'">
        <p>图片内容</p>
        <div class="mdui-textfield">
            <label class="mdui-textfield-label">图片地址</label>
            <input class="mdui-textfield-input" type="text" v-model="selected_item.node_prop.url"
                placeholder="输入外部链接" />
        </div>

        <div class="mdui-container-fluid image-selector-container">
            <div v-for="image in all_images" style="margin: 16px 0;">
                <img class="image-preview-cover" :src="api(`image/${image.imageId}`)" alt='image-select'
                    @click="item_set_url(selected_item, api(`image/${image.imageId}`))" />
            </div>
        </div>
    </div>

    <div class="style_editor_group">
        <p>文本颜色</p>
        <div class="mdui-container-fluid">
            <div v-for="choice in class_group.textColor" class="mdui-col-xs-3"
                :class="[choice.className, selected_item.node_prop.clazz?.textColor === choice.className ? 'choice_selected' : 'choice_unselected']"
                @click="item_set_text_color(selected_item, choice.className)">{{ choice.classDesc }}</div>
        </div>
    </div>

    <div class="style_editor_group">
        <p>背景颜色</p>
        <div class="mdui-container-fluid">
            <div v-for="choice in class_group.backgroundColor" class="mdui-col-xs-3"
                :class="[choice.className, selected_item.node_prop.clazz?.backgroundColor === choice.className ? 'choice_selected' : 'choice_unselected']"
                @click="item_set_background_color(selected_item, choice.className)">{{ choice.classDesc }}</div>
        </div>
    </div>

    <div class="style_editor_group">
        <p>文本字体</p>
        <div class="mdui-container-fluid">
            <div v-for="choice in class_group.textSize" class="mdui-col-xs-6"
                :class="[choice.className, selected_item.node_prop.clazz?.textSize === choice.className ? 'choice_selected' : 'choice_unselected']"
                @click="item_set_text_size(selected_item, choice.className)">{{ choice.classDesc }}</div>
        </div>
    </div>

    <div class="style_editor_group">
        <p>文本样式</p>
        <div class="mdui-container-fluid">
            <div v-for="choice in class_group.textAlign" class="mdui-col-xs-4"
                :class="[choice.className, selected_item.node_prop.clazz?.textAlign === choice.className ? 'choice_selected' : 'choice_unselected']"
                @click="item_set_text_align(selected_item, choice.className)">{{ choice.classDesc }}</div>
        </div>
    </div>

    <div class="style_editor_group">
        <p>内容文本</p>
        <input class="mdui-textfield-input" type="text" v-model="selected_item.node_prop.content" placeholder="内容文本" />
    </div>

    <div class="style_editor_group">
        <p>字段名称</p>
        <input class="mdui-textfield-input" type="text" v-model="selected_item.node_prop.name" placeholder="字段名称" />
    </div>
</template>
