<script lang="ts">
import { computed, ComputedRef, ref } from "vue";
import Toolbar from "./Toolbar.vue";
import PageBody from "./PageBody.vue";
import { request } from "../Request";
import { eval_template, Template, DeployOption } from "../Model";
import mdui from "mdui";

export default {
    name: "DeployPage",
    components: { Toolbar, PageBody }
}
</script>

<script setup lang="ts">
const all_templates = ref<Template[]>([]);
const deploy_template = ref<string | undefined>(undefined)

const DEPLOY_OPTION_GROUP = ref<{
    DEPLOY_TYPE: DeployOption[],
    USER_VERIFY: DeployOption[],
    DEPLOY_ADDITION: DeployOption[],
}>({
    DEPLOY_TYPE: [],
    USER_VERIFY: [],
    DEPLOY_ADDITION: [],
})

const deploy_type = ref<string | undefined>()
const user_verify = ref<string | undefined>()
const deploy_addition = ref<string[]>([])

const deploy_price: ComputedRef<number> = computed(() => {
    let price = 0;
    if (deploy_type.value) {
        price += DEPLOY_OPTION_GROUP.value.DEPLOY_TYPE.find(x => x.id === deploy_type.value)?.price ?? 0;
    }
    if (user_verify.value) {
        price += DEPLOY_OPTION_GROUP.value.USER_VERIFY.find(x => x.id === user_verify.value)?.price ?? 0;
    }
    deploy_addition.value.forEach(item => {
        price += DEPLOY_OPTION_GROUP.value.DEPLOY_ADDITION.find(x => x.id === item)?.price ?? 0;
    })
    return price;
});

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

function get_deploy_option_group() {
    request('deploy/options', {}, (status, obj) => {
        if (status == 200 && obj?.code === 200 && obj.data !== null) {
            const options = obj.data
            DEPLOY_OPTION_GROUP.value = {
                DEPLOY_TYPE: options.DEPLOY_TYPE,
                USER_VERIFY: options.USER_VERIFY,
                DEPLOY_ADDITION: options.DEPLOY_ADDITION,
            }
            console.log(DEPLOY_OPTION_GROUP.value)
        } else {
            mdui.snackbar({
                message: "获取发布选项失败",
                position: "bottom",
            })
        }
    })
}

function deploy_page() {
    if (deploy_template.value === undefined) {
        mdui.snackbar({
            message: "请选择部署页面",
            position: "bottom",
        })
        return
    }
    if (deploy_type.value === undefined) {
        mdui.snackbar({
            message: "请选择发布类型",
            position: "bottom",
        })
        return
    }
    if (user_verify.value === undefined) {
        mdui.snackbar({
            message: "请选择用户验证方式",
            position: "bottom",
        })
        return
    }
    console.log("Deploying page...")
    // console.log(`deploy_template: ${deploy_template.value}`)
    // console.log(`deploy_type: ${deploy_type.value}`)
    // console.log(`user_verify: ${user_verify.value}`)
    // console.log(`deploy_addition: ${deploy_addition.value}`)
    // console.log(`deploy_price: ¥${deploy_price.value / 100}`)
    let deploy_config = {
        template: deploy_template.value,
        deployType: deploy_type.value,
        userVerify: user_verify.value,
        deployAddition: deploy_addition.value,
    }
    console.log(deploy_config)
    request('deploy/page', deploy_config, (status, obj) => {
        if (status == 200 && obj?.code === 200) {
            if (obj.data.pageId) {
                mdui.snackbar({
                    message: "部署成功",
                    position: "bottom",
                    buttonText: "查看",
                    onButtonClick: () => {
                        window.location.href = '/deploy/history'
                    }
                })
            } else {
                mdui.snackbar({
                    message: "部署成功",
                    position: "bottom",
                })
            }
        } else {
            mdui.snackbar({
                message: obj.message || "部署失败",
                position: "bottom",
            })
        }
    })
}

get_all_templates()
get_deploy_option_group()
</script>

<template>
    <toolbar title="一键部署">
        <div class="mdui-typo-caption">¥{{ deploy_price / 100 }}</div>
        <a class="mdui-btn mdui-btn-icon" @click="deploy_page">
            <i class="mdui-icon material-icons">check</i>
        </a>
    </toolbar>
    <page-body>
        <div class="mdui-container">
            <div class="mdui-typo-title">
                <p>部署页面</p>
            </div>
            <el-select v-model="deploy_template" placeholder="选择部署页面">
                <el-option v-for="template in all_templates" :key="template.tid" :label="template.title"
                    :value="template.tid">
                </el-option>
            </el-select>
            <div class="normal-divider"></div>

            <div>
                <p class="mdui-typo-title">部署类型</p>
            </div>
            <div class="mdui-container-fluid">
                <el-radio-group v-model="deploy_type">
                    <el-radio-button v-for="option in DEPLOY_OPTION_GROUP.DEPLOY_TYPE" :key="option.id"
                        :label="option.id">
                        {{ option.name }}&nbsp;¥{{ option.price / 100 }}
                    </el-radio-button>
                </el-radio-group>
            </div>
            <div class="normal-divider"></div>

            <div>
                <p class="mdui-typo-title">用户验证</p>
            </div>
            <div class="mdui-container-fluid">
                <el-radio-group v-model="user_verify" size="small">
                    <el-radio-button v-for="option in DEPLOY_OPTION_GROUP.USER_VERIFY" :key="option.id"
                        :label="option.id">
                        {{ option.name }}&nbsp;¥{{ option.price / 100 }}
                    </el-radio-button>
                </el-radio-group>
            </div>
            <div class="normal-divider"></div>

            <p class="mdui-typo-title">附加服务</p>
            <div class="mdui-container-fluid">
                <el-checkbox-group v-model="deploy_addition">
                    <el-checkbox v-for="option in DEPLOY_OPTION_GROUP.DEPLOY_ADDITION" :key="option.id"
                        :label="option.id">
                        {{ option.name }}&nbsp;<span class="mdui-typo-caption">¥{{ option.price / 100 }}</span>
                    </el-checkbox>
                </el-checkbox-group>
            </div>
        </div>
    </page-body>
</template>