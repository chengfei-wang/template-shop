<script lang="ts">
import { ref } from "vue";
import Toolbar from "./Toolbar.vue";
import PageBody from "./PageBody.vue";
import { request } from "../Request";
import { eval_template, Template } from "../Model";
import mdui from "mdui";

export default {
    name: "DeployPage",
    components: { Toolbar, PageBody }
}

</script>


<script setup lang="ts">
interface DeployType {
    id: string;
    name: string
    price: number
    description: string
}

interface DeployAddition {
    id: string
    name: string
    price: number
    checked: boolean,
    description: string
}

const deploy_type_list: DeployType[] = [
    {
        id: "0",
        name: "静态部署",
        price: 0,
        description: "适合无需交互的网站"
    },
    {
        id: "1",
        name: "动态部署",
        price: 499,
        description: "适合有数据提交的网站"
    }
]

const deploy_addition_list = ref<DeployAddition[]>([
    { id: "1", name: "邮箱验证服务", price: 500, checked: false, description: "用户访问前验证邮箱是否真实" },
    { id: "2", name: "短信验证服务", price: 1000, checked: false, description: "用户访问前手机号码是否真实" },
    { id: "3", name: "大容量数据服务", price: 1000, checked: false, description: "可存储数据存储量增加10000条(初始1000条)" },
    { id: "4", name: "数据导出服务(Beta)", price: 1, checked: false, description: "可以将表单数据进行解析并按表格导出" },
    { id: "5", name: "访问统计服务(Beta)", price: 1, checked: false, description: "统计网站用户访问状况" },
])

const all_templates = ref<Template[]>([]);

const deploy_price = ref<number>(0)

const deploy_template = ref<string | undefined>(undefined)
const deploy_type = ref<string | undefined>("0")

function get_all_templates() {
    request("template/list", {}, (status, obj) => {
        if (status == 200 && obj?.code === 200 && obj.data !== null) {
            all_templates.value = (<Array<any>>obj.data.templates).map(value => eval_template(value))
        } else {
            mdui.snackbar({
                message: "获取模板列表失败",
                position: "bottom",
            })
        }
    })
}

function deploy_page() {
    console.log("Deploying page...")
    console.log("Deploy type:", deploy_type.value)
    console.log("Deploy template:", deploy_template.value)
    console.log("Deploy addition:", deploy_addition_list.value.filter(value => value.checked).map(value => value.name))
}

function select_template(event: Event) {
    const target = event.target as HTMLInputElement
    deploy_template.value = target.value
}

get_all_templates()
</script>

<template>
    <toolbar title="一键部署">
        <div class="mdui-typo-caption">预计消费 ¥{{ deploy_price / 100 }}</div>
        <a class="mdui-btn mdui-btn-icon mdui-ripple" @click="deploy_page">
            <i class="mdui-icon material-icons">check</i>
        </a>
    </toolbar>
    <page-body>
        <div class="mdui-container">
            <div>
                <p class="mdui-typo-title">部署页面</p>
            </div>
            <select class="mdui-select" v-model="deploy_template" @change="select_template">
                <option :value="undefined" selected disabled>请选择</option>
                <option
                    v-for="template in all_templates"
                    :key="template.tid"
                    :value="template.tid"
                >{{ template.title }}</option>
            </select>

            <div class="normal-divider"></div>

            <div>
                <p class="mdui-typo-title">部署类型</p>
            </div>
            <div class="mdui-container-fluid">
                <div class="mdui-col-md-4" v-for="option in deploy_type_list">
                    <label class="mdui-radio">
                        <input type="radio" :value="option.id" v-model="deploy_type" />
                        <i class="mdui-radio-icon"></i>
                        {{ option.name }}&nbsp;
                        <span class="mdui-typo-caption">¥{{ option.price / 100 }}</span>
                    </label>
                </div>
            </div>

            <div class="normal-divider"></div>

            <p class="mdui-typo-title">附加服务</p>

            <div class="mdui-container-fluid">
                <div class="mdui-col-md-4" v-for="addition in deploy_addition_list">
                    <label class="mdui-checkbox">
                        <input type="checkbox" :value="addition.id" v-model="addition.checked" />
                        <i class="mdui-checkbox-icon"></i>
                        {{ addition.name }}&nbsp;
                        <span
                            class="mdui-typo-caption"
                        >¥{{ addition.price / 100 }}</span>
                    </label>
                </div>
            </div>
        </div>
    </page-body>
</template>