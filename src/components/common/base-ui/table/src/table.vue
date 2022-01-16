<!--
 * @Description:
 * @Author:
 * @Date: 2022-01-15 17:29:03
 * @LastEditTime: 2022-01-16 17:40:06
 * @LastEditors: Please set LastEditors
-->
<template>
    <div class="header">
        <slot name="header">
            <div class="title">{{ title }}</div>
            <div class="handler">
                <!-- <el-button type="primary" size="large" v-if="showAddBtn">{{
                    addName
                }}</el-button> -->
                <slot name="headerHandler"></slot>
            </div>
        </slot>
    </div>
    <el-table
        :data="tableData"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
        v-bind="childrenProps"
    >
        <el-table-column
            v-if="showSelectColumn"
            type="selection"
            align="center"
            width="60"
        >
        </el-table-column>
        <el-table-column
            v-if="showTableIndex"
            type="index"
            label="序号"
            align="center"
            width="80"
        >
        </el-table-column>
        <template v-for="propItem in propList" :key="propItem.prop">
            <el-table-column
                v-bind="propItem"
                align="center"
                show-overflow-tooltip
            >
                <template #default="scope">
                    <!-- 动态插槽 -->
                    <slot :name="propItem.slotName" :row="scope.row">
                        {{ scope.row[propItem.prop] }}
                    </slot>
                </template>
            </el-table-column>
        </template>
    </el-table>
    <div class="footer" v-if="showFooter">
        <slot name="footer">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page.currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="page.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="listCount"
            >
            </el-pagination>
        </slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        title: {
            type: String,
            default: "",
        },
        addName: {
            type: String,
            default: "新建",
        },
        tableData: {
            type: Array,
            required: true,
        },
        listCount: {
            type: Number || Array,
            default: 0,
        },
        propList: {
            type: Array,
            required: true,
        },
        showTableIndex: {
            type: Boolean,
            default: false,
        },
        showSelectColumn: {
            type: Boolean,
            default: false,
        },
        page: {
            type: Object,
            default: () => ({ currentPage: 0, pageSize: 10 }),
        },
        childrenProps: {
            type: Object,
            default: () => ({}),
        },

        showFooter: {
            type: Boolean,
            default: true,
        },
        // showAddBtn: {
        //     type: Boolean,
        //     default: true,
        // },
        isCreate: {
            type: Boolean,
            default: true,
        },
    },
    emits: ["selectionChange", "update:page"],
    setup(props, { emit }) {
        const handleSelectionChange = (value: any) => {
            // console.log(value);
            emit("selectionChange", value);
        };
        const handleSizeChange = (pageSize: number) => {
            emit("update:page", { ...props.page, pageSize });
        };
        const handleCurrentChange = (currentPage: number) => {
            emit("update:page", { ...props.page, currentPage });
        };
        return {
            handleSelectionChange,
            handleCurrentChange,
            handleSizeChange,
        };
    },
});
</script>

<style scoped lang="scss">
.header {
    display: flex;
    height: 45px;
    padding: 0 5px;
    justify-content: space-between;
    align-items: center;

    .title {
        font-size: 20px;
        font-weight: 700;
    }

    .handler {
        align-items: center;
    }
}

.footer {
    margin-top: 15px;

    .el-pagination {
        text-align: right;
    }
}
</style>
