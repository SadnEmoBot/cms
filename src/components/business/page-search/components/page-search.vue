<!--
 * @Description:
 * @Author:
 * @Date: 2022-01-14 01:28:26
 * @LastEditTime: 2022-01-14 01:38:53
 * @LastEditors: Please set LastEditors
-->
<template>
    <div class="page-search">
        <Form v-bind="searchFormConfig" v-model="formData">
            <template #header>111</template>
            <template #footer>
                <div class="handle-b">
                    <el-button type="primary">搜索</el-button>
                    <el-button type="primary">重置</el-button>
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
    setup() {
        const formData = ref({
            id: "",
            name: "",
            password: "",
            sport: "",
            createTime: "",
        });
        return {
            formData,
        };
    },
});
</script>

<style scoped lang="scss"></style>
