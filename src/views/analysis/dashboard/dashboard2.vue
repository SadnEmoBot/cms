<!--
 * @Description:
 * @Author:
 * @Date: 2022-04-04 15:14:21
 * @LastEditTime: 2022-04-17 02:48:50
 * @LastEditors: Please set LastEditors
-->
<template>
    <!-- <card title="分类商品的收藏">
        <seller-echart></seller-echart>
    </card>
    <card title="分类商品的收藏1">
        <trend-echart></trend-echart>
    </card>
    <card title="地图">
        <cmap-echart></cmap-echart>
    </card>
    <card title="地区销量排行">
        <rank-echart></rank-echart>
    </card>
    <card title="库存和销量分析">
        <stock-echart></stock-echart>
    </card>
    <card title="热销商品图表">
        <hot-echart></hot-echart>
    </card> -->
    <div class="screen-container">
        <div class="screen-body">
            <section class="screen-left">
                <div
                    id="left-top"
                    :class="[fullScreenStatus.trend ? 'fullscreen' : '']"
                >
                    <!-- 销量趋势图表 -->
                    <trend-echart></trend-echart>
                    <div class="resize">
                        <!-- icon-compress-alt -->
                        <span
                            @click="changeSize('trend')"
                            :class="[
                                'iconfont',
                                fullScreenStatus.trend
                                    ? 'icon-compress-alt'
                                    : 'icon-expand-alt',
                            ]"
                        ></span>
                    </div>
                </div>
                <div
                    id="left-bottom"
                    :class="[fullScreenStatus.seller ? 'fullscreen' : '']"
                >
                    <!-- 商家销售金额图表 -->
                    <seller-echart></seller-echart>
                    <div class="resize">
                        <!-- icon-compress-alt -->
                        <span
                            @click="changeSize('seller')"
                            :class="[
                                'iconfont',
                                fullScreenStatus.seller
                                    ? 'icon-compress-alt'
                                    : 'icon-expand-alt',
                            ]"
                        ></span>
                    </div>
                </div>
            </section>
            <section class="screen-middle">
                <div
                    id="middle-top"
                    :class="[fullScreenStatus.map ? 'fullscreen' : '']"
                >
                    <!-- 商家分布图表 -->
                    <cmap-echart></cmap-echart>
                    <div class="resize">
                        <!-- icon-compress-alt -->
                        <span
                            @click="changeSize('map')"
                            :class="[
                                'iconfont',
                                fullScreenStatus.map
                                    ? 'icon-compress-alt'
                                    : 'icon-expand-alt',
                            ]"
                        ></span>
                    </div>
                </div>
                <div
                    id="middle-bottom"
                    :class="[fullScreenStatus.rank ? 'fullscreen' : '']"
                >
                    <!-- 地区销量排行图表 -->
                    <rank-echart></rank-echart>
                    <div class="resize">
                        <!-- icon-compress-alt -->
                        <span
                            @click="changeSize('rank')"
                            :class="[
                                'iconfont',
                                fullScreenStatus.rank
                                    ? 'icon-compress-alt'
                                    : 'icon-expand-alt',
                            ]"
                        ></span>
                    </div>
                </div>
            </section>
            <section class="screen-right">
                <div
                    id="right-top"
                    :class="[fullScreenStatus.hot ? 'fullscreen' : '']"
                >
                    <!-- 热销商品占比图表 -->
                    <hot-echart></hot-echart>
                    <div class="resize">
                        <!-- icon-compress-alt -->
                        <span
                            @click="changeSize('hot')"
                            :class="[
                                'iconfont',
                                fullScreenStatus.hot
                                    ? 'icon-compress-alt'
                                    : 'icon-expand-alt',
                            ]"
                        ></span>
                    </div>
                </div>
                <div
                    id="right-bottom"
                    :class="[fullScreenStatus.stock ? 'fullscreen' : '']"
                >
                    <!-- 库存销量分析图表 -->
                    <stock-echart></stock-echart>
                    <div class="resize">
                        <!-- icon-compress-alt -->
                        <span
                            @click="changeSize('stock')"
                            :class="[
                                'iconfont',
                                fullScreenStatus.stock
                                    ? 'icon-compress-alt'
                                    : 'icon-expand-alt',
                            ]"
                        ></span>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

