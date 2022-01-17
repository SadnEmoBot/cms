/*
 * @Description:
 * @Author:
 * @Date: 2022-01-16 23:46:38
 * @LastEditTime: 2022-01-16 23:46:39
 * @LastEditors: Please set LastEditors
 */
import { IFormConfig } from "@/components/common/base-ui/type/type";

export const modalConfig: IFormConfig = {
    formItems: [
        {
            field: "name",
            type: "input",
            label: "角色名",
            placeholder: "请输入角色名",
        },
        {
            field: "intro",
            type: "input",
            label: "角色介绍",
            placeholder: "请输入角色介绍",
        },
    ],
    colWidth: { span: 24 },
    itemStyle: {},
};
