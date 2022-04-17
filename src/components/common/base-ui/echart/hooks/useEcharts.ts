/*
 * @Description:
 * @Author:
 * @Date: 2022-01-18 00:40:14
 * @LastEditTime: 2022-04-17 12:36:39
 * @LastEditors: Please set LastEditors
 */
import * as echarts from "echarts";
import type { EChartsOption } from "echarts";

// 注册中国地图
// import chinaJson from "../data/china.json";
// echarts.registerMap("china", chinaJson as any);

export function useEcharts(domEl: HTMLElement, theme = "dark") {
    // 初始化echarts
    const echartsInstance = echarts.init(domEl, theme, { renderer: "svg" });

    // 设置options
    const setOptions = (options: EChartsOption) => {
        echartsInstance.setOption(options);
    };

    // 设置Mouseover 传入定时器函数
    const setMouseOver = (timer: any) => {
        echartsInstance.on("mouseover", () => {
            timer;
        });
    };

    const setMouseOut = (startInterval: any) => {
        echartsInstance.on("mouseover", () => {
            startInterval;
        });
    };

    // 监听window尺寸的变化
    window.addEventListener("resize", () => {
        echartsInstance.resize();
    });

    return [setOptions, setMouseOver, setMouseOut];
}
