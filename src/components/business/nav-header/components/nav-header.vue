<!--
 * @Description:
 * @Author:
 * @Date: 2022-01-10 01:29:35
 * @LastEditTime: 2022-01-12 23:03:02
 * @LastEditors: Please set LastEditors
-->
<template>
    <div class="nav-header">
        <i class="fold-menu" v-if="isFold" @click="handleFoldClick">
            <el-icon><fold /></el-icon>
        </i>
        <!-- :class="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'" -->
        <i class="fold-menu" v-if="!isFold" @click="handleFoldClick">
            <el-icon><expand /></el-icon>
        </i>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    emits: ["foldChange"],
    setup(props, { emit }) {
        const isFold = ref(false);
        const handleFoldClick = () => {
            isFold.value = !isFold.value;
            emit("foldChange", isFold.value);
        };

        return {
            isFold,
            handleFoldClick,
        };
    },
});
</script>

<style scoped lang="scss">
.nav-header {
    .fold-menu {
        font-size: 30px;
        cursor: pointer;
    }
}
</style>
