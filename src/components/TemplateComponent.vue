<script lang="ts" setup>
defineProps<{
    type: string,
    node_prop: NodeProp,
}>()
</script>

<script lang="ts">
import { NodeProp } from "../widget";
import { TYPE_RENDER_MAP } from "../template";

export default {
    name: "TemplateComponent",
    render: (params: { type: string, node_prop: NodeProp }) => {
        console.log(params)
        return TYPE_RENDER_MAP[params.type](params.node_prop)
    }
}
</script>

<style>
@import "../template.css";
</style>