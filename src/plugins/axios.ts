/*
 * @Description: axios配置 实例化axios
 * @Author:
 * @Date: 2022-01-03 15:55:01
 * @LastEditTime: 2022-01-03 19:43:58
 * @LastEditors: Please set LastEditors
 */
import axios from "axios";
import { AXIOS_DEFAULT_CONFIG } from "../config/index";
import {
    requestSuccessFunc,
    requestFailFunc,
    responseSuccessFunc,
    responseFailFunc,
} from "../config/interceptors/axios";

let axiosInstance = {} as any;

axiosInstance = axios.create(AXIOS_DEFAULT_CONFIG);

// 注入请求request拦截
axiosInstance.interceptors.request.use(requestSuccessFunc, requestFailFunc);

// 注入返回response拦截
axiosInstance.interceptors.response.use(responseSuccessFunc, responseFailFunc);

export default axiosInstance;
