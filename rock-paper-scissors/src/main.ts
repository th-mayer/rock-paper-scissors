import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import Socket from './game-code/client'

const app = createApp(App)
const socket = Socket();

app.use(createPinia())

app.mount('#app')
