/*
 * @Description:
 * @Author:
 * @Date: 2022-01-16 20:17:27
 * @LastEditTime: 2022-01-17 14:11:22
 * @LastEditors: Please set LastEditors
 */
import api from "@/plugins/api";
import { Module } from "vuex";
import { IRState, IRootState } from "../type";

const rootModule: Module<IRState, IRootState> = {
    namespaced: true,
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
            console.log(departmentResult);
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
};
export default rootModule;
