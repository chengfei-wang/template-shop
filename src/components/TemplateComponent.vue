<script lang="tsx">
import { NodeProp } from "../Widget";
import { type_render_functions, template_unknown } from "./Template";

export default {
    name: "TemplateComponent",
    props: {
        type: String,
        node_prop: NodeProp
    },
    render: (params: { type: string, node_prop: NodeProp }) => {
        let render = type_render_functions[params.type] || template_unknown
        return render(params.node_prop)
    }
}
</script>