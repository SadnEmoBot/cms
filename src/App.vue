<!--
 * @Description:
 * @Author:
 * @Date: 2022-01-02 16:30:07
 * @LastEditTime: 2022-01-02 22:44:50
 * @LastEditors: Please set LastEditors
-->
<template>
    <div>
        <router-link to="/login">登录</router-link>
        <router-link to="/main">首页</router-link>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    setup() {
        return {};
    },
});
</script>

<style lang="scss" scoped></style>
