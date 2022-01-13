/*
 * @Description:
 * @Author:
 * @Date: 2022-01-12 17:22:34
 * @LastEditTime: 2022-01-12 17:27:44
 * @LastEditors: Please set LastEditors
 */
import { Store, useStore as userVuexStore } from "vuex";

export interface ILoginState {
    token: string;
    userInfo: any;
    userMenus: any;
}
export interface IRootState {
    // 暂时还没有根state 都是直接写在modules里的
    name: string;
    age: number;
}
interface IRootWithModule {
    user: ILoginState;
    // 有其他模块在这里加 例如 xxx: IXXXState
}
type IStoreType = IRootState & IRootWithModule;

export function useStore(): Store<IStoreType> {
    return userVuexStore();
}
