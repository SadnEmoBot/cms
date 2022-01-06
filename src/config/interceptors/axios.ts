/*
 * @Description: axios拦截器
 * @Author:
 * @Date: 2022-01-03 15:29:50
 * @LastEditTime: 2022-01-06 15:35:12
 * @LastEditors: Please set LastEditors
 */
// import { AxiosRequestConfig } from "axios";
import { ElMessage } from "element-plus";
import { ElLoading } from "element-plus";
// import {} from "element-plus/lib/components/loading/src/loading";

import { useRouter } from "vue-router";

let loading: any;
// let showLoading: boolean;

// 这里的any好像可以换成AxiosRequestConfig 但是扩展了AxiosRequestConfig之外的就需要写个interface继承自AxiosRequestConfig 这里先不写ts
export function requestSuccessFunc(requestObj: any) {
    // 自定义请求拦截逻辑，可以处理权限，请求发送监控等

    // 1.给请求添加token

    // 2. isLoading动画
    if (requestObj.showLoading) {
        loading = ElLoading.service({
            lock: true,
            text: "正在请求数据...",
            background: "rgba(0,0,0,0.5)",
        });
    }
    // showLoading = requestObj.config.showLoading ?? true;
    return requestObj;
}
export function requestFailFunc(requestError: any) {
    // 自定义发送请求失败逻辑，断网，请求发送监控等
    // ...
    return Promise.reject(requestError);
}
export function responseSuccessFunc(responseObj: any) {
    // 移除loading
    // showLoading = responseObj.config.showLoading ?? true;
    // if (responseObj.config.showLoading === false) {
    //     showLoading = responseObj.config.showLoading;
    // }
    // showLoading = true;

    if (responseObj.config.showLoading) {
        loading?.close();
    }

    // 浏览器级别错误直接返回
    if (responseObj.status != 200) {
        return Promise.reject(responseObj);
    }

    // 自定义响应成功逻辑，全局拦截接口，根据不同业务做不同处理，响应成功监控等
    const resData = responseObj; //返回接口的data {}
    const { code } = resData.data; //不同接口定义的code不同 分字段不同(有的定义为code，有的定义为returnCode。不同字段的值也不同 有的返回数字 有的返回字符串)
    // 以下这种情况处理 code为非定义为字段为code的值 比如定义的code的字段为returnCode 所以这里code = undefined !undefined = true
    if (resData.status === 200 && !code) {
        // debugger;
        return resData.data;
    }
    switch (code) {
        case "1000": // 如果业务成功，直接进成功回调
            return resData.data;
        case 200:
            return resData.data.data;
        default: {
            // 业务中还会有一些特殊 code 逻辑，我们可以在这里做统一处理，也可以下放它们到业务层
            // !responseObj.config.noShowDefaultError && GLOBAL.vbus.$emit('business.response.incorrect', resData.msg);
            const config = resData.config;
            if (!config.customError && resData.data) {
                const msg = resData.data.message
                    ? resData.data.message
                    : "系统错误";
                ElMessage.error(msg);
            }
            return Promise.reject(resData.data);
        }
    }
}
export function responseFailFunc(responseError: any) {
    // 移除loading
    // loading?.close();

    // 响应失败，可根据 responseError.message 和 responseError.response.status 来做监控处理

    // token过期，跳转到登录页
    if (responseError.response && +responseError.response.status === 401) {
        // 清空用户信息
        // setAuthKeyCookie('');
        // store.commit('user/SET_TOKEN', '');
        // store.commit('user/SET_USER_INFO', '');
        const host = window.location.host;
        ElMessage.error("您暂无此功能权限");
        if (host.indexOf("localhost") > -1) {
            // this.localTo("/login");
            useRouter().push({ path: "/login" });
        } else {
            window.location.href = `https://${host}/login`;
        }
        // _this.$cloudLoading.hide();
        return false;
    }
    if (responseError.response && +responseError.response.status === 403) {
        ElMessage.error("您暂无此功能权限");
        // _this.$cloudLoading.hide();
        return Promise.reject(responseError.response.data);
    }
    const config = responseError.config;

    if (
        !config.customError &&
        responseError.response &&
        responseError.response.data
    ) {
        const msg = responseError.response.data.message
            ? responseError.response.data.message
            : "系统错误";
        ElMessage.error(msg);
        // _this.$cloudLoading.hide();
    }

    return Promise.reject(responseError.response.data);
}
