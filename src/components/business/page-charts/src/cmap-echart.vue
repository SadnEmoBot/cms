<!--
 * @Description:
 * @Author:
 * @Date: 2022-04-16 14:09:51
 * @LastEditTime: 2022-04-16 21:11:35
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
import {
    computed,
    ref,
    onMounted,
    onUnmounted,
    watchEffect,
    getCurrentInstance,
} from "vue";
import * as echarts from "echarts";
// const chalk = require("@/assets/echartsTheme/chalk.js");
import BaseEchart from "@/components/common/base-ui/echart/src/base-echart.vue";
import { offsetWidthRef } from "../types";

import SocketService from "@/utils/socket-service";

import { arrayRef } from "@/components/business/page-charts/types/index";

// const { proxy } = getCurrentInstance() as any;
// proxy?.$api["chart/getMap"]().then((res: any) => {
//     console.log(res);
// });
// 注册中国地图
import chinaJson from "@/components/common/base-ui/echart/data/china.json";
echarts.registerMap("china", chinaJson as any);

let currentPage = ref(1);
let totalPage: any = 0;
let count: any[] = [];
let legendArr = ref<arrayRef["names"]>([]);
let seriesArr = ref<arrayRef["values"]>([]);
let timer: any = null;

watchEffect(() => {
    [legendArr, seriesArr];
});

const baseEchartRef = ref<offsetWidthRef | null>();

let titleFontSize = ref();

onMounted(() => {
    if (baseEchartRef.value) {
        titleFontSize.value = (baseEchartRef.value.osw / 100) * 4;
    }

    SocketService.instance.registerCallBack("mapData", getData);
    SocketService.instance.send({
        action: "getData",
        socketType: "mapData",
        chartName: "map",
        value: "",
    });

    // const res = axios.get("http://localhost:8080/static/map/china.json");
    // echarts.registerMap("china", res.data as any);
});
onUnmounted(() => {
    clearInterval(timer);
    SocketService.instance.unRegisterCallBack("mapData");
});

// res 就是服务器端发送给客户端的图表数据
const getData = (res: any) => {
    count = JSON.parse(res);
    updateChart();
    startInterval();
};

const updateChart = () => {
    legendArr.value = count.map((item) => item.name);
    seriesArr.value = count.map((item) => {
        // return的这个对象就代表的是一个类别下的所有散点数据
        // 如果想在地图中显示散点的数据, 我们需要给散点的图表增加一个配置, coordinateSystem:geo
        return {
            type: "effectScatter",
            rippleEffect: {
                scale: 5,
                brushType: "stroke",
            },
            name: item.name,
            data: item.children,
            coordinateSystem: "geo",
        };
    });
};

const startInterval = () => {
    if (timer) {
        clearInterval(timer);
    }
    timer = setInterval(() => {
        currentPage.value++;
        if (currentPage.value > totalPage) {
            currentPage.value = 1;
        }
        updateChart();
    }, 3000);
};

const options = computed(() => {
    return {
        title: {
            text: "▎商家分布",
            left: 20,
            top: 20,
            textStyle: {
                fontSize: titleFontSize.value,
            },
        },
        geo: {
            type: "map",
            map: "china",
            top: "5%",
            bottom: "5%",
            itemStyle: {
                areaColor: "#87cefa",
                borderColor: "#333",
            },
        },
        legend: {
            left: "5%",
            bottom: "5%",
            orient: "vertical",
            itemWidth: titleFontSize.value / 2,
            itemHeight: titleFontSize.value / 2,
            itemGap: titleFontSize.value / 2,
            textStyle: {
                fontSize: titleFontSize.value / 2,
            },
            data: legendArr.value,
        },
        series: seriesArr.value,
    };
});
</script>

<style scoped></style>
