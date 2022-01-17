/*
 * @Description: 用户权限 请求接口
 * @Author:
 * @Date: 2022-01-03 16:14:27
 * @LastEditTime: 2022-01-17 00:03:21
 * @LastEditors: Please set LastEditors
 */
export default [
    // {
    //     name: "getUsersList",
    //     method: "POST",
    //     desc: "查询用户列表",
    //     path: "/adminservice/sysusers/query?page={page}&size={pageSize}",
    // },
    {
        name: "getTest",
        method: "GET",
        desc: "查询用户列表",
        path: "/home/multidata",
        host: "cms",
        // showLoading: false,
    },
    {
        name: "getUserInfo",
        method: "GET",
        desc: "获取用户信息",
        path: "/users/{id}",
        host: "cms",
        // showLoading: true,
    },
    {
        name: "getUserMenus",
        method: "GET",
        desc: "获取用户菜单",
        path: "/role/{id}/menu",
        host: "cms",
    },
];
