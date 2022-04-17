<!--
 * @Description:
 * @Author:
 * @Date: 2022-04-16 18:08:39
 * @LastEditTime: 2022-04-17 12:43:53
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

let count: any = [];
let currentIndex = ref(0); // 当前显示的数据
let seriesArr = ref<arrayRef["values"]>([]);
let centerArr = ref<arrayRef["values"]>([]);
let colorArr = ref<arrayRef["values"]>([]);
let timer: any = null;

watchEffect(() => {
    [centerArr, seriesArr, colorArr];
});

const baseEchartRef = ref<offsetWidthRef | null>();

let titleFontSize = ref();

onMounted(() => {
    if (baseEchartRef.value) {
        titleFontSize.value = (baseEchartRef.value.osw / 100) * 4;
    }

    SocketService.instance.registerCallBack("stockData", getData);
    SocketService.instance.send({
        action: "getData",
        socketType: "stockData",
        chartName: "stock",
        value: "",
    });
});
onUnmounted(() => {
    clearInterval(timer);
    SocketService.instance.unRegisterCallBack("stockData");
});

// res 就是服务器端发送给客户端的图表数据
const getData = (res: any) => {
    count = JSON.parse(res);
    updateChart();
    startInterval();
};

const updateChart = () => {
    centerArr.value = [
        ["18%", "40%"],
        ["50%", "40%"],
        ["82%", "40%"],
        ["34%", "75%"],
        ["66%", "75%"],
    ];
    colorArr.value = [
        ["#4FF778", "#0BA82C"],
        ["#E5DD45", "#E8B11C"],
        ["#E8821C", "#E55445"],
        ["#5052EE", "#AB6EE5"],
        ["#23E5E5", "#2E72BF"],
    ];

    const start = currentIndex.value * 5;
    const end = (currentIndex.value + 1) * 5;
    const showData = count.slice(start, end);
    seriesArr.value = showData.map((item: any, index: number) => {
        return {
            type: "pie",
            center: centerArr.value[index],
            hoverAnimation: false, // 关闭鼠标移入到饼图时的动画效果
            label: {
                show: true,
                position: "center",
                color: colorArr.value[index][0],
                // fontSize: titleFontSize.value / 2,
                fontSize: titleFontSize.value / 1.2,
                formatter: item.name + "\n\n" + item.sales,
            },
            labelLine: {
                show: false, // 隐藏指示线
            },
            avoidLabelOverlap: false,
            radius: [
                titleFontSize.value * 2.8 * 1.125,
                titleFontSize.value * 2.8,
            ],
            data: [
                {
                    // name: item.name + "\n\n" + item.sales,
                    value: item.sales,
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                            {
                                offset: 0,
                                color: colorArr.value[index][0],
                            },
                            {
                                offset: 1,
                                color: colorArr.value[index][1],
                            },
                        ]),
                    },
                },
                {
                    value: item.stock,
                    itemStyle: {
                        color: "#333843",
                        // color: "#fff",
                    },
                },
            ],
        };
    });
};

const startInterval = () => {
    if (timer) {
        clearInterval(timer);
    }
    timer = setInterval(() => {
        currentIndex.value++;
        if (currentIndex.value > 1) {
            currentIndex.value = 0;
        }
        updateChart();
    }, 5000);
};

const options = computed(() => {
    return {
        title: {
            text: "▎库存和销量分析",
            left: 20,
            top: 20,
            textStyle: {
                fontSize: titleFontSize.value,
            },
        },
        series: seriesArr.value,
    };
});
</script>

<style scoped></style>
