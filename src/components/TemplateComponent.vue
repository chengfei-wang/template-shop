<script lang="tsx">
import { NodeProp } from "../widget";
import { type_render_functions, template_unknown } from "../template";

export default {
    name: "TemplateComponent",
    props: {
        type: String,
        node_prop: NodeProp
    },
    render: (params: { type: string, node_prop: NodeProp }) => {
        let render = type_render_functions[params.type]
        if (render === undefined) {
            render = template_unknown
        }
        return render(params.node_prop)
    }
}
</script>