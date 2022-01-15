<!--
 * @Description:
 * @Author:
 * @Date: 2022-01-13 23:08:06
 * @LastEditTime: 2022-01-13 23:40:32
 * @LastEditors: Please set LastEditors
-->
<template>
    <div class="user-info">
        <el-dropdown>
            <span class="el-dropdown-link">
                <el-avatar
                    size="small"
                    src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                ></el-avatar>
                <span>{{ name }}</span>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item
                        >退出登录&nbsp;&nbsp;&nbsp;<el-icon
                            ><circle-close /></el-icon
                    ></el-dropdown-item>
                    <el-dropdown-item divided>用户信息</el-dropdown-item>
                    <el-dropdown-item>系统管理</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { toRaw } from "@vue/reactivity";
import { useStore } from "@/service/store/type";

export default defineComponent({
    setup() {
        const store = useStore();
        const name = toRaw(store.state.user.userInfo.name);

        return {
            name,
        };
    },
});
</script>

<style scoped>
.el-dropdown-link {
    cursor: pointer;
    display: flex;
    align-items: center;
}
</style>
