/*
 * @Description:
 * @Author:
 * @Date: 2022-01-03 00:31:21
 * @LastEditTime: 2022-01-03 23:01:07
 * @LastEditors: Please set LastEditors
 */
import { importAll } from "@/utils/common";

const routeModules = importAll(require.context("./modules", false, /\.ts$/));

const configs = {} as any;
routeModules.forEach(({ camelModuleName, module }) => {
    configs[camelModuleName] = module;
});

export default configs;
