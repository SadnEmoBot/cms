/*
 * @Description:
 * @Author:
 * @Date: 2022-01-18 00:45:39
 * @LastEditTime: 2022-04-08 10:53:49
 * @LastEditors: Please set LastEditors
 */
export interface IPieEchartData {
    value: number;
    name: string;
}

export interface IEchartXAxisLabel {
    name: string;
}

export interface IEchartValueData {
    value: any;
}

// 组件中的一些接口定义
export interface offsetWidthRef {
    osw: number;
}

export interface arrayRef {
    names: any[];
    values: any[];
}
