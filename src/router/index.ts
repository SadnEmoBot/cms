/*
 * @Description:
 * @Author:
 * @Date: 2022-01-02 13:17:32
 * @LastEditTime: 2022-01-02 18:08:39
 * @LastEditors: Please set LastEditors
 */
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        redirect: "/login",
    },
    {
        path: "/login",
        component: () => import("@/views/login/login.vue"),
    },
    {
        path: "/main",
        component: () => import("@/views/main/main.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
