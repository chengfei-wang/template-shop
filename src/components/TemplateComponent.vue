import { NodeProp } from "../widget";
import { TYPE_RENDER_MAP } from "../template";
import {h, defineComponent} from "vue";

defineComponent({
    props: {
        type: {type: String},
        node_prop: {type: NodeProp},
    },
    render: (h) => {
        return h(TYPE_RENDER_MAP[this.type](this.node_prop))
    }
})

