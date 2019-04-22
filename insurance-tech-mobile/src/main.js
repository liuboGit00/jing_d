import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './config/lang'
import filters from './filters'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import Toast from './components/toast/index'
// require styles
// import 'swiper/dist/css/swiper.css'

Vue.use(Toast);
Vue.use(VueAwesomeSwiper, /* { default global options } */)

Vue.config.productionTip = false

console.log(process.env.VUE_APP_URL)
// 如果是非线上环境，加载 VConsole（移动端适用）
// if (process.env.NODE_ENV !== 'production') {
//     var VConsole = require('vconsole/dist/vconsole.min.js');
//     var vConsole = new VConsole();
// }



// 全局过滤器
Object.keys(filters).forEach(filterName => {
    Vue.filter(filterName, filters[filterName])
})

/* eslint-disable no-new */
new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')
