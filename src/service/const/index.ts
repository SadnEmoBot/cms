/*
 * @Description:
 * @Author:
 * @Date: 2022-01-03 16:19:23
 * @LastEditTime: 2022-01-04 20:01:53
 * @LastEditors: Please set LastEditors
 */
import { importAll } from "@/utils/common";

const routeModules = importAll(require.context("./modules", false, /\.ts$/));

const configs = {} as any;
routeModules.forEach(({ camelModuleName, module }) => {
    configs[camelModuleName] = module;
});
export const SHOP_MAIN = window.location.origin;

export default configs;
