/*
 * @Description:
 * @Author:
 * @Date: 2022-01-15 16:35:04
 * @LastEditTime: 2022-01-16 18:30:16
 * @LastEditors: Please set LastEditors
 */
export default [
    // {
    //     name: "getPageListData",
    //     method: "POST",
    //     desc: "获取用户列表数据",
    //     path: "/users/list",
    //     // path: "/role/list",
    //     host: "cms",
    // },
    {
        name: "users",
        method: "POST",
        desc: "获取用户列表数据",
        path: "/users/list",
        host: "cms",
        showLoading: true,
    },
    {
        name: "role",
        method: "POST",
        desc: "获取角色列表数据",
        path: "/role/list",
        host: "cms",
        showLoading: true,
    },
    {
        name: "goods",
        method: "POST",
        desc: "获取商品列表数据",
        path: "/goods/list",
        host: "cms",
        showLoading: true,
    },
    {
        name: "menu",
        method: "POST",
        desc: "获取菜单列表数据",
        path: "/menu/list",
        host: "cms",
        showLoading: true,
    },
    {
        name: "deleteusers",
        method: "DELETE",
        desc: "删除用户数据",
        path: "/users/{id}",
        host: "cms",
        showLoading: true,
    },
];
