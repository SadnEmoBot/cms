<!--
 * @Description:
 * @Author:
 * @Date: 2022-01-12 14:45:18
 * @LastEditTime: 2022-01-12 14:57:27
 * @LastEditors: Please set LastEditors
-->
<template>
    <div>404</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ElMessage } from "element-plus";

export default defineComponent({
    setup() {
        return {};
    },
    beforeRouteEnter() {
        ElMessage.warning("该页面暂未开放...");
    },
});
</script>

<style scoped lang="scss"></style>
