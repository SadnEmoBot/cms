/*
 * @Description: 登录相关的路由配置
 * @Author:
 * @Date: 2022-01-07 23:08:09
 * @LastEditTime: 2022-01-13 01:00:28
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
// import LoginLayout from "@/views/login/login.vue";
export default [
    {
        path: "/",
        redirect: "/main",
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/login/login.vue"),
        meta: {
            title: "登录首页",
        },
    },
    {
        path: "/main",
        name: "main",
        component: () => import("@/views/main/main.vue"),
    },
    // {
    //     path: "/login",
    //     component: LoginLayout,
    //     children: [
    //         {
    //             path: "/main",
    //             component: () => import("@/views/main/main.vue"),
    //             meta: {
    //                 title: "登录",
    //                 forbidAuthed: false,
    //                 requiresAuth: false,
    //             },
    //         },
    //     ],
    // },
];
