/*
 * @Description: 登录相关的路由配置
 * @Author:
 * @Date: 2022-01-07 23:08:09
 * @LastEditTime: 2022-01-09 19:08:31
 * @LastEditors: Please set LastEditors
 */
// import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// import { RouteRecordRaw } from "vue-router";

// const routes: Array<RouteRecordRaw> = [
//     {
//         path: "/",
//         redirect: "/login",
//     },
//     {
//         path: "/login",
//         component: () => import("@/views/login/login.vue"),
//     },
//     {
//         path: "/main",
//         component: () => import("@/views/main/main.vue"),
//     },
// ];

// const router = createRouter({
//     history: createWebHistory(process.env.BASE_URL),
//     routes,
// });

// export default router;

// export const routes: Array<RouteRecordRaw> = [ //这里之后再添加泛型 但现在还不知道在哪里添加
export default [
    {
        path: "/",
        redirect: "/main",
    },
    {
        path: "/login",
        component: () => import("@/views/login/login.vue"),
        meta: {
            title: "登录首页",
        },
    },
    {
        path: "/main",
        component: () => import("@/views/main/main.vue"),
    },
];
