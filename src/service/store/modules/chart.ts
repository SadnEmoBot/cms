/*
 * @Description:
 * @Author:
 * @Date: 2022-01-17 23:12:54
 * @LastEditTime: 2022-04-16 14:37:40
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
            // 新接口测试
            goodsSaleCount: [],
            trend: [],
            map: [],
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

            api["chart/getGoodsSaleCount"]().then((res: any) => {
                commit("SET_GOODS_SALE_COUNT", res.data);
            });
            api["chart/getTrend"]().then((res: any) => {
                commit("SET_TREND", res.data);
            });
            api["chart/getMap"]().then((res: any) => {
                commit("SET_MAP", res.data);
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
        SET_GOODS_SALE_COUNT(state, resData: any[]) {
            state.goodsSaleCount = resData.sort((a, b) => a.value - b.value);
        },
        SET_TREND(state, resData: any[]) {
            state.trend = resData;
        },
        SET_MAP(state, resData: any[]) {
            state.map = resData;
        },
    },
};
export default chartModule;
