/*
 * @Description:
 * @Author:
 * @Date: 2022-01-02 23:27:20
 * @LastEditTime: 2022-01-08 23:39:04
 * @LastEditors: Please set LastEditors
 */

const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");

const configProxy = require("./config/proxy.ts");
const URL_PREFIX = "/cms";

const vueConfig = {
    publicPath:
        process.env.NODE_ENV === "development"
            ? URL_PREFIX
            : process.env.VUE_APP_CDNURL + URL_PREFIX,
    configureWebpack: {
        plugins: [
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver()],
            }),
        ],
    },
    devServer: {
        // port: 8080,
        open: true,
        hotOnly: true,
        proxy: configProxy,
        // proxy: "http://localhost:4000",
        // proxy: {
        //     "^/api": {
        //         target: "http://152.136.185.210:5000",
        //         pathRewrite: {
        //             "^/api": "",
        //         },
        //         changeOrigin: true,
        //     },
        // },
    },
};
module.exports = vueConfig;
