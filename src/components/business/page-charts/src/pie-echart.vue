<!--
 * @Description:
 * @Author:
 * @Date: 2022-01-18 00:45:39
 * @LastEditTime: 2022-01-18 01:00:48
 * @LastEditors:
-->
<template>
    <div class="pie-echart">
        <base-echart :options="options"></base-echart>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from "vue";
import BaseEchart from "@/components/common/base-ui/echart/src/base-echart.vue";
import { IPieEchartData } from "../types";

const props = defineProps<{
    pieData: IPieEchartData[];
}>();

const options = computed(() => {
    return {
        tooltip: {
            trigger: "item",
        },
        legend: {
            orient: "horizontal",
            left: "left",
        },
        series: [
            {
                name: "访问来源",
                type: "pie",
                radius: "50%",
                bottom: "-10%",
                data: props.pieData,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: "rgba(0, 0, 0, 0.5)",
                    },
                },
            },
        ],
    };
});
</script>

<style scoped></style>
