/*
 * @Description:
 * @Author:
 * @Date: 2022-01-15 22:36:16
 * @LastEditTime: 2022-01-16 00:33:51
 * @LastEditors: Please set LastEditors
 */
export const contentTableConfig = {
    showTableIndex: true,
    showSelectColumn: true,
    title: "角色列表",
    addName: "新建角色",
    propList: [
        { prop: "name", label: "角色名", minWidth: "100" },
        { prop: "intro", label: "权限介绍", minWidth: "100" },
        {
            prop: "createAt",
            label: "创建时间",
            minWidth: "250",
            slotName: "createAt",
        },
        {
            prop: "updateAt",
            label: "更新时间",
            minWidth: "250",
            slotName: "updateAt",
        },
        {
            label: "操作",
            minWidth: "120",
            slotName: "operation",
        },
    ],
};
