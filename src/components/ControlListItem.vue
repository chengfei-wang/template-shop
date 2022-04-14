<script lang="ts">
export default {
    name: "ControlListItem",
    components: {
    },
}
</script>

<script lang="ts" setup>
defineProps<{
    title: string
}>()
</script>

<template>
    <div class="mdui-container-fluid mdui-valign list-item">
        <div class="mdui-col-xs-4 list-item-title">{{ title }}</div>
        <div class="mdui-col-xs-8 list-item-control">
            <slot></slot>
        </div>
    </div>
</template>

<style>
.list-item {
    height: 36px;
    border: 1px solid #e0e0e0;
    border-radius: 2px;
}

.list-item-title {
    font-size: 14px;
    font-weight: bold;
    line-height: 36px;
    height: 36px;
    text-align: center;
}

.list-item-control {
    text-align: center;
}

.list-item-control div {
    height: 100%;
}
</style>