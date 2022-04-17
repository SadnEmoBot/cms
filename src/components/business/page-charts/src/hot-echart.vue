<!--
 * @Description:
 * @Author:
 * @Date: 2022-04-17 01:30:11
 * @LastEditTime: 2022-04-17 12:41:59
 * @LastEditors: Please set LastEditors
-->
<template>
    <div class="bar-echart hot-echart">
        <base-echart
            ref="baseEchartRef"
            :options="options"
            :height="450 + 'px'"
        ></base-echart>
        <span class="iconfont arr-left" @click="toLeft" :style="comStyle"
            >&#xe6ef;</span
        >
        <span class="iconfont arr-right" @click="toRight" :style="comStyle"
            >&#xe6ed;</span
        >
    </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watchEffect } from "vue";
// const chalk = require("@/assets/echartsTheme/chalk.js");
import BaseEchart from "@/components/common/base-ui/echart/src/base-echart.vue";
import { offsetWidthRef } from "../types";

import SocketService from "@/utils/socket-service";

import { arrayRef } from "@/components/business/page-charts/types/index";

let count: any = [];
let currentIndex = ref(0); // 当前所展示出的一级分类数据
let legendData = ref<arrayRef["values"]>([]);
let seriesData = ref<arrayRef["values"]>([]);

watchEffect(() => {
    [legendData, seriesData];
});

const baseEchartRef = ref<offsetWidthRef | null>();

let titleFontSize = ref();

onMounted(() => {
    if (baseEchartRef.value) {
        titleFontSize.value = (baseEchartRef.value.osw / 100) * 4;
    }

    SocketService.instance.registerCallBack("hotData", getData);
    SocketService.instance.send({
        action: "getData",
        socketType: "hotData",
        chartName: "hot",
        value: "",
    });
});
onUnmounted(() => {
    SocketService.instance.unRegisterCallBack("hotData");
});

// res 就是服务器端发送给客户端的图表数据
const getData = (res: any) => {
    count = JSON.parse(res);
    updateChart();
};

const updateChart = () => {
    legendData.value = count[currentIndex.value].children.map((item: any) => {
        return item.name;
    });
    seriesData.value = count[currentIndex.value].children.map((item: any) => {
        return {
            name: item.name,
            value: item.value,
            children: item.children, // 新增加children的原因是为了在tooltip中的formatter的回调函数中,来拿到这个二级分类下的三级分类数据
        };
    });
};
const toLeft = () => {
    currentIndex.value--;
    if (currentIndex.value < 0) {
        currentIndex.value = count.length - 1;
    }
    updateChart();
};
const toRight = () => {
    currentIndex.value++;
    if (currentIndex.value > count.length - 1) {
        currentIndex.value = 0;
    }
    updateChart();
};
// const catName = computed(() => {
//     if (!count) {
//         return "";
//     } else {
//         return count[currentIndex.value].name;
//     }
// });
const comStyle = computed(() => {
    return {
        fontSize: titleFontSize.value + "px",
        // color: getThemeValue(theme).titleColor,
    };
});
const options = computed(() => {
    return {
        title: {
            text: "▎热销商品的占比",
            left: 20,
            top: 20,
            textStyle: {
                fontSize: titleFontSize.value,
            },
        },
        legend: {
            top: "15%",
            icon: "circle",
            itemWidth: titleFontSize.value,
            itemHeight: titleFontSize.value,
            itemGap: titleFontSize.value / 2,
            textStyle: {
                // fontSize: titleFontSize.value / 2,
                fontSize: titleFontSize.value / 1.2,
            },
            data: legendData.value,
        },
        tooltip: {
            show: true,
            formatter: (arg: any) => {
                // console.log(arg)
                const thirdCategory = arg.data.children;
                // 计算出所有三级分类的数值总和
                let total = 0;
                thirdCategory.forEach((item: any) => {
                    total += item.value;
                });
                let retStr = "";
                thirdCategory.forEach((item: any) => {
                    retStr += `
                    ${item.name}:${Number((item.value / total) * 100) + "%"}
                    <br/>
                    `;
                });
                return retStr;
            },
        },
        series: [
            {
                type: "pie",
                label: {
                    show: false,
                },
                emphasis: {
                    label: {
                        show: true,
                    },
                    labelLine: {
                        show: false,
                    },
                },
                radius: titleFontSize.value * 4.5,
                center: ["50%", "60%"],
                data: seriesData.value,
            },
        ],
    };
});
</script>

<style lang="scss" scoped>
.hot-echart {
    position: relative;
    .arr-left {
        position: absolute;
        left: 10%;
        top: 60%;
        transform: translateY(-60%);
        cursor: pointer;
        color: black;
    }
    .arr-right {
        position: absolute;
        right: 10%;
        top: 60%;
        transform: translateY(-60%);
        cursor: pointer;
        color: black;
    }
}
</style>
