<!--
 * @Description:
 * @Author:
 * @Date: 2022-01-18 00:16:28
 * @LastEditTime: 2022-04-17 12:33:09
 * @LastEditors: Please set LastEditors
-->
<template>
    <div class="base-echart">
        <div
            class="echart"
            ref="echartDivRef"
            :style="{ width: width, height: height }"
        ></div>
    </div>
</template>

<script lang="ts" setup>
import {
    ref,
    onMounted,
    defineProps,
    withDefaults,
    watchEffect,
    defineExpose,
} from "vue";
import { useEcharts } from "../hooks/useEcharts";
// import { EChartsOption } from "echarts";

const props = withDefaults(
    defineProps<{
        // options: EChartsOption;
        options: any;
        width?: string;
        height?: string;
        theme?: any;
        timer?: any;
        startInterval?: any;
    }>(),
    {
        options: () => ({}),
        timer: () => ({}),
        startInterval: () => ({}),
        width: "100%",
        height: "350px",
        theme: null,
    }
);
const echartDivRef = ref<HTMLElement>();
const osw = ref();
onMounted(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const [setOptions, setMouseOver, setMouseOut] = useEcharts(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        echartDivRef.value!,
        props.theme
    );
    osw.value = echartDivRef.value?.offsetWidth;
    watchEffect(() => {
        setOptions(props.options);
        setMouseOver(props.timer);
        setMouseOut(props.startInterval);
    });
});
defineExpose({
    osw,
});
</script>

<style scoped>
.echart {
    background-color: #fff;
}
</style>
