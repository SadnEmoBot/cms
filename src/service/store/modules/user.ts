/*
 * @Description:
 * @Author:
 * @Date: 2022-01-08 18:24:09
 * @LastEditTime: 2022-01-17 17:38:12
 * @LastEditors: Please set LastEditors
 */

// const state = () => ({
//     token: "", // jwt
//     userInfo: {}, // 用户信息
// });
import api from "@/plugins/api";
import { Module } from "vuex";

import localCache from "@/utils/cache";
import router from "@/plugins/router";

import { ILoginState, IRootState } from "../type";

import { mapMenusToRoutes, mapMenusToPermissions } from "@/utils/map-menus";

// 改为直接从 type.ts 引入
// interface ILoginState {
//     token: string;
//     userInfo: any;
//     userMenus: any;
// }
// interface IRootState {
//     name: string;
//     age: number;
// }
let userInfos = {} as any;
let Commonid = 1;
let menusId = 1;

const loginModule: Module<ILoginState, IRootState> = {
    namespaced: true,
    state() {
        return {
            token: "", // jwt
            userInfo: {}, // 用户信息
            userMenus: [], // 用户菜单信息

            permissions: [], // 用户按钮权限
        };
    },
    actions: {
        accountLoginAction({ commit, dispatch }, payload: any) {
            commit("SET_TOKEN", "");

            api["login/authLogin"](payload).then(async (res: any) => {
                const { id, token } = res.data;
                Commonid = id;
                commit("SET_TOKEN", token);
                localCache.setCache("token", token);

                // 发送初始化的请求(完整的role/department)
                dispatch("getInitialDataAction", null, { root: true });

                await Promise.all([
                    api["user/getUserInfo"]({
                        id: Commonid,
                    }),
                    api["user/getUserMenus"]({
                        id: menusId,
                    }),
                ]).then(([res1, res2]) => {
                    userInfos = res1.data;
                    menusId = userInfos.role.id;
                    commit("SET_USER_INFO", res1.data);
                    localCache.setCache("userInfo", res1.data);

                    commit("SET_USER_MENUS", res2.data);
                    localCache.setCache("userMenus", res2.data);
                });
            });
            // // 获取用户信息
            // api["user/getUserInfo"]({
            //     id: Commonid,
            // }).then((res: any) => {
            //     // console.log(res.data);
            //     userInfos = res.data;
            //     commit("SET_USER_INFO", res.data);
            //     localCache.setCache("userInfo", res.data);
            // });
            // //获取用户菜单
            // api["user/getUserMenus"]({
            //     id: userInfos.role.id,
            // }).then((res: any) => {
            //     console.log(res.data);
            //     commit("SET_USER_MENUS", res.data);
            //     localCache.setCache("userMenus", res.data);
            // });

            // 跳转首页
            router.push("/main");
        },

        //加载本地存储数据 但是不知道为什么在f12 存储里刷新了vuex还是会有
        // 答 用了presistedState插件

        //既然用了createPersistedState持久化vuex 就不在main.ts里调用这个函数了
        loadLocalData({ commit, dispatch }) {
            const token = localCache.getCache("token");
            if (token) {
                commit("SET_TOKEN", token);
                // 发送初始化的请求(完整的role/department)
                dispatch("getInitialDataAction", null, { root: true });
            }
            const userInfo = localCache.getCache("userInfo");
            if (userInfo) {
                commit("SET_USER_INFO", userInfo);
            }
            const userMenus = localCache.getCache("userMenus");
            if (userMenus) {
                commit("SET_USER_MENUS", userMenus);
            }
        },
    },
    // 修改state用mutations
    mutations: {
        // 设置 token
        SET_TOKEN(state, resData: string) {
            state.token = resData;
        },
        // 设置用户信息
        SET_USER_INFO(state, resData: any) {
            state.userInfo = resData;
        },
        // 设置用户菜单信息
        SET_USER_MENUS(state, resData: any) {
            state.userMenus = resData;

            //userMenus => routes
            const routes = mapMenusToRoutes(resData);
            // console.log(routes);

            // 将routes 放进 main.children
            routes.forEach((route) => {
                router.addRoute("main", route); //这里看下addRoute()
            });

            // 获取用户按钮权限
            const permissions = mapMenusToPermissions(resData);
            state.permissions = permissions;
        },
    },
};

export default loginModule;
