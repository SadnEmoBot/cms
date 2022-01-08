/*
 * @Description:
 * @Author:
 * @Date: 2022-01-07 16:53:37
 * @LastEditTime: 2022-01-07 17:22:34
 * @LastEditors: Please set LastEditors
 */
import { importAll } from "@/utils/common";

const routeModules = importAll(
    require.context("@/routes/modules", false, /\.ts$/)
);
// // 业务路由
// const businessRoutes = routeModules.reduce(
//     (finallRoutes, routerModule) => finallRoutes.concat(routerModule.module),
//     []
// );
// 完整路由表
// const routes = [
//     {
//         path: "/:code",
//         component: (resolve) =>
//             require(["@/components/business/index.vue"], resolve),
//         // redirect: to => {
//         //     return `/${to.params.code}/login`;
//         // },
//         children: businessRoutes,
//     },
// ];
const routes = routeModules.reduce(
    (finallRoutes, routerModule) => finallRoutes.concat(routerModule.module),
    []
);

// routes.push({
//     path: "*", // 错误路由[写在最后一个]
//     component: (resolve) => require(["@/views/404/index.vue"], resolve),
//     meta: {
//         requiresAuth: false,
//     },
// });

export default routes;
