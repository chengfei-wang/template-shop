<script lang="tsx">
import Toolbar from './Toolbar.vue';
import PageBody from './PageBody.vue';

import mdui from 'mdui';
import { ref, computed, watch, defineComponent, PropType } from 'vue';
import { request } from '../Request';
import { DeployInfo, AccessLog, DeployOption } from '../Model';
import { Buffer } from 'buffer';
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, registerables } from 'chart.js';
import { ElButton, ElTable, ElTableColumn } from 'element-plus';

ChartJS.register(...registerables)

function get_days_between(start: Date, end: Date): Date[] {
    const days: Date[] = []
    let current = start
    while (current <= end) {
        days.push(current)
        current = new Date(current.getTime() + 24 * 60 * 60 * 1000)
    }
    return days
}

const AccessStatusChart = defineComponent({
    name: 'AccessStatusChart',
    components: {
        Line,
    },
    props: {
        data: {
            type: Object as PropType<{
                labels: string[];
                datasets: {
                    label: string;
                    data: number[];
                    backgroundColor: string;
                }[];
            }>,
            required: true
        },
    },
    setup(props) {
        return () => (
            <Line
                chartData={props.data}
                chartOptions={{
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                        duration: 0 // 一般动画时间
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 5
                            },
                        },
                        x: {
                            offset: true,
                        }
                    },
                }}
            />
        );
    }
})


const FromDataTable = defineComponent({
    name: 'FromDataTable',
    components: {
        ElTable,
        ElTableColumn,
    },
    props: {
        headers: {
            type: Object as PropType<{ [key: string]: string }>,
            required: true,
        },
        data: {
            type: Array as PropType<{
                submit_id: string,
                submit_ip_address: string,
                submit_time: Date,
                submit_user?: string,
                submit_content: { [key: string]: string },
            }[]>,
            required: true,
        },
    },
    setup(props) {
        const coloums = computed(() => {
            const coloums: { [key: string]: (string | undefined) }[] = props.data.map(item => {
                let column: { [key: string]: (string | undefined) } = {}
                for (const key in props.headers) {
                    column[key] = item.submit_content[key]
                }
                column['_submit_id'] = item.submit_id
                column['_submit_time'] = item.submit_time.toLocaleString()
                column['_submit_ip_address'] = item.submit_ip_address
                column['_submit_user'] = item.submit_user

                return column
            })

            return coloums
        })
        return () => (
            <div>
                <ElTable data={coloums.value} style={{ width: '100%' }} size='small'>
                    <ElTableColumn label="提交时间" prop="_submit_time" sortable={true} fixed={true} />
                    <ElTableColumn label="提交用户" prop="_submit_user" sortable={true} fixed={true} />
                    {
                        Object.keys(props.headers).map(key => {
                            return (
                                <ElTableColumn
                                    label={props.headers[key]}
                                    prop={key}
                                    sortable={true}
                                />
                            )
                        })
                    }
                </ElTable>
            </div>
        );
    }
})

export default {
    name: "DeployHistoryPage",
    components: {
        Toolbar,
        PageBody,
        AccessStatusChart,
        FromDataTable,
        ElButton,
    },
}
</script>

<script lang="tsx" setup>
const deploy_id = ref<string>("")
const deploy_info = ref<DeployInfo>()
const deploy_info_computed = computed(() => {
    if (deploy_info.value === undefined) {
        return undefined
    }

    const value = deploy_info.value

    const template = value.deployTemplate;
    const deploy_type = DEPLOY_OPTION_GROUP.value.DEPLOY_TYPE.find(x => x.id === value.deployType);
    const user_verify = DEPLOY_OPTION_GROUP.value.USER_VERIFY.find(x => x.id === value.userVerify);
    const deploy_addition: DeployOption[] = [];
    value.deployAddition.map(item => {
        let option = DEPLOY_OPTION_GROUP.value.DEPLOY_ADDITION.find(x => x.id === item);
        if (option) {
            deploy_addition.push(option);
        }
    })
    const deploy_options = [deploy_type, user_verify, ...deploy_addition]
    return {
        deployId: value.deployId,
        deployTemplate: template,
        deployType: deploy_type,
        userVerify: user_verify,
        deployAddition: deploy_addition,
        price: value.price,
        pagePath: value.pagePath,
        deployTime: value.deployTime,
        deployOptions: deploy_options,
    }
})


