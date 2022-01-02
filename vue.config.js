/*
 * @Description:
 * @Author:
 * @Date: 2022-01-02 23:27:20
 * @LastEditTime: 2022-01-02 23:30:03
 * @LastEditors: Please set LastEditors
 */

const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");

module.exports = {
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
};
