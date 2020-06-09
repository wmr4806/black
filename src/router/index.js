import Vue from "vue";
import VueRouter from "vue-router";
import Tabbar from '../views/Tabbar.vue'
import Index from '../views/index/Index.vue'
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Tabbar,
    children: [
      {
        path: '',
        component: Index
      }
    ]
  },
  // 登录
  {
    path: "/login",
    component: () => import("../views/Login.vue")
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
