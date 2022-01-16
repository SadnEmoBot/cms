/*
 * @Description:
 * @Author:
 * @Date: 2022-01-16 00:43:10
 * @LastEditTime: 2022-01-16 00:44:17
 * @LastEditors: Please set LastEditors
 */
import { IFormConfig } from "@/components/common/base-ui/type/type";

export const searchFormConfig: IFormConfig = {
    labelWidth: "100px",
    itemStyle: {
        padding: "10px 40px",
    },
    colWidth: {
        span: 8,
    },
    formItems: [
        {
            field: "name",
            type: "input",
            label: "角色名称",
            placeholder: "请输入角色名称",
        },
        {
            field: "intro",
            type: "input",
            label: "权限介绍",
            placeholder: "请输入权限介绍",
        },
        {
            field: "createTime",
            type: "datepicker",
            label: "创建时间",
            otherOptions: {
                startPlaceholder: "开始时间",
                endPlaceholder: "结束时间",
                type: "daterange",
            },
        },
    ],
};
