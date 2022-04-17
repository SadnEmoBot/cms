<!--
 * @Description:
 * @Author:
 * @Date: 2022-01-18 00:45:39
 * @LastEditTime: 2022-04-10 14:11:22
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
import { defineProps, computed, ref, onMounted } from "vue";
import * as echarts from "echarts";
// const chalk = require("@/assets/echartsTheme/chalk.js");
import BaseEchart from "@/components/common/base-ui/echart/src/base-echart.vue";
import { IEchartXAxisLabel, IEchartValueData, offsetWidthRef } from "../types";

const props = defineProps<{
    name: IEchartXAxisLabel[];
    value: IEchartValueData[];
}>();

// const baseEchartRef = ref<InstanceType<typeof BaseEchart>>(); //语法糖用不了
const baseEchartRef = ref<offsetWidthRef | null>();
// nextTick(() => {
//     console.log(baseEchartRef.value.osw); //写在nextTick()里才行 or onMounted
// });
let titleFontSize = ref();

onMounted(() => {
    if (baseEchartRef.value) {
        titleFontSize.value = (baseEchartRef.value.osw / 100) * 4;
    }
});

const options = computed(() => {
    return {
        title: {
            text: "▎商家销售统计",
            left: 20,
            top: 20,
            textStyle: {
                fontSize: titleFontSize.value,
            },
        },
        grid: {
            top: "20%",
            left: "3%",
            right: "6%",
            bottom: "3%",
            containLabel: true, // 距离是包含坐标轴上的文字
        },
        xAxis: {
            type: "value",
        },
        yAxis: {
            type: "category",
            data: props.name,
        },
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "line",
                z: 0,
                lineStyle: {
                    // color: "#2D3443",
                    // width: titleFontSize.value,
                },
            },
        },
        series: [
            {
                type: "bar",
                data: props.value,
                label: {
                    show: true,
                    position: "right",
                    color: "black",
                },
                barWidth: titleFontSize.value,
                itemStyle: {
                    // 指明颜色渐变的方向
                    // 指明不同百分比之下颜色的值
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                        // 百分之0状态之下的颜色值
                        {
                            offset: 0,
                            color: "#5052EE",
                        },
                        // 百分之100状态之下的颜色值
                        {
                            offset: 1,
                            color: "#AB6EE5",
                        },
                    ]),
                    // eslint-disable-next-line vue/no-ref-as-operand
                    borderRadius: [
                        0,
                        titleFontSize.value / 2,
                        titleFontSize.value / 2,
                        0,
                    ],
                },
            },
        ],
    };
});
</script>

<style scoped></style>
