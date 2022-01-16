/*
 * @Description: 根据权限动态配置菜单路由
 * @Author:
 * @Date: 2022-01-12 23:24:28
 * @LastEditTime: 2022-01-16 16:41:54
 * @LastEditors: Please set LastEditors
 */
import { IBreadcrumb } from "@/components/common/breadcrumb/src/type";
import { RouteRecordRaw } from "vue-router";

let firstMenu: any = null;
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
                // 设置了pathMapToMenu 点击哪个菜单对应哪个路由 但是在login.ts配置了path: '/' redirect: /main
                // 所以当url 变为了8080/ 就匹配不到menus了 所以当输入url为8080/时，将menu赋值给第一个二级菜单 就跳转到第一个二级菜单去
                if (!firstMenu) {
                    firstMenu = menu; // 导出firstMenu 在路由守卫routerBeforeEachFunc()里使用firstMenu
                }
            } else {
                _recurseGetRoute(menu.children);
            }
        }
    };
    _recurseGetRoute(userMenus);
    return routes;
}

export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
    const breadcrumbs: IBreadcrumb[] = [];
    pathMapToMenu(userMenus, currentPath, breadcrumbs);
    return breadcrumbs;
}

// /main/system/role  -> type === 2 对应menu
// 三级路由看下怎么写 等自己把接口写了再测下
export function pathMapToMenu(
    userMenus: any[],
    currentPath: string,
    breadcrumbs?: IBreadcrumb[]
): any {
    for (const menu of userMenus) {
        if (menu.type === 1) {
            const findMenu = pathMapToMenu(menu.children ?? [], currentPath);
            if (findMenu) {
                breadcrumbs?.push({ name: menu.name });
                breadcrumbs?.push({ name: findMenu.name });
                return findMenu;
            }
        } else if (menu.type === 2 && menu.url === currentPath) {
            return menu;
        }
    }
}

// 用户按钮权限
export function mapMenusToPermissions(userMenus: any[]) {
    const permissions: string[] = [];

    const _recurseGetPermission = (menus: any[]) => {
        for (const menu of menus) {
            if (menu.type === 1 || menu.type === 2) {
                _recurseGetPermission(menu.children ?? []);
            } else if (menu.type === 3) {
                permissions.push(menu.permission);
            }
        }
    };
    _recurseGetPermission(userMenus);

    return permissions;
}

export { firstMenu };
