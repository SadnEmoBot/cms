/*
 * @Description: 实例化router插件
 * @Author:
 * @Date: 2022-01-07 16:51:27
 * @LastEditTime: 2022-01-07 23:24:09
 * @LastEditors: Please set LastEditors
 */
// import Router from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
import ROUTES from "../routes";
// import { ROUTER_DEFAULT_CONFIG } from "../config/index";
import { routerBeforeEachFunc } from "../config/interceptors/router";

// Vue.use(Router);

// 注入默认配置和路由表
// const routerInstance = new Router({
const routerInstance = createRouter({
    // ...ROUTER_DEFAULT_CONFIG,
    history: createWebHistory(),
    routes: ROUTES,
    // base: URL_PREFIX,
});
// 注入拦截器
routerInstance.beforeEach(routerBeforeEachFunc);

export default routerInstance;
