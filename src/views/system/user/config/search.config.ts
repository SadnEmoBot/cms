/*
 * @Description:
 * @Author:
 * @Date: 2022-01-13 21:39:20
 * @LastEditTime: 2022-01-14 00:17:37
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
            field: "id",
            type: "input",
            label: "id",
            placeholder: "请输入id",
        },
        {
            field: "name",
            type: "input",
            label: "用户名",
            placeholder: "请输入用户名",
        },
        {
            field: "password",
            type: "password",
            label: "密码",
            placeholder: "请输入密码",
        },
        {
            field: "sport",
            type: "select",
            label: "喜欢的运动",
            placeholder: "请选择喜欢的运动",
            options: [
                { title: "篮球", value: "basketball" },
                { title: "足球", value: "football" },
            ],
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
