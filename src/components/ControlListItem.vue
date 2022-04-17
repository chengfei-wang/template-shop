<script lang="ts">
export default {
    name: "ControlListItem",
    components: {
    },
}
</script>

<script lang="ts" setup>
defineProps<{
    title: string,
    vertical?: boolean,
}>()
</script>

<template>
    <div class="mdui-container-fluid mdui-valign list-item" v-if="vertical == false">
        <div class="mdui-col-xs-4 list-item-title">{{ title }}</div>
        <div class="mdui-col-xs-8 list-item-control">
            <slot></slot>
        </div>
    </div>

    <div class="mdui-container-fluid list-item" v-else>
        <div class="mdui-col-md-12 list-item-title">{{ title }}</div>
        <div class="mdui-col-md-12 list-item-control">
            <slot></slot>
        </div>
    </div>

    <div class="normal-divider-micro"></div>
</template>

<style>
.list-item {
    min-height: 36px;
    /* border: 1px solid #e0e0e0; */
    border-radius: 2px;
}

.list-item-title {
    font-size: 14px;
    font-weight: bold;
    /* line-height: 36px; */
    min-height: 36px;
    text-align: start;
}

.list-item-control {
    text-align: end;
}

.list-item-control div {
    height: 100%;
}
</style>