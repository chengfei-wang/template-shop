import { ref, defineComponent, watch } from "vue";
import { toDataURL } from "qrcode";

const QrCodeImage = defineComponent({
    name: "QrCodeImage",
    props: {
        text: {
            type: String,
            required: false
        }
    },
    setup(props) {
        const qrCode = ref<string>()

        if (props.text) {
            toDataURL(props.text).then(url => {
                console.log(url)
                qrCode.value = url
            })
        }

        const content = (text?: string) => {
            if (text && text.length > 0) {
                return (
                    <div style={{textAlign: 'center'}}>
                        <img src={qrCode.value} alt={props.text} style={{ width: '128px', height: '128px' }} />
                    </div>
                )
            } else {
                return (
                    <div>Loading...</div>
                )
            }
        }

        return () => content(props.text)
    }
});

export default QrCodeImage;