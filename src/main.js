import {createApp} from 'vue'
import App from './App.vue'

import {login} from "./user";

let app = createApp(App)
app.mount('#app')

login("11@qq.com", "123456")