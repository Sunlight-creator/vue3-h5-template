import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'amfe-flexible'
import 'normalize.css/normalize.css'
import 'virtual:svg-icons-register'
import 'virtual:uno.css'
import './assets/main.css'
import './utils/permission' 
import App from './App.vue'
import router from './router'
import ToastPlugin from './plugins/toast'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia) 
app.use(ToastPlugin)
app.mount('#app')
