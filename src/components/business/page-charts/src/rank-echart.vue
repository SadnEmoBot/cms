<!--
 * @Description:
 * @Author:
 * @Date: 2022-04-16 15:31:01
 * @LastEditTime: 2022-04-16 18:05:46
 * @LastEditors: Please set LastEditors
-->
<template>
    <div class="bar-echart">
        <base-echart
            ref="baseEchartRef"
            :options="options"
            :height="450 + 'px'"
        ></base-echart>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watchEffect } from "vue";
import * as echarts from "echarts";
// const chalk = require("@/assets/echartsTheme/chalk.js");
import BaseEchart from "@/components/common/base-ui/echart/src/base-echart.vue";
import { offsetWidthRef } from "../types";

import SocketService from "@/utils/socket-service";

import { arrayRef } from "@/components/business/page-charts/types/index";

let startValue = ref(0); // 区域缩放的起点值
let endValue = ref(9); // 区域缩放的终点值
let count: any = [];
let provinceArr = ref<arrayRef["names"]>([]);
let valuesArr = ref<arrayRef["values"]>([]);
let colorArr = ref<arrayRef["values"]>([]);
let timer: any = null;

watchEffect(() => {
    [provinceArr, valuesArr, colorArr];
});

const baseEchartRef = ref<offsetWidthRef | null>();

let titleFontSize = ref();

onMounted(() => {
    if (baseEchartRef.value) {
        titleFontSize.value = (baseEchartRef.value.osw / 100) * 4;
    }

    SocketService.instance.registerCallBack("rankData", getData);
    SocketService.instance.send({
        action: "getData",
        socketType: "rankData",
        chartName: "rank",
        value: "",
    });
});
onUnmounted(() => {
    clearInterval(timer);
    SocketService.instance.unRegisterCallBack("rankData");
});

// res 就是服务器端发送给客户端的图表数据
const getData = (res: any) => {
    count = JSON.parse(res).sort((a: any, b: any) => {
        return b.value - a.value;
    });
    updateChart();
    startInterval();
};

const updateChart = () => {
    colorArr.value = [
        ["#0BA82C", "#4FF778"],
        ["#2E72BF", "#23E5E5"],
        ["#5052EE", "#AB6EE5"],
    ];
    provinceArr.value = count.map((item: any) => item.name);
    valuesArr.value = count.map((item: any) => item.value);
};

const startInterval = () => {
    if (timer) {
        clearInterval(timer);
    }
    timer = setInterval(() => {
        startValue.value++;
        endValue.value++;
        if (endValue.value > count.length - 1) {
            startValue.value = 0;
            endValue.value = 9;
        }
        updateChart();
    }, 2000);
};

const options = computed(() => {
    return {
        title: {
            text: "▎地区销售排行",
            left: 20,
            top: 20,
            textStyle: {
                fontSize: titleFontSize.value,
            },
        },
        grid: {
            top: "40%",
            left: "5%",
            right: "5%",
            bottom: "5%",
            containLabel: true, // 距离是包含坐标轴上的文字
        },
        xAxis: {
            type: "category",
            data: provinceArr.value,
        },
        yAxis: {
            type: "value",
            // data: names.value,
        },
        dataZoom: {
            show: false,
            startValue: startValue.value,
            endValue: endValue.value,
        },
        tooltip: {
            show: true,
        },
        series: [
            {
                type: "bar",

                data: valuesArr.value,
                itemStyle: {
                    borderRadius: [
                        titleFontSize.value / 2,
                        titleFontSize.value / 2,
                        0,
                        0,
                    ],
                    color: (arg: any) => {
                        let targetColorArr = null;
                        if (arg.value > 300) {
                            targetColorArr = colorArr.value[0];
                        } else if (arg.value > 200) {
                            targetColorArr = colorArr.value[1];
                        } else {
                            targetColorArr = colorArr.value[2];
                        }
                        return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: targetColorArr[0],
                            },
                            {
                                offset: 1,
                                color: targetColorArr[1],
                            },
                        ]);
                    },
                },
                barWidth: titleFontSize.value,
            },
        ],
    };
});
</script>

<style scoped></style>
