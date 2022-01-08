<!--
 * @Description:
 * @Author:
 * @Date: 2022-01-02 16:30:07
 * @LastEditTime: 2022-01-08 16:11:31
 * @LastEditors: Please set LastEditors
-->
<template>
    <div class="app">
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

<style lang="scss" scoped>
.app {
    height: 100%;
}
</style>
