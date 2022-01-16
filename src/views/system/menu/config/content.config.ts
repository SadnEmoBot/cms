/*
 * @Description:
 * @Author:
 * @Date: 2022-01-16 16:19:07
 * @LastEditTime: 2022-01-16 17:37:21
 * @LastEditors: Please set LastEditors
 */
export const contentTableConfig = {
    showTableIndex: false,
    showSelectColumn: false,
    title: "菜单列表",
    addName: "新建菜单",
    propList: [
        { prop: "name", label: "菜单名称", minWidth: "100" },
        { prop: "type", label: "类型", minWidth: "60" },
        { prop: "url", label: "菜单url", minWidth: "100" },
        { prop: "icon", label: "菜单icon", minWidth: "100" },
        { prop: "permission", label: "按钮权限", minWidth: "100" },
        {
            prop: "createAt",
            label: "创建时间",
            minWidth: "220",
            slotName: "createAt",
        },
        {
            prop: "updateAt",
            label: "更新时间",
            minWidth: "220",
            slotName: "updateAt",
        },
        {
            label: "操作",
            minWidth: "120",
            slotName: "operation",
        },
    ],
    // 菜单树配置
    childrenProps: {
        rowKey: "id",
        treeProp: {
            children: "children",
        },
    },

    showFooter: false,
    // showAddBtn: true,
};
