/*
 * @Description: axios的扩展配置
 * @Author:
 * @Date: 2022-01-06 10:57:40
 * @LastEditTime: 2022-01-06 14:52:20
 * @LastEditors: Please set LastEditors
 */
import axios from "axios";

declare module "axios" {
    export interface AxiosRequestConfig {
        /**
         * @description 设置为true，则会在请求过程中显示loading动画，直到请求结束才消失
         */
        showLoading?: boolean;
    }
}
