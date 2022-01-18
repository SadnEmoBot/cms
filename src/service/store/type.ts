/*
 * @Description:
 * @Author:
 * @Date: 2022-01-12 17:22:34
 * @LastEditTime: 2022-01-18 00:50:58
 * @LastEditors: Please set LastEditors
 */
import { Store, useStore as useVuexStore } from "vuex";

export interface ILoginState {
    token: string;
    userInfo: any;
    userMenus: any;
    permissions: string[];
}
export interface IRState {
    entireDepartment: any[];
    entireRole: any[];
    entireMenu: any[];
}
export interface IChartState {
    categoryGoodsCount: any[];
    categoryGoodsSale: any[];
    categoryGoodsFavor: any[];
    addressGoodsSale: any[];
    goodsSaleTop10: any[];
    topPanelDatas: any[];
}
export interface IRootState {
    // 暂时还没有根state 都是直接写在modules里的
    name: string;
    age: number;

    entireDepartment: any[];
    entireRole: any[];
    entireMenu: any[];
}
interface IRootWithModule {
    user: ILoginState;
    system: ISystemState;
    root: IRState;
    chart: IChartState;
    // 有其他模块在这里加 例如 xxx: IXXXState
}
export type IStoreType = IRootState & IRootWithModule;

export function useStore(): Store<IStoreType> {
    return useVuexStore();
}

export interface ISystemState {
    usersList: any[];
    usersCount: number;
    roleList: any[];
    roleCount: number;

    goodsList: any[];
    goodsCount: number;

    menuList: any[];
    menuCount: number;
}
