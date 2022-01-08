<!--
 * @Description:
 * @Author:
 * @Date: 2022-01-02 17:42:36
 * @LastEditTime: 2022-01-04 21:56:49
 * @LastEditors: Please set LastEditors
-->
<template>
    <div>login</div>
    <el-button type="primary" @click="getTest">按钮</el-button>
</template>

<script lang="ts">
import {
    defineComponent,
    getCurrentInstance,
    ComponentInternalInstance,
} from "vue"; //不知道是安装了volar还是reload了一遍 不再报错

// 如果const { proxy } = getCurrentInstance() as any的话 不用声明也照样能发送请求
// declare module "@vue/runtime-core" {
//     interface ComponentCustomProperties {
//         $api: any;
//     }
// }

export default defineComponent({
    setup() {
        const { proxy } = getCurrentInstance() as any; // as any的话就不用导入ComponentInternalInstance了
        const getTest = () => {
            proxy?.$api["user/getTest"]().then((res: any) => {
                console.log(res);
            });
            proxy?.$message.success("ok");
        };
        return {
            getTest,
        };
    },
});
</script>

<style scoped></style>
