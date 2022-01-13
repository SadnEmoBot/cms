/*
 * @Description: vuex配置 实例化vuex
 * @Author:
 * @Date: 2022-01-08 18:09:37
 * @LastEditTime: 2022-01-12 21:10:30
 * @LastEditors: Please set LastEditors
 */
// import Vue from "vue";
// import Vuex from "vuex";
import { createStore } from "vuex";
import { VUEX_DEFAULT_CONFIG } from "../config";
import commonStore from "../service/store/";
import createPersistedState from "vuex-persistedstate";
// import store from "@/store";

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

export default createStore({
    modules: { ...commonStore },
    ...VUEX_DEFAULT_CONFIG,
    plugins: [
        createPersistedState({
            reducer(store: any) {
                // console.log(JSON.parse(JSON.stringify(store)));
                return {
                    user: store.user,
                };
            },
        }),
    ],
});