const access_logs = ref<AccessLog[]>([])

const page_form_data = ref<
    {
        headers: { [key: string]: string },
        data: {
            submit_id: string,
            submit_ip_address: string,
            submit_time: Date,
            submit_user?: string,
            submit_content: { [key: string]: string },
        }[]
    }
>({
    headers: {},
    data: [],
})

const DEPLOY_OPTION_GROUP = ref<{
    DEPLOY_TYPE: DeployOption[],
    USER_VERIFY: DeployOption[],
    DEPLOY_ADDITION: DeployOption[],
}>({
    DEPLOY_TYPE: [],
    USER_VERIFY: [],
    DEPLOY_ADDITION: [],
})

const access_log_available = computed(() => {
    return deploy_info.value?.deployAddition.includes("DEPLOY_ADDITION_ACCESS_STATS")
})

const access_status_computed = computed(() => {
    if (access_logs.value.length === 0) {
        return {
            labels: [new Date().toLocaleDateString()],
            datasets: [
                {
                    label: '访问次数',
                    data: [0],
                    borderColor: 'rgba(255, 99, 132, 0.8)',
                    backgroundColor: 'rgba(255, 99, 132, 1)',
                },
                {
                    label: '访问人数',
                    data: [0],
                    borderColor: 'rgba(54, 162, 235, 0.8)',
                    backgroundColor: 'rgba(54, 162, 235, 1)',
                }
            ],
        }
    }
    const group = access_logs.value.reduce((group: { [key: string]: AccessLog[] }, current) => {
        const date = new Date(current.accessTime).toLocaleDateString()
        if (group[date]) {
            group[date].push(current)
        } else {
            group[date] = [current]
        }
        return group
    }, {})

    const _labels = Object.keys(group).sort((a, b) => {
        return new Date(a).getTime() - new Date(b).getTime()
    })
    const labels = get_days_between(new Date(_labels[0]), new Date(_labels[_labels.length - 1])).map(date => date.toLocaleDateString())

    return {
        labels,
        datasets: [
            {
                label: '访问次数',
                data: labels.map(label => (group[label] ?? []).length),
                backgroundColor: 'rgba(255, 99, 132, 0.8)',
            },
            {
                label: '访问人数',
                data: labels.map(label => new Set((group[label] ?? []).map(log => log.accessIpAddress)).size),
                backgroundColor: 'rgba(54, 162, 235, 0.8)',
            },
        ]
    }
})

const access_count_today = computed(() => {
    const today = new Date().toLocaleDateString()
    return {
        count: access_logs.value.filter(x => new Date(x.accessTime).toLocaleDateString() === today).length,
        people: new Set(access_logs.value.filter(x => new Date(x.accessTime).toLocaleDateString() === today).map(x => x.accessIpAddress)).size,
    }
})

const export_data_available = computed(() => {
    return deploy_info.value?.deployAddition.includes("DEPLOY_ADDITION_EXPORT_DATA")
})

const large_data_available = computed(() => {
    return deploy_info.value?.deployAddition.includes("DEPLOY_ADDITION_LARGE_DATA")
})

const params = new URLSearchParams(location.search)
const _did = params.get('did')
if (_did != null && _did.length > 0) {
    deploy_id.value = _did
}

function get_page_deploy_info() {
    request(`deploy/info/${deploy_id.value}`, {}, (status, obj) => {
        console.log(status, obj)
        if (status === 200 && obj.code === 200 && obj.data != null) {
            deploy_info.value = {
                deployId: obj.data.deployId,
                deployTemplate: obj.data.deployTemplate,
                deployType: obj.data.deployType,
                userVerify: obj.data.userVerify,
                deployAddition: obj.data.deployAddition.split(' '),
                price: obj.data.price,
                pagePath: obj.data.pagePath,
                deployTime: new Date(obj.data.deployTime),
            }
        } else {
            mdui.snackbar({
                message: obj.message,
                position: 'bottom',
                onClosed: () => {
                    window.location.href = '/deploy/history'
                }
            });
        }
    })
}

function get_page_access_logs() {
    request(`page/access/statistics/${deploy_id.value}`, {}, (status, obj) => {
        if (status === 200 && obj.code === 200 && obj.data != null) {
            let accessLogs = obj.data.accessLogs
            access_logs.value = accessLogs.map((item: any) => {
                return {
                    accessId: item.accessId,
                    accessPage: item.accessPage,
                    accessIpAddress: item.accessIpAddress,
                    accessTime: new Date(item.accessTime)
                }
            })
        } else {
            console.log('get_page_access_data', obj)
        }
    })
}

