import Vue from 'vue'
import ElementUI from 'element-ui'

import App from './App'

import '@styles/base.scss'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

new Vue({
    render: h => h(App)
}).$mount('#app')
