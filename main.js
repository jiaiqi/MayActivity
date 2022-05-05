import App from './App'
import ajax from './common/ajax'

uni.$http = ajax

// #ifndef VUE3
import Vue from 'vue'
Vue.prototype.$http = ajax // 挂载在 Vue 原型链上，通过 this.$http 调用

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
  createSSRApp
} from 'vue'
import * as Pinia from 'pinia';

export function createApp() {
  const app = createSSRApp(App)

  app.use(Pinia.createPinia());

  app.config.globalProperties.$http = ajax // (Options API)：挂载在当前应用上（app 为 createSSRApp 后的应用），也是通过 this.$http 调用
  
  return {
    app,
    Pinia,
  }
}
// #endif
