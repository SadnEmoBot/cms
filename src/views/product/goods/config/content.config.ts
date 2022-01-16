/*
 * @Description:
 * @Author:
 * @Date: 2022-01-16 13:03:50
 * @LastEditTime: 2022-01-16 16:55:59
 * @LastEditors: Please set LastEditors
 */
export const contentTableConfig = {
    showTableIndex: true,
    showSelectColumn: true,
    title: "商品列表",
    addName: "新建商品",
    propList: [
        { prop: "name", label: "商品名称", minWidth: "200" },
        {
            prop: "oldPrice",
            label: "原价",
            minWidth: "80",
            slotName: "oldPrice",
        },
        { prop: "newPrice", label: "现价", minWidth: "80" },
        {
            prop: "imgUrl",
            label: "图片",
            minWidth: "120",
            slotName: "image",
        },
        {
            prop: "status",
            label: "状态",
            minWidth: "80",
            slotName: "status",
        },
        {
            prop: "createAt",
            label: "创建时间",
            minWidth: "200",
            slotName: "createAt",
        },
        {
            prop: "updateAt",
            label: "更新时间",
            minWidth: "200",
            slotName: "updateAt",
        },
        {
            label: "操作",
            minWidth: "120",
            slotName: "operation",
        },
    ],
};
