/*
 * @Description:
 * @Author:
 * @Date: 2022-01-17 23:38:52
 * @LastEditTime: 2022-04-10 13:38:55
 * @LastEditors: Please set LastEditors
 */
export default [
    {
        name: "getCategoryGoodsCount",
        method: "GET",
        desc: "获取数据",
        path: "/goods/category/count",
        host: "cms",
    },
    {
        name: "getCategoryGoodsSale",
        method: "GET",
        desc: "获取数据",
        path: "/goods/category/sale",
        host: "cms",
    },
    {
        name: "getCategoryGoodsFavor",
        method: "GET",
        desc: "获取数据",
        path: "/goods/category/favor",
        host: "cms",
    },
    {
        name: "getAddressGoodsSale",
        method: "GET",
        desc: "获取数据",
        path: "/goods/address/sale",
        host: "cms",
    },

    {
        name: "getGoodsSaleTop10",
        method: "GET",
        desc: "获取数据",
        path: "/goods/sale/top10",
        host: "cms",
    },
    {
        name: "getAmountList",
        method: "GET",
        desc: "获取数据",
        path: "/goods/amount/list",
        host: "cms",
    },

    {
        name: "getGoodsSaleCount",
        method: "GET",
        desc: "获取数据",
        // path: "/goods/salecount",
        path: "/goodsSaleCount",
        host: "august",
    },

    {
        name: "getTrend",
        method: "GET",
        desc: "获取数据",
        // path: "/goods/salecount",
        path: "/trend",
        host: "august",
    },

    {
        name: "getMap",
        method: "GET",
        desc: "获取数据",
        // path: "/goods/salecount",
        path: "/map",
        host: "august",
    },
];
