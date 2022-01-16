/*
 * @Description:
 * @Author:
 * @Date: 2022-01-16 20:17:27
 * @LastEditTime: 2022-01-16 21:50:32
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
        };
    },
    getters: {},
    actions: {
        async getInitialDataAction({ commit }) {
            // 1.请求部门和角色数据
            const departmentResult = await api["department/getDepartmentList"]({
                offset: 0,
                size: 1000,
            });
            // console.log(departmentResult);

            const { list: departmentList } = departmentResult.data;
            const roleResult = await api["system/role"]({
                offset: 0,
                size: 1000,
            });
            // console.log(roleResult);

            const { list: roleList } = roleResult.data;

            // 2.保存数据
            commit("SET_DEPARTMENT_LIST", departmentList);
            commit("SET_ROLE_LIST", roleList);
        },
    },
    mutations: {
        SET_DEPARTMENT_LIST(state, resData: any[]) {
            state.entireDepartment = resData;
        },
        SET_ROLE_LIST(state, resData: any[]) {
            state.entireRole = resData;
        },
    },
};
export default rootModule;
