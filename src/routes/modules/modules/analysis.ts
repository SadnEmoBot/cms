/*
 * @Description:
 * @Author:
 * @Date: 2022-01-12 23:38:14
 * @LastEditTime: 2022-04-16 21:13:07
 * @LastEditors: Please set LastEditors
 */
export default [
    {
        path: "/main/analysis/dashboard",
        name: "dashboard",
        // component: () => import("@/views/analysis/dashboard/dashboard.vue"),
        component: () => import("@/views/analysis/dashboard/dashboard2.vue"),
        children: [],
    },
    {
        path: "/main/analysis/overview",
        name: "overview",
        component: () => import("@/views/analysis/overview/overview.vue"),
        children: [],
    },
];
