/*
 * @Description: 根据权限动态配置菜单路由
 * @Author:
 * @Date: 2022-01-12 23:24:28
 * @LastEditTime: 2022-01-13 00:35:03
 * @LastEditors: Please set LastEditors
 */
import { RouteRecordRaw } from "vue-router";
// 传入userMenus 并将userMenus放进RouteRecordRaw 从而映射每条路由记录
export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
    const routes: RouteRecordRaw[] = [];
    // 1. 先加载默认所有的routes
    let allRoutes: RouteRecordRaw[] = [];
    const routeFiles = require.context(
        "../routes/modules/modules",
        true,
        /\.ts/
    );
    routeFiles.keys().forEach((key) => {
        // console.log(key);
        const route = require("../routes/modules/modules" + key.split(".")[1]);
        allRoutes.push(route.default);
        allRoutes = allRoutes.flat();
        // console.log(allRoutes);
    });

    // 2.根据菜单获取需要添加的动态routes
    // userMenus: type === 1 -> 拿children, childrenl里还有type === 1(三级菜单) -> 再拿children 递归调用
    //type === 2 才是 -> url -route 直接匹配
    const _recurseGetRoute = (menus: any[]) => {
        for (const menu of menus) {
            if (menu.type === 2) {
                const route = allRoutes.find(
                    (route) => route.path === menu.url
                );
                // console.log(route);

                if (route) routes.push(route);
            } else {
                _recurseGetRoute(menu.children);
            }
        }
    };
    _recurseGetRoute(userMenus);
    return routes;
}
