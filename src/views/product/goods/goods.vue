<!--
 * @Description:
 * @Author:
 * @Date: 2022-01-12 23:41:18
 * @LastEditTime: 2022-01-16 16:13:05
 * @LastEditors: Please set LastEditors
-->
<template>
    <page-content :contentTableConfig="contentTableConfig" pageName="goods">
        <template #image="scope">
            <el-image
                style="width: 80px; height: 80px"
                :src="scope.row.imgUrl"
                :preview-src-list="[scope.row.imgUrl]"
            ></el-image>
        </template>

        <template #oldPrice="scope">
            {{ "￥" + scope.row.oldPrice }}
        </template>
    </page-content>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { contentTableConfig } from "./config/content.config";

export default defineComponent({
    setup() {
        return {
            contentTableConfig,
        };
    },
});
</script>

<style scoped></style>
