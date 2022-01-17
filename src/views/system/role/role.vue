<!--
 * @Description:
 * @Author:
 * @Date: 2022-01-12 23:44:58
 * @LastEditTime: 2022-01-17 15:30:37
 * @LastEditors: Please set LastEditors
-->
<template>
    <page-search :searchFormConfig="searchFormConfig"></page-search>
    <page-content
        :contentTableConfig="contentTableConfig"
        pageName="role"
        @newBtnClick="handleNewData"
        @editBtnClick="handleEditData"
    ></page-content>

    <page-modal
        :modalConfig="modalConfig"
        ref="pageModalRef"
        :defaultInfo="defaultInfo"
        :otherInfo="otherInfo"
        pageName="role"
    >
        <div class="menu-tree">
            <el-tree
                ref="elTreeRef"
                :data="menus"
                show-checkbox
                node-key="id"
                :props="{ children: 'children', label: 'name' }"
                @check="handleCheckChange"
            >
            </el-tree>
        </div>
    </page-modal>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from "vue";

import PageSearch from "@/components/business/page-search/index";
import PageContent from "@/components/business/page-content/index";
import PageModal from "@/components/business/page-modal/index";

import { searchFormConfig } from "./config/search.config";
import { contentTableConfig } from "./config/content.config";
import { modalConfig } from "./config/modal.config";

import { menuMapLeafKeys } from "@/utils/map-menus";
import { ElTree } from "element-plus";

// 交互逻辑的hook
// import { usePageSearch } from "@/hooks/usePageSearch";
import { usePageModal } from "@/hooks/usePageModal";

import { useStore } from "@/service/store/type";

export default defineComponent({
    components: {
        PageSearch,
        PageContent,

        PageModal,
    },
    setup() {
        // 1.护理pageModal的hook 传入usePageModal
        const elTreeRef = ref<InstanceType<typeof ElTree>>();
        const editCallback = (item: any) => {
            const leafKeys = menuMapLeafKeys(item.menuList);

            nextTick(() => {
                console.log(elTreeRef.value);

                elTreeRef.value?.setCheckedKeys(leafKeys, false);
            });
        };
        // 2. 添加菜单树
        const store = useStore();
        // const menus = computed(() => store.state.root.entireMenu);
        const menus = computed(() => store.state.entireMenu);

        const otherInfo = ref({});
        const handleCheckChange = (data1: any, data2: any) => {
            const checkedKeys = data2.checkedKeys;
            const halfCheckedKeys = data2.halfCheckedKeys;
            const menuList = [...checkedKeys, ...halfCheckedKeys]; // 将选中的一级,二级菜单选项存进menuList数组
            otherInfo.value = { menuList }; //转对象再存进otherInfo传入page-modal,再作为参数和formData.value一并发送edit/create请求
        };

        // 3.调用hook获取公共变量和函数
        const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
            usePageModal(undefined, editCallback);
        return {
            searchFormConfig,
            contentTableConfig,

            modalConfig,
            // usePageModal,
            pageModalRef,
            handleNewData,
            handleEditData,
            defaultInfo,

            menus,
            otherInfo,
            handleCheckChange,
            elTreeRef,
        };
    },
});
</script>

<style scoped lang="scss">
.menu-tree {
    margin-left: 25px;
}
</style>
