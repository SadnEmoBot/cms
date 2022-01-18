/*
 * @Description:
 * @Author:
 * @Date: 2022-01-17 23:12:54
 * @LastEditTime: 2022-01-18 00:55:59
 * @LastEditors: Please set LastEditors
 */
import api from "@/plugins/api";
import { Module } from "vuex";
import { IChartState, IRootState } from "../type";

const chartModule: Module<IChartState, IRootState> = {
    namespaced: true,
    state() {
        return {
            categoryGoodsCount: [],
            categoryGoodsSale: [],
            categoryGoodsFavor: [],
            addressGoodsSale: [],

            goodsSaleTop10: [],
            topPanelDatas: [],
        };
    },
    getters: {},
    actions: {
        getDashboardDataAction({ commit }) {
            // 1. 发送网络请求
            api["chart/getCategoryGoodsCount"]().then((res: any) => {
                commit("SET_CATEGORY_GOODS_COUNT", res.data);
            });
            api["chart/getCategoryGoodsSale"]().then((res: any) => {
                commit("SET_CATEGORY_GOODS_COUNT", res.data);
            });
            api["chart/getCategoryGoodsFavor"]().then((res: any) => {
                commit("SET_CATEGORY_GOODS_COUNT", res.data);
            });
            api["chart/getAddressGoodsSale"]().then((res: any) => {
                commit("SET_CATEGORY_GOODS_COUNT", res.data);
            });

            api["chart/getAmountList"]().then((res: any) => {
                commit("SET_TOP_PANEL_DATA", res.data);
            });
            api["chart/getGoodsSaleTop10"]().then((res: any) => {
                commit("SET_CATEGORY_GOODS_SALE_TOP", res.data);
            });
        },
    },
    mutations: {
        SET_CATEGORY_GOODS_COUNT(state, resData: any[]) {
            state.categoryGoodsCount = resData;
        },
        SET_CATEGORY_GOODS_SALE(state, resData: any[]) {
            state.categoryGoodsSale = resData;
        },
        SET_CATEGORY_GOODS_FAVOR(state, resData: any[]) {
            state.categoryGoodsFavor = resData;
        },
        SET_ADDRESS_GOODS_SALE(state, resData: any[]) {
            state.addressGoodsSale = resData;
        },

        SET_CATEGORY_GOODS_SALE_TOP(state, resData: any[]) {
            state.goodsSaleTop10 = resData;
        },
        SET_TOP_PANEL_DATA(state, resData: any[]) {
            state.topPanelDatas = resData;
        },
    },
};
export default chartModule;
