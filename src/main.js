import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 注册 Vant 组件
import './utils/register'
// 引入 REM 适配
import 'amfe-flexible'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
