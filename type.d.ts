/*
 * @Description:
 * @Author:
 * @Date: 2022-01-04 14:48:20
 * @LastEditTime: 2022-01-04 22:16:28
 * @LastEditors: Please set LastEditors
 */
// import { ComponentCustomProperties } from "vue";

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $api: any;
    }
}

//定义module 需要ts代码提示必须执行下方代码
declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $message: any; //挂载类型
    }
}

export {};
