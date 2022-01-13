/*
 * @Description:
 * @Author:
 * @Date: 2022-01-12 15:49:24
 * @LastEditTime: 2022-01-12 17:21:02
 * @LastEditors: Please set LastEditors
 */
import { Store, useStore as userVuexStore } from "vuex";

interface ILoginState {
    token: string;
    userInfo: any;
    userMenus: any;
}
interface IRootState {
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
