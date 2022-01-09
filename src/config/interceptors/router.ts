/*
 * @Description: 路由拦截器
 * @Author:
 * @Date: 2022-01-07 17:27:27
 * @LastEditTime: 2022-01-09 19:19:19
 * @LastEditors: Please set LastEditors
 */
import localCache from "@/utils/cache";
export function routerBeforeEachFunc(to: any) {
    if (to.path !== "/login") {
        const token = localCache.getCache("token");
        if (!token) {
            return "./login";
        }
    }
}
