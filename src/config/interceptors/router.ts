/*
 * @Description: 路由拦截器
 * @Author:
 * @Date: 2022-01-07 17:27:27
 * @LastEditTime: 2022-01-13 10:26:21
 * @LastEditors: Please set LastEditors
 */
import localCache from "@/utils/cache";
export function routerBeforeEachFunc(to: any) {
    // console.log(to);

    if (to.path !== "/login") {
        const token = localCache.getCache("token");
        if (!token) {
            return "./login";
        }
    }
    // const token = localCache.getCache("token");
    // let { requiresAuth } = to.meta;
    // if (typeof requiresAuth !== "boolean") requiresAuth = true;
    // if (requiresAuth && !token) {
    //     // return next({
    //     //     path: "./login",
    //     //     query: { redirect: to.fullPath },
    //     //     // force: true,
    //     // });
    //     return "./login";
    // }

    if (to.path.indexOf("/main") !== -1) {
        if (to.name === "404") {
            to.name = "user";
        }
    }
}
