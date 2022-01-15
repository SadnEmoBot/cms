<!--
 * @Description:
 * @Author:
 * @Date: 2022-01-13 23:09:03
 * @LastEditTime: 2022-01-13 23:22:53
 * @LastEditors: Please set LastEditors
-->
<template>
    <div class="nav-breadcrumb">
        <el-breadcrumb separator="/">
            <template v-for="item in breadcrumbs" :key="item.name">
                <el-breadcrumb-item :to="{ path: item.path }">{{
                    item.name
                }}</el-breadcrumb-item>
            </template>
        </el-breadcrumb>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IBreadcrumb } from "./type";

export default defineComponent({
    props: {
        breadcrumbs: {
            type: Array as PropType<IBreadcrumb[]>,
            default: () => [],
        },
    },
    setup() {
        return {};
    },
});
</script>

<style scoped></style>
