/*
 * @Description: 代理配置
 * @Author:
 * @Date: 2022-01-05 17:21:23
 * @LastEditTime: 2022-01-08 22:21:00
 * @LastEditors: Please set LastEditors
 */
// const currentEnv = "development";

// const HOST = {
//     development: "",
//     test: "",
//     vprod: "",
//     prod: "",
// };
// module.exports = {
//     "/api": {
//         target: HOST[currentEnv],
//         changeOrigin: true,
//     },
// };
module.exports = {
    "^/api": {
        target: "http://152.136.185.210:5000",
        pathRewrite: {
            "^/api": "",
        },
        changeOrigin: true,
    },
};

// 假如有两种前缀开头的接口，分别部署在不同的服务上，那么我们就可以通过server.proxy添加 代理。
// 一般 为了方便区分接口会在接口前添加特殊标识前缀 但后台真实接口未必有加
// 那就可以在axios中配置baseURL 来指定前缀
// https://juejin.cn/post/7038485798143918116#heading-26
