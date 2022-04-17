/*
 * @Description:
 * @Author:
 * @Date: 2022-01-03 00:33:04
 * @LastEditTime: 2022-04-04 18:04:06
 * @LastEditors: Please set LastEditors
 */
// import axios from "axios";

// axios.get("http://123.207.32.32:8000/home/multidata").then((res) => {
//     console.log(res);
// });

// axios
//     .get("http://httpbin.org/get", {
//         params: {
//             name: "august",
//             age: 18,
//         },
//     })
//     .then((res) => {
//         console.log(res.data);
//     });

// axios的配置选项

import axios from "./axios";
// import _assign from "lodash/assign";
// import _isEmpty from "lodash/isEmpty";
import { assign, isEmpty } from "lodash-es";

import { assert } from "../utils/tools";
import { API_DEFAULT_CONFIG } from "../config";
import API_CONFIG from "../service/api";
import _const from "../plugins/const";

class MakeApi {
    api: any;
    constructor(options: any) {
        this.api = {};
        this.apiBuilder(options);
    }

    apiBuilder({
        sep = "|",
        config = {} as any,
        mock = false,
        debug = false,
        mockBaseURL = "",
    }) {
        Object.keys(config).map((namespace) => {
            this._apiSingleBuilder({
                namespace,
                mock,
                mockBaseURL,
                sep,
                debug,
                config: config[namespace],
            });
        });
    }

    _apiSingleBuilder({
        namespace = "",
        sep = "|",
        config = {} as any,
        mock = false,
        debug = false,
        mockBaseURL = "",
    }) {
        config.forEach((api: any) => {
            const { name, desc, method, path, host, showLoading } = api;
            const isMock = process.env.NODE_ENV === "production" ? false : mock;
            const url = isMock ? mockBaseURL + "/mock/35" + path : path;
            const baseURL = host ? _const["HOST/ADDRESS"][host] : "";
            // debugger;
            // const baseURL = "http://123.207.32.32:8000";

            debug && assert(name, `${url} :接口name属性不能为空`);
            Object.defineProperty(this.api, `${namespace}${sep}${name}`, {
                value(outerParams: any, outerOptions: any) {
                    let realUrl = url;

                    // console.log(Object.prototype.toString.call(outerParams))

                    if (
                        Object.prototype.toString.call(outerParams) ==
                        "[object FormData]"
                    ) {
                        return axios({
                            url: realUrl,
                            desc,
                            baseURL,
                            method,
                            data: outerParams,
                            showLoading,
                        });
                    }

                    if (
                        Object.prototype.toString.call(outerParams) ==
                        "[object Array]"
                    ) {
                        return axios({
                            url: realUrl,
                            desc,
                            baseURL,
                            method,
                            data: outerParams,
                            showLoading,
                        });
                    }

                    if (!isEmpty(outerParams)) {
                        const keys = Object.keys(outerParams);
                        keys.map((k) => {
                            const reger = new RegExp("{" + k + "}", "gmi");
                            if (reger.test(realUrl)) {
                                realUrl = realUrl.replace(
                                    reger,
                                    outerParams[k]
                                );
                                delete outerParams[k];
                            }
                        });
                    }

                    const _options = {
                        url: realUrl,
                        desc,
                        baseURL,
                        method,
                        showLoading,
                    };
                    // debugger;
                    return axios(
                        _normoalize(assign(_options, outerOptions), outerParams)
                    );
                },
            });
        });
    }
}

function _normoalize(options: any, data: any) {
    // if (options.method === 'POST') {
    //     options.data = data
    // } else if (options.method === 'GET') {
    //     options.params = data
    // }
    if (options.method !== "GET" && !options.data) {
        if (isEmpty(data)) {
            options.data = {};
        } else {
            options.data = data;
        }
    }
    return options;
}

export default new MakeApi({
    config: API_CONFIG,
    ...API_DEFAULT_CONFIG,
})["api"];
