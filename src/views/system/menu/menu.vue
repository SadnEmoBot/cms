<!--
 * @Description:
 * @Author:
 * @Date: 2022-01-12 23:44:33
 * @LastEditTime: 2022-01-16 16:23:43
 * @LastEditors: Please set LastEditors
-->
<template>
    <page-content :contentTableConfig="contentTableConfig" pageName="menu">
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
