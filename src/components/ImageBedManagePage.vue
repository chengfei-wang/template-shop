<script lang="ts">
import PageBody from './PageBody.vue';
import Toolbar from './Toolbar.vue';
import { request, request_urlencoded } from '../Request';
import { ref } from 'vue';
import mdui from 'mdui';

export default {
    name: "ImageBedManagePage",
}
</script>


<script setup lang="ts">

function get_all_images() {
    request('/image/list', {}, (status, data) => {
        if (status === 200 && data.code === 200) {
            console.log(data.data);
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