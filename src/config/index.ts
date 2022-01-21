/*
 * @Description: 全局配置
 * @Author:
 * @Date: 2022-01-03 15:28:11
 * @LastEditTime: 2022-01-21 19:46:00
 * @LastEditors: Please set LastEditors
 */
// 当前宿主平台
export const HOST_PLATFORM = "WEB";
// 这个就不多说了
export const NODE_ENV = process.env.NODE_ENV || "production";

// 是否强制所有请求访问本地 MOCK，看到这里同学不难猜到，每个请求也可以单独控制是否请求 MOCK
export const AJAX_LOCALLY_ENABLE = false;
// 是否开启监控
export const MONITOR_ENABLE = true;
// 路由默认配置，路由表并不从此注入
export const ROUTER_DEFAULT_CONFIG = {
    mode: "hash",
    // base: URL_PREFIX, //配置路由的时候再打开
    base: "/cms",
};

// axios 默认配置
export const AXIOS_DEFAULT_CONFIG = {
    timeout: 600000,
    maxContentLength: 2000,
    headers: {
        // "content-type": "application/json",
    },
};

// vuex 默认配置
export const VUEX_DEFAULT_CONFIG = {
    strict: process.env.NODE_ENV !== "production",
};

// API 默认配置
export const API_DEFAULT_CONFIG = {
    mockBaseURL: "",
    mock: false,
    debug: true,
    sep: "/",
};

// CONST 默认配置
export const CONST_DEFAULT_CONFIG = {
    sep: "/",
};
