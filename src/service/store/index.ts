/*
 * @Description:
 * @Author:
 * @Date: 2022-01-03 16:19:35
 * @LastEditTime: 2022-01-09 13:48:42
 * @LastEditors: Please set LastEditors
 */

import { importAll } from "@/utils/common";

// import { Module } from "vuex";

// interface ILoginState {
//     token: string;
//     userInfo: any;
// }
// interface IRootState {
//     name: string;
//     age: number;
// }

// const storeModules: Module<ILoginState, IRootState> = importAll(
const storeModules = importAll(require.context("./modules", false, /\.ts$/));

const configs = {} as any;
storeModules.forEach(({ camelModuleName, module }) => {
    configs[camelModuleName] = module;
});

export default configs;
