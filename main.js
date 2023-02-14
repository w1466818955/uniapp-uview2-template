import Vue from 'vue'
import App from './App'

// 引入uview-ui
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
// 如此配置即可
uni.$u.config.unit = 'rpx'
// 挂载config配置项
import config from "./http/config.js"
Vue.prototype.$config = config;
// 挂载api
import api from "./apis"
Vue.prototype.$api = api;

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
