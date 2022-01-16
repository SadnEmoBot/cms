<!--
 * @Description:
 * @Author:
 * @Date: 2022-01-12 23:44:58
 * @LastEditTime: 2022-01-16 00:45:37
 * @LastEditors: Please set LastEditors
-->
<template>
    <page-search :searchFormConfig="searchFormConfig"></page-search>
    <page-content
        :contentTableConfig="contentTableConfig"
        pageName="role"
    ></page-content>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import PageSearch from "@/components/business/page-search/index";
import PageContent from "@/components/business/page-content/index";

import { searchFormConfig } from "./config/search.config";
import { contentTableConfig } from "./config/content.config";

export default defineComponent({
    components: {
        PageSearch,
        PageContent,
    },
    setup() {
        return {
            searchFormConfig,
            contentTableConfig,
        };
    },
});
</script>

<style scoped lang="scss"></style>
