<script lang="ts">
import mdui from "mdui";
import { ref } from "vue";
import { eval_template_order, TemplateOrder } from "../Model";
import { request } from "../Request";
import Toolbar from "./Toolbar.vue";
import PageBody from "./PageBody.vue";
import TemplateOrderItem from "./TemplateOrderItem.vue";

export default {
    name: "HistoryOrderPage",
    components: { Toolbar, PageBody, TemplateOrderItem }
}
</script>


<script setup lang="ts">

const bought_templates = ref<Array<TemplateOrder>>([])

function get_template_bought_list() {
    request("template/bought/list", {}, (status, obj) => {
        if (status == 200 && obj?.code === 200 && obj.data != null) {
            bought_templates.value = (<Array<any>>obj.data.templates).map(value => eval_template_order(value))
            console.log(bought_templates.value)
        } else {
            mdui.snackbar({
                message: '获取购买记录失败',
                position: 'bottom',
            });
        }
    })
}

// init bought_templates
get_template_bought_list()
</script>


<template>
    <toolbar title="购买记录">
        <a class="mdui-btn mdui-btn-icon mdui-ripple" @click="get_template_bought_list">
            <i class="mdui-icon material-icons">refresh</i>
        </a>
    </toolbar>
    <page-body>
        <div class="mdui-container">
            <template-order-item
                v-for="template_order in bought_templates"
                :template_order="template_order"
            />
        </div>
    </page-body>
</template>