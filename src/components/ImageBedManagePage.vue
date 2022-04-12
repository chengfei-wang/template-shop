<script lang="ts">
import PageBody from './PageBody.vue';
import Toolbar from './Toolbar.vue';
import ImageItemCard from './ImageItemCard.vue';
import { api, request, request_urlencoded } from '../Request';
import mdui from 'mdui';
import { eval_image, Image } from '../Model';
import { ref } from 'vue';

export default {
    name: "ImageBedManagePage",
    components: {
        PageBody,
        Toolbar,
        ImageItemCard,
    },
}
</script>


<script setup lang="ts">
const all_images = ref<Image[]>([])

function get_all_images() {
    request('image/list', {}, (status, result) => {
        if (status === 200 && result.code === 200) {
            console.log(result.data);
            all_images.value = (result.data as any[]).map(item => eval_image(item));
        }
    });
}

function upload_image() {
    const upload_file_field = document.getElementById("upload_file_field") as (HTMLInputElement | undefined)
    const image = upload_file_field?.files?.item(0)
    if (image) {
        const form_data = new FormData();
        form_data.append('file', image);
        request_urlencoded('image/upload', form_data, (status, result) => {
            if (status === 200 && result.code === 200) {
                console.log(result.data);
                mdui.snackbar({
                    message: result.message,
                    position: 'bottom',
                });
            } else {
                mdui.snackbar({
                    message: result.message || '上传失败，可能是图片过大',
                    position: 'bottom',
                });
            }

            get_all_images()
        });
    }
}

function delete_image(image: Image) {
    console.log(image)
    mdui.confirm(`确定要删除这张图片吗？`, (yes) => {
        if (yes) {
            request('image/delete', { imageId: image.imageId }, (status, result) => {
                if (status === 200 && result.code === 200) {
                    mdui.snackbar({
                        message: result.message,
                        position: 'bottom',
                    });
                } else {
                    mdui.snackbar({
                        message: result.message || '删除失败',
                        position: 'bottom',
                    });
                }

                get_all_images()
            });
        }
    });
}

function preview_image(image: Image) {

}

get_all_images()
</script>

<template>
    <toolbar title="图床管理">
        <!-- select a picture -->
        <div class="input-file-field">
            <label for="upload_file_field" class="mdui-btn mdui-btn-icon mdui-ripple">
                <input type="file" id="upload_file_field" accept="image/*" @change="upload_image" />
                <i class="mdui-icon material-icons">add</i>
            </label>
        </div>
    </toolbar>
    <page-body>
        <div class="mdui-container">
            <image-item-card v-for="image in all_images" :delete_image="delete_image" :preview_image="preview_image" :image="image" />
        </div>
    </page-body>
</template>

<style scoped>
.input-file-field input[type=file] {
    visibility: hidden;
    position: absolute;
    top: 0;
}
</style>