<!--
 * @Description:
 * @Author:
 * @Date: 2022-01-18 00:45:39
 * @LastEditTime: 2022-01-18 01:00:24
 * @LastEditors:
-->
<template>
    <div class="line-echart">
        <base-echart :options="options"></base-echart>
    </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";
import BaseEchart from "@/components/common/base-ui/echart/src/base-echart.vue";
import { IEchartXAxisLabel, IEchartValueData } from "../types";

const props = defineProps<{
    labels: IEchartXAxisLabel[];
    values: IEchartValueData[];
}>();

const options = computed(() => {
    return {
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "cross",
                label: {
                    backgroundColor: "#6a7985",
                },
            },
        },
        legend: {},
        grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
        },
        xAxis: [
            {
                type: "category",
                boundaryGap: false,
                data: props.labels,
            },
        ],
        yAxis: [
            {
                type: "value",
            },
        ],
        series: [
            {
                name: "分类销量统计",
                type: "line",
                stack: "总量",
                areaStyle: {},
                emphasis: {
                    focus: "series",
                },
                data: props.values,
            },
        ],
    };
});
</script>

<style lang="scss" scoped></style>
