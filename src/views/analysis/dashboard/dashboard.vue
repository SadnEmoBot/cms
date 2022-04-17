<!--
 * @Description:
 * @Author:
 * @Date: 2022-01-12 23:36:32
 * @LastEditTime: 2022-01-18 01:14:25
 * @LastEditors: Please set LastEditors
-->
<template>
    <div class="dashboard">
        <!-- 1.顶部数据统计 -->
        <el-row :gutter="10">
            <template v-for="item in topPanelData" :key="item.title">
                <el-col :md="12" :lg="6" :xl="6">
                    <statistical-panel :panelData="item" />
                </el-col>
            </template>
        </el-row>

        <!-- 2.中间图标 -->
        <el-row :gutter="10">
            <el-col :span="7">
                <card title="分类商品数量(饼图)">
                    <pie-echart :pieData="categoryGoodsCount"></pie-echart>
                </card>
            </el-col>
            <el-col :span="10">
                <card title="不同城市商品销量">
                    <map-echart :mapData="addressGoodsSale"></map-echart>
                </card>
            </el-col>
            <el-col :span="7">
                <card title="分类商品数量(玫瑰图)">
                    <rose-echart :roseData="categoryGoodsCount"></rose-echart>
                </card>
            </el-col>
        </el-row>

        <!-- 3.底部图标 -->
        <el-row :gutter="10" class="row">
            <el-col :span="12">
                <card title="分类商品的销量">
                    <line-echart v-bind="categoryGoodsSale"></line-echart>
                </card>
            </el-col>
            <el-col :span="12">
                <card title="分类商品的收藏">
                    <bar-echart v-bind="categoryGoodsSale"></bar-echart>
                </card>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "@/service/store/type";

import StatisticalPanel from "@/components/business/statistical-panel/index";
import Card from "@/components/common/base-ui/card/src/card.vue";
import {
    PieEchart,
    MapEchart,
    RoseEchart,
    LineEchart,
    BarEchart,
} from "@/components/business/page-charts";

export default defineComponent({
    name: "dashboard",
    components: {
        Card,
        StatisticalPanel,
        PieEchart,
        MapEchart,
        RoseEchart,
        LineEchart,
        BarEchart,
    },
    setup() {
        // 1.发起数据统计的网络请求
        const store = useStore();
        store.dispatch("chart/getDashboardDataAction");

        // 2.获取顶部PanelData
        const topPanelData = computed(() => store.state.chart.topPanelDatas);

        // 3.获取中部数据
        const categoryGoodsCount = computed(() => {
            return store.state.chart.categoryGoodsCount.map((item: any) => {
                return { value: item.goodsCount, name: item.name };
            });
        });
        const goodsSaleTop10 = computed(() => {
            return store.state.chart.goodsSaleTop10.map((item: any) => {
                return { value: item.saleCount, name: item.name };
            });
        });
        const addressGoodsSale = computed(() => {
            return store.state.chart.addressGoodsSale.map((item: any) => {
                return { name: item.address, value: item.count };
            });
        });

        // 4.获取底部数据
        const categoryGoodsSale = computed(() => {
            const goodsSale = store.state.chart.categoryGoodsSale;
            const labels: string[] = [];
            const values: any[] = [];
            for (const item of goodsSale) {
                labels.push(item.name);
                values.push(item.goodsCount);
            }
            return { labels, values };
        });

        return {
            topPanelData,
            categoryGoodsCount,
            goodsSaleTop10,
            categoryGoodsSale,
            addressGoodsSale,
        };
    },
});
</script>

<style scoped lang="scss">
.dashboard {
    background-color: #f5f5f5;

    .row {
        margin-top: 20px;
    }
}
</style>
