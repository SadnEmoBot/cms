/*
 * @Description:
 * @Author:
 * @Date: 2022-01-15 16:05:05
 * @LastEditTime: 2022-01-16 21:52:30
 * @LastEditors: Please set LastEditors
 */
import api from "@/plugins/api";
import { Module } from "vuex";
import { ISystemState, IRootState } from "../type";

const systemModule: Module<ISystemState, IRootState> = {
    namespaced: true,
    state() {
        return {
            usersList: [], //用户列表
            usersCount: 0, //用户总人数
            roleList: [],
            roleCount: 0,

            goodsList: [],
            goodsCount: 0,

            menuList: [],
            menuCount: 0,
        };
    },
    getters: {
        pageListData(state) {
            return (pageName: string) => {
                // switch (pageName) {
                //     case "users":
                //         return state.usersList;
                //     case "role":
                //         return state.roleList;
                // }
                return (state as any)[`${pageName}List`] ?? []; //这里需要把state里的userList改为usersList
            };
        },
        pageListCount(state) {
            return (pageName: string) => {
                return (state as any)[`${pageName}Count`] ?? [];
            };
        },
    },
    actions: {
        getPageListAction({ commit }, payload: any) {
            const pageName = payload.pageName; // users/role
            // console.log(pageName);
            const apiName = `system/${pageName}`;
            // 1. 发送网络请求
            api[apiName](payload.queryInfo).then((res: any) => {
                console.log(res);
                const { list, totalCount } = res.data;

                commit(`SET_${pageName.toUpperCase()}_LIST`, list);
                commit(`SET_${pageName.toUpperCase()}_COUNT`, totalCount);
            });
        },
        // 删除
        async deletePageDataAction({ dispatch }, payload: any) {
            const { pageName, id } = payload;
            const apiName = `system/delete${pageName}`;
            // console.log(apiName);
            await api[apiName]({
                id: id,
            });

            // 删除完再刷新下列表
            dispatch("getPageListAction", {
                pageName,
                queryInfo: {
                    offset: 0,
                    size: 10,
                },
            });
        },

        // 新建
        async createPageDataAction({ dispatch }, payload: any) {
            // 1.创建数据的请求
            const { pageName, newData } = payload;
            const apiName = `user/add${pageName}`;
            await api[apiName]({
                ...newData,
            });
            // 2.请求最新的数据
            dispatch("getPageListAction", {
                pageName,
                queryInfo: {
                    offset: 0,
                    size: 10,
                },
            });
        },

        // 编辑
        async editPageDataAction({ dispatch }, payload: any) {
            // 1.编辑数据的请求
            const { pageName, editData, id } = payload;
            const apiName = `user/edit${pageName}`;
            await api[apiName]({
                ...editData,
                id: id,
            });

            // 2.请求最新的数据
            dispatch("getPageListAction", {
                pageName,
                queryInfo: {
                    offset: 0,
                    size: 10,
                },
            });
        },
    },
    mutations: {
        SET_USERS_LIST(state, resData: any[]) {
            state.usersList = resData;
        },
        SET_USERS_COUNT(state, resData: number) {
            state.usersCount = resData;
        },
        SET_ROLE_LIST(state, resData: any[]) {
            state.roleList = resData;
        },
        SET_ROLE_COUNT(state, resData: number) {
            state.roleCount = resData;
        },
        SET_GOODS_LIST(state, resData: any[]) {
            state.goodsList = resData;
        },
        SET_GOODS_COUNT(state, resData: number) {
            state.goodsCount = resData;
        },

        SET_MENU_LIST(state, resData: any[]) {
            state.menuList = resData;
        },
        SET_MENU_COUNT(state, resData: number) {
            state.menuCount = resData;
        },
    },
};
export default systemModule;
