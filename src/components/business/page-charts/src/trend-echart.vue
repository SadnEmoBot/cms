<!--
 * @Description:
 * @Author:
 * @Date: 2022-04-10 15:42:55
 * @LastEditTime: 2022-04-17 12:41:16
 * @LastEditors: Please set LastEditors
-->
<template>
    <div class="com-container">
        <!-- <div class="title" :style="comStyle">
            <span>{{ "▎ " + showTitle }}</span>
            <span
                class="iconfont title-icon"
                :style="comStyle"
                @click="showChoice = !showChoice"
            >
                &#xe6eb;
            </span>
            <div class="select-con" v-show="showChoice" :style="marginStyle">
                <div
                    class="select-item"
                    v-for="item in selectTypes"
                    :key="item.key"
                    @click="handleSelect(item.key)"
                >
                    {{ item.text }}
                </div>
            </div>
        </div> -->
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

let count: any[] = [];
let choiceType: any = "region";
let showChoice = false; // 是否显示可选项
// 类目轴的数据
const months = [
    "一月",
    "二月",
    "三月",
    "四月",
    "五月",
    "六月",
    "七月",
    "八月",
    "九月",
    "十月",
    "十一月",
    "十二月",
];
const types = [
    {
        key: "goods",
        text: "商品销量趋势",
    },
    {
        key: "region",
        text: "地区销量趋势",
    },
    {
        key: "seller",
        text: "商家销量趋势",
    },
];
let legendArr = ref<arrayRef["names"]>([]);
let seriesArr = ref<arrayRef["names"]>([]);
let valueArr = ref<arrayRef["names"]>([]);

const baseEchartRef = ref<offsetWidthRef | null>();
let titleFontSize = ref();

watchEffect(() => {
    [legendArr, valueArr, seriesArr];
});

onMounted(() => {
    if (baseEchartRef.value) {
        titleFontSize.value = (baseEchartRef.value.osw / 100) * 4;
    }

    SocketService.instance.registerCallBack("trendData", getData);
    SocketService.instance.send({
        action: "getData",
        socketType: "trendData",
        chartName: "trend",
        value: "",
    });
});
onUnmounted(() => {
    SocketService.instance.unRegisterCallBack("trendData");
});

// res 就是服务器端发送给客户端的图表数据
const getData = (res: any[]) => {
    count = res;
    updateChart();
};

const updateChart = () => {
    // 半透明的颜色值
    const colorArr1 = [
        "rgba(11, 168, 44, 0.5)",
        "rgba(44, 110, 255, 0.5)",
        "rgba(22, 242, 217, 0.5)",
        "rgba(254, 33, 30, 0.5)",
        "rgba(250, 105, 0, 0.5)",
    ];
    // 全透明的颜色值
    const colorArr2 = [
        "rgba(11, 168, 44, 0.2)",
        "rgba(44, 110, 255, 0.2)",
        "rgba(22, 242, 217, 0.2)",
        "rgba(254, 33, 30, 0.2)",
        "rgba(250, 105, 0, 0.2)",
    ];
    // 处理数据
    // y轴的数据 series下的数据
    valueArr.value = count[1].data;
    seriesArr.value = valueArr.value.map((item: any, index: any) => {
        return {
            name: item.name,
            type: "line",
            data: item.data,
            stack: choiceType,
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: colorArr1[index],
                    }, // %0的颜色值
                    {
                        offset: 1,
                        color: colorArr2[index],
                    }, // 100%的颜色值
                ]),
            },
        };
    });
    // 图例的数据
    legendArr.value = valueArr.value.map((item: any) => {
        return item.name;
    });
};

const handleSelect = (currentType: any) => {
    choiceType = currentType;
    updateChart();
    showChoice = false;
};

const selectTypes = computed(() => {
    if (!count) {
        return [];
    } else {
        return types.filter((item: any) => {
            return item.key !== choiceType;
        });
    }
});
const showTitle = computed(() => {
    if (!count) {
        return "";
    } else {
        return count[0];
    }
});
// 设置给标题的样式
const comStyle = computed(() => {
    return {
        fontSize: titleFontSize.value + "px",
        // color: getThemeValue(this.theme).titleColor,
    };
});
const marginStyle = computed(() => {
    return {
        marginLeft: titleFontSize.value + "px",
    };
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
            left: "3%",
            top: "35%",
            right: "4%",
            bottom: "1%",
            containLabel: true,
        },
        tooltip: {
            trigger: "axis",
        },
        legend: {
            left: 20,
            top: "15%",
            icon: "circle",
            data: legendArr.value,
            itemWidth: titleFontSize.value,
            itemHeight: titleFontSize.value,
            itemGap: titleFontSize.value,
            textStyle: {
                // fontSize: titleFontSize.value / 2,
                fontSize: titleFontSize.value,
            },
        },
        xAxis: {
            type: "category",
            boundaryGap: false,
            data: months,
        },
        yAxis: {
            type: "value",
        },
        series: seriesArr.value,
    };
});
</script>

<style lang="scss" scoped>
/* .title {
    position: absolute;
    left: 20px;
    top: 20px;
    z-index: 10;
    color: white;
    .title-icon {
        margin-left: 10px;
        cursor: pointer;
    }
    .select-con {
        background-color: #222733;
    }
} */
</style>
