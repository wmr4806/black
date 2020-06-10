import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 注册 Vant 组件
import './utils/register'
// 引入 REM 适配
import 'amfe-flexible'
// 引入公共样式
import './styles/index.less'
import request from './utils/request'
Vue.prototype.$axios = request

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
