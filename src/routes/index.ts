/*
 * @Description:
 * @Author:
 * @Date: 2022-01-07 16:53:37
 * @LastEditTime: 2022-01-13 01:01:15
 * @LastEditors: Please set LastEditors
 */
import { importAll } from "@/utils/common";

import type { RouteRecordRaw } from "vue-router";

const routeModules = importAll(
    require.context("@/routes/modules", true, /\.ts$/) //新增了一个modules文件夹 把除开login的子文件放进去了 所以这里改true深层遍历
);
// // 业务路由
// const businessRoutes = routeModules.reduce(
//     (finallRoutes, routerModule) => finallRoutes.concat(routerModule.module),
//     []
// );
// 完整路由表
// const routes = [
//     {
//         path: "/login",
//         component: () => import("@/views/login/login.vue"),
//         children: businessRoutes,
//     },
// ];
const routes: RouteRecordRaw[] = routeModules.reduce(
    (finallRoutes, routerModule) => finallRoutes.concat(routerModule.module),
    []
) as any;

routes.push({
    path: "/:pathMatch(.*)*", // 错误路由[写在最后一个] 或者直接路由注册也行
    component: () => import("@/views/404/404.vue"),
    meta: {
        requiresAuth: false,
    },
});

export default routes;
