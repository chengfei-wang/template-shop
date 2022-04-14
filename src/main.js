import {createApp, h} from 'vue'
import LoginPage from './components/LoginPage.vue'
import RegisterPage from './components/RegisterPage.vue'
import EditorPage from './components/EditorPage.vue'
import PreviewPage from './components/PreviewPage'
import MainPage from "./components/MainPage.vue";
import NotFoundPage from './components/NotFoundPage.vue';
import HistoryOrderPage from './components/HistoryOrderPage.vue';
import DeployPage from './components/DeployPage.vue';
import ImageBedManagePage from './components/ImageBedManagePage.vue';
import "./main.css"

const routes = {
    '/': MainPage,
    '/login': LoginPage,
    '/editor': EditorPage,
    '/preview': PreviewPage,
    '/register': RegisterPage,
    '/history': HistoryOrderPage,
    '/deploy': DeployPage,
    '/image-bed': ImageBedManagePage,
}

const router = {
    data: () => ({
        currentRoute: window.location.pathname
    }),
    computed: {
        CurrentComponent() {
            return routes[this.currentRoute] || NotFoundPage
        }
    },
    render() {
        return h(this.CurrentComponent)
    }
}

let app = createApp(router)
app.mount('#app')
