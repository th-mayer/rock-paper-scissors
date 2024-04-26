import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { socket } from './game-code/client'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
