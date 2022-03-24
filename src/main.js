import {createApp, h} from 'vue'
import LoginPage from './components/LoginPage.vue'
import RegisterPage from './components/RegisterPage.vue'
import MainPage from "./components/MainPage.vue";
import NotFoundPage from "./components/NotFoundPage.vue";

const routes = {
    '/': MainPage,
    '/login': LoginPage,
    '/register': RegisterPage
}

const Router = {
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

let app = createApp(Router)
app.mount('#app')