import Card from "@/components/common/base-ui/card/src/card.vue";
import SellerEchart from "@/components/business/page-charts/src/seller-echart.vue";
import TrendEchart from "@/components/business/page-charts/src/trend-echart.vue";
import CmapEchart from "@/components/business/page-charts/src/cmap-echart.vue";
import RankEchart from "@/components/business/page-charts/src/rank-echart.vue";
import StockEchart from "@/components/business/page-charts/src/stock-echart.vue";
import HotEchart from "@/components/business/page-charts/src/hot-echart.vue";

import SocketService from "@/utils/socket-service";

// 定义每一个图表的全屏状态
const fullScreenStatus: any = {
    trend: false,
    seller: false,
    map: false,
    rank: false,
    hot: false,
    stock: false,
};

onMounted(() => {
    SocketService.instance.registerCallBack("fullScreen", recvData);
});

const changeSize = (chartName: string) => {
    // 1.改变fullScreenStatus的数据
    // this.fullScreenStatus[chartName] = !this.fullScreenStatus[chartName]
    // 2.需要调用每一个图表组件的screenAdapter的方法
    // this.$refs[chartName].screenAdapter()
    // this.$nextTick(() => {
    //   this.$refs[chartName].screenAdapter()
    // })
    // 将数据发送给服务端
    const targetValue = !fullScreenStatus[chartName];
    SocketService.instance.send({
        action: "fullScreen",
        socketType: "fullScreen",
        chartName: chartName,
        value: targetValue,
    });
};
// 接收到全屏数据之后的处理
const recvData = (data: any) => {
    // 取出是哪一个图表需要进行切换
    const chartName = data.chartName;
    // 取出, 切换成什么状态
    const targetValue = data.value;
    fullScreenStatus[chartName] = targetValue;
};
</script>

<style scoped lang="scss">
// 全屏样式的定义
.fullscreen {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
    margin: 0 !important;
    z-index: 100;
}

.screen-container {
    width: 100%;
    height: 100%;
    padding: 0 20px;
    background-color: #161522;
    color: #fff;
    box-sizing: border-box;
}
.screen-header {
    width: 100%;
    height: 64px;
    font-size: 20px;
    position: relative;
    > div {
        img {
            width: 100%;
        }
    }
    .title {
        position: absolute;
        left: 50%;
        top: 50%;
        font-size: 20px;
        transform: translate(-50%, -50%);
    }
    .title-right {
        display: flex;
        align-items: center;
        position: absolute;
        right: 0px;
        top: 50%;
        transform: translateY(-80%);
    }
    .qiehuan {
        width: 28px;
        height: 21px;
        cursor: pointer;
    }
    .datetime {
        font-size: 15px;
        margin-left: 10px;
    }
    .logo {
        position: absolute;
        left: 0px;
        top: 50%;
        transform: translateY(-80%);
        img {
            height: 35px;
            width: 128px;
        }
    }
}
.screen-body {
    width: 100%;
    height: 100%;
    display: flex;
    margin-top: 10px;
    .screen-left {
        height: 100%;
        width: 27.6%;
        #left-top {
            height: 53%;
            position: relative;
        }
        #left-bottom {
            height: 31%;
            margin-top: 25px;
            position: relative;
        }
    }
    .screen-middle {
        height: 100%;
        width: 41.5%;
        margin-left: 1.6%;
        margin-right: 1.6%;
        #middle-top {
            width: 100%;
            height: 56%;
            position: relative;
        }
        #middle-bottom {
            margin-top: 25px;
            width: 100%;
            height: 28%;
            position: relative;
        }
    }
    .screen-right {
        height: 100%;
        width: 27.6%;
        #right-top {
            height: 46%;
            position: relative;
        }
        #right-bottom {
            height: 38%;
            margin-top: 25px;
            position: relative;
        }
    }
}
.resize {
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
}
</style>
