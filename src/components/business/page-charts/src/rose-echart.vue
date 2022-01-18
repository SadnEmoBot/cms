<!--
 * @Description:
 * @Author:
 * @Date: 2022-01-18 00:45:39
 * @LastEditTime: 2022-01-18 01:08:25
 * @LastEditors: Please set LastEditors
-->
<template>
    <div class="rose-echart">
        <base-echart :options="options"></base-echart>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from "vue";
import BaseEchart from "@/components/common/base-ui/echart/src/base-echart.vue";
import { IPieEchartData } from "../types";

const props = defineProps<{
    roseData: IPieEchartData[];
}>();

const options = computed(() => {
    return {
        toolbox: {
            show: true,
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                restore: { show: true },
                saveAsImage: { show: true },
            },
        },
        tooltip: {
            trigger: "item",
        },
        series: [
            {
                name: "访问来源",
                type: "pie",
                radius: [10, 160],
                center: ["50%", "50%"],
                roseType: "area",
                itemStyle: {
                    borderRadius: 8,
                },
                data: props.roseData,
                label: {
                    show: false,
                },
            },
        ],
    };
});
</script>

<style lang="scss" scoped></style>
