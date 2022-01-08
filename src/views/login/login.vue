<!--
 * @Description:
 * @Author:
 * @Date: 2022-01-08 16:02:04
 * @LastEditTime: 2022-01-08 16:07:02
 * @LastEditors: Please set LastEditors
-->
<template>
    <div class="login">
        <login-panel />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoginPanel from "./components/login-panel.vue";

export default defineComponent({
    components: {
        LoginPanel,
    },
    setup() {
        return {};
    },
});
</script>

<style scoped lang="scss">
.login {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: url("../../assets/img/login-bg.svg");
}
</style>
