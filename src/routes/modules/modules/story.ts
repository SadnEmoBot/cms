/*
 * @Description:
 * @Author:
 * @Date: 2022-01-12 23:46:04
 * @LastEditTime: 2022-01-12 23:46:05
 * @LastEditors: Please set LastEditors
 */
export default [
    {
        path: "/main/story/chat",
        name: "chat",
        component: () => import("@/views/story/chat/chat.vue"),
        children: [],
    },
    {
        path: "/main/story/list",
        name: "list",
        component: () => import("@/views/story/list/list.vue"),
        children: [],
    },
];
