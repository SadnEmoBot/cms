<!--
 * @Description:
 * @Author:
 * @Date: 2022-01-10 01:29:35
 * @LastEditTime: 2022-01-13 23:50:37
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
        <div class="content">
            <breadcrumb :breadcrumbs="breadcrumbs" />
            <header-info />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import breadcrumb from "@/components/common/breadcrumb/src/breadcrumb.vue";
import HeaderInfo from "./header-info.vue";
import { pathMapBreadcrumbs } from "@/utils/map-menus";
import { useStore } from "@/service/store/type";
import { useRoute } from "vue-router";
// import { toRaw } from "@vue/reactivity";

export default defineComponent({
    components: {
        HeaderInfo,
        breadcrumb,
    },
    emits: ["foldChange"],
    setup(props, { emit }) {
        const isFold = ref(false);
        const handleFoldClick = () => {
            isFold.value = !isFold.value;
            emit("foldChange", isFold.value);
        };
        // 面包屑的数据: [{name: , path: }]
        const store = useStore();
        const breadcrumbs = computed(() => {
            const userMenus = store.state.user.userMenus;
            const route = useRoute();
            const currentPath = route.path;
            return pathMapBreadcrumbs(userMenus, currentPath);
        });

        return {
            isFold,
            breadcrumbs,
            handleFoldClick,
        };
    },
});
</script>

<style scoped lang="scss">
.nav-header {
    display: flex;
    width: 100%;
    .fold-menu {
        font-size: 30px;
        cursor: pointer;
    }
    .content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex: 1;
        padding: 0 20px;
    }
}
</style>
