<!--
 * @Description:
 * @Author:
 * @Date: 2022-01-12 23:45:39
 * @LastEditTime: 2022-01-16 21:36:30
 * @LastEditors: Please set LastEditors
-->
<template>
    <page-search
        :searchFormConfig="searchFormConfig"
        @resetBtnClick="handleResetClick"
        @queryBtnClick="handleQueryClick"
    ></page-search>
    <page-content
        ref="pageContentRef"
        :contentTableConfig="contentTableConfig"
        pageName="users"
        @newBtnClick="handleNewData"
        @editBtnClick="handleEditData"
    ></page-content>
    <page-modal
        :modalConfig="modalConfigRef"
        ref="pageModalRef"
        :defaultInfo="defaultInfo"
        pageName="users"
    ></page-modal>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

import PageSearch from "@/components/business/page-search/index";
import PageContent from "@/components/business/page-content/index";
import PageModal from "@/components/business/page-modal/index";

import { searchFormConfig } from "./config/search.config";
import { contentTableConfig } from "./config/content.config";
import { modalConfig } from "./config/modal.config";

// 交互逻辑的hook
import { usePageSearch } from "@/hooks/usePageSearch";
import { usePageModal } from "@/hooks/usePageModal";

import { useStore } from "@/service/store/type";

export default defineComponent({
    components: {
        PageSearch,
        PageContent,

        PageModal,
    },
    setup() {
        const [handleResetClick, handleQueryClick, pageContentRef] =
            usePageSearch();

        // pageModal相关的hook逻辑
        // 1.处理密码的逻辑(新建时显示，编辑时不显示)
        const newCallback = () => {
            const passwordItem = modalConfig.formItems.find(
                (item) => item.field === "password"
            );
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            passwordItem!.isFormItemHidden = false;
        };
        const editCallback = () => {
            const passwordItem = modalConfig.formItems.find(
                (item) => item.field === "password"
            );
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            passwordItem!.isFormItemHidden = true;
        };

        // 2.动态添加部门和角色列表
        const store = useStore();
        const modalConfigRef = computed(() => {
            const departmentItem = modalConfig.formItems.find(
                (item) => item.field === "departmentId"
            );
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            departmentItem!.options = store.state.root.entireDepartment.map(
                (item) => {
                    return { title: item.name, value: item.id };
                }
            );

            const roleItem = modalConfig.formItems.find(
                (item) => item.field === "roleId"
            );
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            roleItem!.options = store.state.root.entireRole.map((item) => {
                return { title: item.name, value: item.id };
            });
            return modalConfig;
        });

        // 3.调用hook获取公共变量和函数
        const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
            usePageModal(newCallback, editCallback);

        return {
            searchFormConfig,
            contentTableConfig,
            modalConfigRef,
            handleResetClick,
            handleQueryClick,
            pageContentRef,

            usePageModal,
            pageModalRef,
            handleNewData,
            handleEditData,
            defaultInfo,
        };
    },
});
</script>

<style scoped lang="scss"></style>
