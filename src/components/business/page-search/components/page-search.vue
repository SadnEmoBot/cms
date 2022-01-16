<!--
 * @Description:
 * @Author:
 * @Date: 2022-01-14 01:28:26
 * @LastEditTime: 2022-01-16 11:49:44
 * @LastEditors: Please set LastEditors
-->
<template>
    <div class="page-search">
        <Form v-bind="searchFormConfig" v-model="formData">
            <template #header>111</template>
            <template #footer>
                <div class="handle-b">
                    <el-button type="primary" @click="handleQueryClick"
                        >搜索</el-button
                    >
                    <el-button type="primary" @click="handleResetClick"
                        >重置</el-button
                    >
                </div>
            </template>
        </Form>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Form from "@/components/common/base-ui/form/form.vue";

export default defineComponent({
    props: {
        searchFormConfig: {
            type: Object,
            required: true,
        },
    },
    components: {
        Form,
    },
    emits: ["resetBtnClick", "queryBtnClick"],
    setup(props, { emit }) {
        // 双向绑定的属性应该由配置文件search.config.ts的field来决定
        // 1. formData中的属性应该动态来决定
        const formItems = props.searchFormConfig?.formItems ?? [];
        const formItemField: any = {};
        for (const item of formItems) {
            formItemField[item.field] = "";
        }
        const formData = ref(formItemField);
        // const formData = ref({
        //     id: "",
        //     name: "",
        //     password: "",
        //     sport: "",
        //     createTime: "",
        // });

        // 2. 用户点击重置
        const handleResetClick = () => {
            for (const key in formItemField) {
                formData.value[`${key}`] = formItemField[key];
            }

            emit("resetBtnClick");
        };

        // 3. 用户点击搜索
        const handleQueryClick = () => {
            emit("queryBtnClick", formData.value);
        };
        return {
            formData,
            handleResetClick,
            handleQueryClick,
        };
    },
});
</script>

<style scoped lang="scss"></style>
