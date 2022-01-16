/*
 * @Description:
 * @Author:
 * @Date: 2022-01-13 20:30:03
 * @LastEditTime: 2022-01-16 19:39:13
 * @LastEditors: Please set LastEditors
 */
type IFormType = "input" | "password" | "select" | "datepicker";

export interface IFormItem {
    field: string;
    type: IFormType;
    label?: string;
    rules?: any[];
    placeholder?: any;
    // 针对select
    options?: any[];
    // 针对特殊的属性
    otherOptions?: any;
    isFormItemHidden?: boolean;
}

export interface IFormConfig {
    formItems: IFormItem[];
    labelWidth?: string;
    colWidth?: any;
    itemStyle: any;
}
