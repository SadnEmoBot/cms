/*
 * @Description:
 * @Author:
 * @Date: 2022-01-12 23:42:03
 * @LastEditTime: 2022-01-12 23:43:04
 * @LastEditors: Please set LastEditors
 */
export default [
    {
        path: "/main/system/department",
        name: "department",
        component: () => import("@/views/system/department/department.vue"),
        children: [],
    },
    {
        path: "/main/system/menu",
        name: "menu",
        component: () => import("@/views/system/menu/menu.vue"),
        children: [],
    },
    {
        path: "/main/system/role",
        name: "role",
        component: () => import("@/views/system/role/role.vue"),
        children: [],
    },
    {
        path: "/main/system/user",
        name: "user",
        component: () => import("@/views/system/user/user.vue"),
        children: [],
    },
];
