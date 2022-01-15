<!--
 * @Description:
 * @Author:
 * @Date: 2022-01-12 23:45:39
 * @LastEditTime: 2022-01-14 01:36:49
 * @LastEditors: Please set LastEditors
-->
<template>
    <page-search :searchFormConfig="searchFormConfig"></page-search>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PageSearch from "@/components/business/page-search/index";
import { searchFormConfig } from "./config/search.config";

export default defineComponent({
    components: {
        PageSearch,
    },
    setup() {
        return {
            searchFormConfig,
        };
    },
});
</script>

<style scoped></style>
