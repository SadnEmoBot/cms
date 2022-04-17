<!--
 * @Description:
 * @Author:
 * @Date: 2022-04-04 15:14:21
 * @LastEditTime: 2022-04-10 15:05:51
 * @LastEditors: Please set LastEditors
-->
<template>
    <card title="分类商品的收藏">
        <seller-echart v-bind="goodsSaleCount"></seller-echart>
    </card>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watchEffect } from "vue";
import { useStore } from "@/service/store/type";

import Card from "@/components/common/base-ui/card/src/card.vue";
import SellerEchart from "@/components/business/page-charts/src/seller-echart.vue";

import SocketService from "@/utils/socket-service";

import { arrayRef } from "@/components/business/page-charts/types/index";

const store = useStore();
store.dispatch("chart/getDashboardDataAction");

let currentPage = ref(1);
let totalPage: any = 0;
let count: any[] = [];
let names = ref<arrayRef["names"]>([]);
let values = ref<arrayRef["values"]>([]);
let timer: any = null;

// watchEffect([names, values]);
watchEffect(() => {
    [names, values];
});

onMounted(() => {
    SocketService.instance.registerCallBack("sellerData", getData);
    SocketService.instance.send({
        action: "getData",
        socketType: "sellerData",
        chartName: "seller",
        value: "",
    });
});
onUnmounted(() => {
    clearInterval(timer);
    SocketService.instance.unRegisterCallBack("sellerData");
});

// res 就是服务器端发送给客户端的图表数据
const getData = (res: any[]) => {
    count = res;
    totalPage =
        count.length % 5 === 0 ? count.length / 5 : count.length / 5 + 1;
    updateChart();
    startInterval();
};

const updateChart = () => {
    const start = (currentPage.value - 1) * 5;
    const end = currentPage.value * 5;
    const showData = count.slice(start, end);

    names.value = showData.map((item) => item.name);
    values.value = showData.map((item) => item.value);
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

const goodsSaleCount = computed(() => {
    // count = store.state.chart.goodsSaleCount;
    return { name: names.value, value: values.value };
});
</script>

<style scoped lang="scss"></style>
