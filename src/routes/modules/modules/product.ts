/*
 * @Description:
 * @Author:
 * @Date: 2022-01-12 23:39:59
 * @LastEditTime: 2022-01-12 23:39:59
 * @LastEditors: Please set LastEditors
 */
export default [
    {
        path: "/main/product/category",
        name: "category",
        component: () => import("@/views/product/category/category.vue"),
        children: [],
    },
    {
        path: "/main/product/goods",
        name: "goods",
        component: () => import("@/views/product/goods/goods.vue"),
        children: [],
    },
];
