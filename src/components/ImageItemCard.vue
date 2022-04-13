<script lang="ts">
import { Image } from '../Model';
import { api } from '../Request';

export default {
    name: "ImageItemCard",
}
</script>


<script lang="ts" setup>
defineProps<{
    image: Image,
    delete_image: (image: Image) => void,
    preview_image: (image: Image) => void,
}>()
</script>


<template>
    <div class="mdui-col-xs-12 mdui-col-sm-6 mdui-col-md-4" style="margin: 16px 0;">
        <div class="mdui-card">
            <div class="mdui-card-media">
                <img class="image-preview-cover" alt="image" :src="api(`image/${image.imageId}`)" @click="preview_image(image)" />
            </div>
            <div class="mdui-card-actions">
                <button class="mdui-btn mdui-ripple" disabled>{{ image.uploadTime.toLocaleString() }}</button>
                <div class="mdui-float-right">
                    <button class="mdui-btn mdui-btn-icon" @click="delete_image(image)">
                        <i class="mdui-icon material-icons">delete</i>
                    </button>
                    <button class="mdui-btn mdui-btn-icon" @click="preview_image(image)">
                        <i class="mdui-icon material-icons">photo</i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>