<!--
 * @Description:
 * @Author:
 * @Date: 2022-01-16 18:55:03
 * @LastEditTime: 2022-01-16 21:41:39
 * @LastEditors: Please set LastEditors
-->
<template>
    <div class="page-modal">
        <el-dialog
            title="新建用户"
            v-model="dialogVisible"
            width="30%"
            center
            destroy-on-close
        >
            <Form v-bind="modalConfig" v-model="formData"></Form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleConfirmClick"
                        >确 定</el-button
                    >
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import Form from "@/components/common/base-ui/form/form.vue";
import { useStore } from "@/service/store/type";

export default defineComponent({
    components: {
        Form,
    },
    props: {
        modalConfig: {
            type: Object,
            required: true,
        },
        defaultInfo: {
            type: Object,
            default: () => ({}),
        },
        pageName: {
            type: String,
            require: true,
        },
    },
    setup(props) {
        const dialogVisible = ref(false);
        const formData = ref<any>({});

        watch(
            () => props.defaultInfo,
            (newValue) => {
                for (const item of props.modalConfig.formItems) {
                    formData.value[`${item.field}`] = newValue[`${item.field}`];
                }
            }
        );

        // 点击确定按钮的逻辑
        const store = useStore();
        const handleConfirmClick = () => {
            dialogVisible.value = false;
            // watch的defaultInfo是否有长度 没长度就代表新建 有长度就是编辑
            if (Object.keys(props.defaultInfo).length) {
                // 编辑
                store.dispatch("system/editPageDataAction", {
                    pageName: props.pageName,
                    editData: { ...formData.value },
                    id: props.defaultInfo.id,
                });
            } else {
                // 新建
                store.dispatch("system/createPageDataAction", {
                    pageName: props.pageName,
                    newData: { ...formData.value },
                });
            }
        };

        return {
            dialogVisible,
            formData,

            handleConfirmClick,
        };
    },
});
</script>

<style scoped></style>
