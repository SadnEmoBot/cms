/*
 * @Description: vuex配置 实例化vuex
 * @Author:
 * @Date: 2022-01-08 18:09:37
 * @LastEditTime: 2022-01-17 21:58:51
 * @LastEditors: Please set LastEditors
 */
// import Vue from "vue";
// import Vuex from "vuex";
import { createStore } from "vuex";
import { VUEX_DEFAULT_CONFIG } from "../config";
import commonStore from "../service/store/";
import createPersistedState from "vuex-persistedstate";
// import store from "@/store";

import api from "@/plugins/api";
import { IRootState } from "@/service/store/type";

// Vue.use(Vuex);

// export default new Vuex.Store({
//     modules: { ...commonStore },
//     ...VUEX_DEFAULT_CONFIG,
//     plugins: [
//         createPersistedState({
//             // todo:看情况是否需要全部存储,,还是只存储一小部分...
//             storage: window.sessionStorage,
//             reducer(store) {
//                 return {
//                     user: store.user,
//                 };
//             },
//         }),
//     ],
// });

// export default createStore({
//     modules: { ...commonStore },
//     ...VUEX_DEFAULT_CONFIG,
//     plugins: [
//         createPersistedState({
//             reducer(store: any) {
//                 // console.log(JSON.parse(JSON.stringify(store)));
//                 return {
//                     user: store.user,
//                 };
//             },
//         }),
//     ],
// });

export default createStore<IRootState>({
    modules: { ...commonStore },
    ...VUEX_DEFAULT_CONFIG,

    state() {
        return {
            name: "coderwhy",
            age: 18,
            entireDepartment: [],
            entireRole: [],

            entireMenu: [],
        };
    },
    getters: {},
    actions: {
        async getInitialDataAction({ commit }) {
            // 1.1 请求部门和角色数据
            const departmentResult = await api["department/getDepartmentList"]({
                offset: 0,
                size: 1000,
            });
            // console.log(departmentResult);
            const { list: departmentList } = departmentResult.data;

            // 1.2 请求角色数据
            const roleResult = await api["system/role"]({
                offset: 0,
                size: 1000,
            });
            // console.log(roleResult);
            const { list: roleList } = roleResult.data;

            // 1.3 请求菜单数据
            const menuResult = await api["system/menu"]();
            const { list: menuList } = menuResult.data;

            // 2.保存数据
            commit("SET_DEPARTMENT_LIST", departmentList);
            commit("SET_ROLE_LIST", roleList);
            commit("SET_MENU_LIST", menuList);
        },
    },
    mutations: {
        SET_DEPARTMENT_LIST(state, resData: any[]) {
            state.entireDepartment = resData;
        },
        SET_ROLE_LIST(state, resData: any[]) {
            state.entireRole = resData;
        },
        SET_MENU_LIST(state, resData: any[]) {
            state.entireMenu = resData;
        },
    },

    plugins: [
        createPersistedState({
            reducer(store: any) {
                // console.log(JSON.parse(JSON.stringify(store)));
                return {
                    user: store.user,
                    // entireMenu: store.entireMenu,
                    // entireRole: store.entireRole,
                    // entireDepartment: store.entireDepartment,
                };
            },
        }),
    ],
});
