<script lang="ts">
import { ref } from "vue";
import { class_group } from "../Widget"
import { Widget } from "../Widget";
import { eval_image, Image } from "../Model";
import { request, api } from "../Request";
import { ElButton, ElPopover } from "element-plus";
import ControlListItem from "./ControlListItem.vue";
export default {
    name: "ConfigPanelItem",
    components: {
        ElButton,
        ElPopover,
        ControlListItem,
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

    <control-list-item title="图片内容" v-if="selected_item.type === 'IMAGE'">
        <div class="mdui-col-xs-6">
            <el-popover :width="360" trigger="click">
                <template #reference>
                    <div>从图床选择</div>
                </template>
                <template #default>
                    <div class="mdui-container-fluid">
                        <div v-for="image in all_images" class="mdui-col-xs-4">
                            <img :src="api(`image/${image.imageId}`)" class="template-image-cell"
                                @click="item_set_url(selected_item, api(`image/${image.imageId}`))" />
                        </div>
                    </div>
                </template>
            </el-popover>
        </div>
        <div class="mdui-col-xs-6">
            <el-popover :width="360" trigger="click">
                <template #reference>
                    <div>手动输入地址</div>
                </template>
                <template #default>
                    <div class="mdui-textfield">
                        <label class="mdui-textfield-label">地址</label>
                        <input class="mdui-textfield-input" type="url" v-model="selected_item.node_prop.url" />
                    </div>
                </template>
            </el-popover>
        </div>
    </control-list-item>

    <div class="normal-divider"></div>

    <control-list-item title="文本颜色">
        <div class="mdui-col-xs-12">
            <el-popover :width="360" trigger="click">
                <template #reference>
                    <div>
                        <i class="mdui-icon material-icons mdui-text-color-grey">color_lens</i>
                        <span :class="[selected_item.node_prop.clazz?.textColor]">示例颜色</span>
                    </div>
                </template>
                <template #default>
                    <div class="mdui-container-fluid">
                        <div v-for="choice in class_group.textColor" class="mdui-col-xs-4 template-color-choice-cell"
                            @click="item_set_text_color(selected_item, choice.className)">
                            <i class="mdui-icon material-icons" :class="choice.className">color_lens</i>
                            <div style="width: 48px;">
                                {{ choice.classDesc }}
                            </div>
                        </div>
                    </div>
                </template>
            </el-popover>
        </div>
    </control-list-item>
    <div class="normal-divider"></div>

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

<style>
.template-image-cell {
    width: 100px;
    height: 100px;
    object-fit: cover;
}

.template-sample-cell {
    border-radius: 4px;
    background-color: argb(0.5, 0, 0, 0);
    height: 100%;
}

.template-color-choice-cell {
    height: 48px;
}

.template-color-choice-cell i {
    cursor: pointer;
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.05);
}

.template-color-choice-cell div {
    margin: 8px;
    display: inline;
}
</style>