function get_page_form_data() {
    request(`page/form/data/${deploy_id.value}`, {}, (status, obj) => {
        if (status === 200 && obj.code === 200 && obj.data != null) {
            let formData = obj.data.data
            let headers: { [key: string]: string } = obj.data.fields.reduce((header: any, item: any) => {
                header[item.name] = item.desc
                return header
            }, {})
            page_form_data.value.headers = headers
            page_form_data.value.data = formData.map((item: any) => {
                return {
                    submit_id: item.submit_id,
                    submit_ip_address: item.submit_ip_address,
                    submit_time: new Date(item.submit_time),
                    submit_user: item.submit_user,
                    submit_content: item.submit_content,
                }
            })
            console.log(headers, formData)
        } else {
            console.log('get_page_form_data', obj)
        }
    })
}

function base64ToBlob(data: string, mime: string) {
    let buffer = Buffer.from(data, 'base64')
    let ab = new ArrayBuffer(buffer.length)
    let ia = new Uint8Array(ab)
    for (let i = 0; i < buffer.length; i++) {
        ia[i] = buffer[i]
    }
    return new Blob([ab], { type: mime })
}

function export_form_data_xlsx() {
    request(`page/form/data/export/${deploy_id.value}`, {}, (status, obj) => {
        if (status === 200 && obj.code === 200 && obj.data != null) {
            const base64: string = obj.data
            const blob = base64ToBlob(base64, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `${deploy_id.value}.xlsx`
            a.click()
            window.URL.revokeObjectURL(url)
        } else {
            console.log('export_form_data_xlsx', status, obj)
            mdui.snackbar({
                message: obj.message,
                position: 'bottom',
            });
        }
    })
}

function refresh_all() {
    get_page_access_logs()
    get_page_form_data()
}

watch(deploy_info, (newValue, oldValue) => {
    console.log(newValue, oldValue)
    if (newValue !== undefined && newValue !== oldValue && access_log_available) {
        refresh_all()
    }
})

function get_deploy_option_group() {
    request("deploy/options", {}, (status, obj) => {
        if (status == 200 && obj?.code === 200 && obj.data !== null) {
            DEPLOY_OPTION_GROUP.value = obj.data
        }
    })
}
get_deploy_option_group()
get_page_deploy_info()
</script>

<template>
    <toolbar title="页面数据详情">
        <a class="mdui-btn mdui-btn-icon" @click="refresh_all">
            <i class="mdui-icon material-icons">refresh</i>
        </a>
    </toolbar>

    <page-body>
        <div class="mdui-container">
            <el-collapse accordion>
                <el-collapse-item :title="`页面配置信息&nbsp;&nbsp;&nbsp;&nbsp;¥${deploy_info_computed.price / 100}`"
                    v-if="deploy_info_computed">
                    <div class='mdui-list mdui-list-dense'>
                        <div class='mdui-list-item' v-for="option in deploy_info_computed.deployOptions">
                            <div class="mdui-list-item-content">
                                <div class="mdui-list-item-title">{{ option?.name }} ¥{{ (option?.price || 0) / 100 }}
                                </div>
                                <div class="mdui-list-item-text mdui-list-item-one-line">
                                    <span class="mdui-text-color-grey">{{ option?.description }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </el-collapse-item>

                <el-collapse-item v-if="access_log_available">
                    <template #title>
                        今日访问统计&nbsp;&nbsp;&nbsp;&nbsp;
                        <i class="mdui-icon material-icons">remove_red_eye</i> {{ access_count_today.count }}
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <i class="mdui-icon material-icons">person</i> {{ access_count_today.people }}
                    </template>
                    <access-status-chart :data="access_status_computed" />
                </el-collapse-item>

                <el-collapse-item v-if="export_data_available">
                    <template #title>
                        表单数据查看
                        <el-button @click.stop="export_form_data_xlsx" size="small" class="export-xlsx-button">
                            导出数据
                        </el-button>
                    </template>
                    <from-data-table :headers="page_form_data.headers" :data="page_form_data.data" />
                </el-collapse-item>
            </el-collapse>
        </div>
    </page-body>
</template>

<style>
.export-xlsx-button {
    margin: 0 16px;
}
</style>