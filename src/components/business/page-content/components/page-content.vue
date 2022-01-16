<!--
 * @Description:
 * @Author:
 * @Date: 2022-01-15 21:50:23
 * @LastEditTime: 2022-01-16 19:07:43
 * @LastEditors: Please set LastEditors
-->
<template>
    <div class="page-content">
        <Table
            :tableData="dataList"
            :listCount="dataCount"
            :isCreate="isCreate"
            v-bind="contentTableConfig"
            v-model:page="pageInfo"
        >
            <template #headerHandler>
                <el-button
                    type="primary"
                    size="large"
                    v-if="isCreate"
                    @click="handleNewClick"
                    >{{ contentTableConfig.addName }}</el-button
                >
            </template>

            <template #status="scope">
                <el-button
                    size="small"
                    :type="scope.row.enable ? 'success' : 'danger'"
                >
                    {{ scope.row.enable ? "启用" : "禁用" }}</el-button
                >
            </template>
            <template #createAt="scope">
                <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
            </template>
            <template #updateAt="scope">
                <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
            </template>
            <template #operation="scope">
                <div class="operation">
                    <el-button
                        v-if="isUpdate"
                        size="small"
                        type="text"
                        @click="handleEditClick(scope.row)"
                        >编辑</el-button
                    >
                    <el-button
                        v-if="isDelete"
                        size="small"
                        type="text"
                        @click="handleDeleteClick(scope.row)"
                        >删除</el-button
                    >
                </div>
            </template>

            <!-- 动态插入剩余的自定义插槽 -->
            <template
                v-for="item in otherPropsSlots"
                :key="item.prop"
                #[item.slotName]="scope"
            >
                <template v-if="item.slotName">
                    <slot :name="item.slotName" :row="scope.row"></slot>
                </template>
            </template>
        </Table>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue";
import Table from "@/components/common/base-ui/table/src/table.vue";

import { useStore } from "@/service/store/type";

import { usePermission } from "@/hooks/usePermission";

export default defineComponent({
    components: {
        Table,
    },
    props: {
        contentTableConfig: {
            type: Object,
            required: true,
        },
        pageName: {
            type: String,
            required: true,
        },
    },
    emits: ["newBtnClick", "editBtnClick"],
    setup(props, { emit }) {
        const store = useStore();
        // 0. 获取用户操作权限
        const isCreate = usePermission(props.pageName, "create");
        const isUpdate = usePermission(props.pageName, "update");
        const isDelete = usePermission(props.pageName, "delete");
        const isQuery = usePermission(props.pageName, "query");

        // 1. 双向绑定pageInfo
        const pageInfo = ref({
            currentPage: 1,
            pageSize: 10,
        });
        // 监听数据变化  //这里如果写watchEffect 本来进页面就要调一次getPageData 就不用在88行再调一次了(调用getPageData时会调用pageInfo的getter,这时就收集依赖了)
        watch(pageInfo, () => {
            getPageData();
        });

        // 2. 发送网络请求
        const getPageData = (queryInfo: any = {}) => {
            if (!isQuery) return;
            store.dispatch("system/getPageListAction", {
                pageName: props.pageName,
                queryInfo: {
                    offset:
                        (pageInfo.value.currentPage - 1) *
                        pageInfo.value.pageSize,
                    size: pageInfo.value.pageSize,
                    ...queryInfo,
                },
            });
        };
        getPageData();

        // 3. 从vuex获取数据
        const dataList = computed(() =>
            store.getters[`system/pageListData`](props.pageName)
        );
        const dataCount = computed(() =>
            store.getters[`system/pageListCount`](props.pageName)
        );

        // 4.获取其他组件table.config文件的动态插槽名称
        const otherPropsSlots = props.contentTableConfig?.propList.filter(
            (item: any) => {
                if (item.slotName === "status") return false;
                if (item.slotName === "enable") return false;
                if (item.slotName === "createAt") return false;
                if (item.slotName === "updateAt") return false;
                if (item.slotName === "operation") return false;
                return true;
            }
        );

        // 5. 删除/新建/编辑操作
        const handleDeleteClick = (item: any) => {
            store.dispatch("system/deletePageDataAction", {
                pageName: props.pageName,
                id: item.id,
            });
        };

        const handleNewClick = () => {
            emit("newBtnClick");
        };

        const handleEditClick = (item: any) => {
            emit("editBtnClick", item);
        };
        return {
            dataList,
            dataCount,
            getPageData,
            pageInfo,
            otherPropsSlots,

            isCreate,
            isUpdate,
            isDelete,

            handleDeleteClick,
            handleEditClick,
            handleNewClick,
        };
    },
});
</script>

<style scoped lang="scss">
.page-content {
    padding: 20px;
    border-top: 20px solid #f5f5f5;
}
</style>
