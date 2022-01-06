<!--
 * @Description:
 * @Author:
 * @Date: 2022-01-02 17:42:59
 * @LastEditTime: 2022-01-04 22:01:29
 * @LastEditors: Please set LastEditors
-->
<template>
    <div>main</div>
    <el-button type="primary" @click="getT">按钮</el-button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ElMessage } from "element-plus";

export default defineComponent({
    setup() {
        const getT = () => {
            ElMessage.success("ok");
        };
        return {
            getT,
        };
    },
});
</script>

<style scoped></style>
