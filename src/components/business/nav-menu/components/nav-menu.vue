<!--
 * @Description:
 * @Author:
 * @Date: 2022-01-10 01:30:58
 * @LastEditTime: 2022-01-19 17:02:08
 * @LastEditors: Please set LastEditors
-->
<template>
    <div class="nav-menu">
        <div class="logo">
            <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
            <span v-if="!collapse" class="title">=</span>
        </div>
        <el-menu
            :default-active="defaultMenu"
            class="el-menu-vertical"
            :collapse="collapse"
            background-color="#0c2135"
            text-color="#b7bdc3"
            active-text-color="#0a60bd"
        >
            <template v-for="item in userMenus" :key="item.id">
                <!-- 二级菜单 -->
                <template v-if="item.type === 1">
                    <!-- 二级菜单的可以展开的标题 -->
                    <el-sub-menu :index="item.id + ''">
                        <template #title>
                            <i v-if="item.icon" :class="item.icon"></i>
                            <span>{{ item.name }}</span>
                        </template>
                        <!-- 遍历里面的item -->
                        <template
                            v-for="subitem in item.children"
                            :key="subitem.id"
                        >
                            <el-menu-item
                                :index="subitem.id + ''"
                                @click="handleMenuItemClick(subitem)"
                            >
                                <i
                                    v-if="subitem.icon"
                                    :class="subitem.icon"
                                ></i>
                                <span>{{ subitem.name }}</span>
                            </el-menu-item>
                        </template>
                    </el-sub-menu>
                </template>
                <!-- 一级菜单 -->
                <template v-else-if="item.type === 2">
                    <el-menu-item :index="item.id + ''">
                        <i v-if="item.icon" :class="item.icon"></i>
                        <span>{{ item.name }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { toRaw } from "@vue/reactivity";
// import { useStore } from "vuex";
// import { useStore } from "@/plugins/store";
// import { useStore } from "./type";
import { useStore } from "@/service/store/type";
import { useRouter, useRoute } from "vue-router";
import { pathMapToMenu } from "@/utils/map-menus";

// vuex - typescript  => pinia

export default defineComponent({
    props: {
        collapse: {
            type: Boolean,
            default: false,
        },
    },
    setup() {
        const store = useStore();
        // const userMenus = JSON.parse(
        //     JSON.stringify(store.state.user.userMenus)
        // );
        const userMenus = toRaw(store.state.user.userMenus);
        // console.log(userMenus);

        const router = useRouter();

        const route = useRoute();
        const currentPath = route.path; // 1. 拿到url路径 /main/system/menu
        const menu = pathMapToMenu(userMenus, currentPath); // 2.根据路径currentPath去匹配menu(userMenus)
        const defaultMenu = ref(menu.id + ""); // 3.拿到menu.id作为el-menu的default-active(要求字符串 所以+"")

        const handleMenuItemClick = (item: any) => {
            // console.log(item);
            router.push({
                path: item.url ?? "/404",
            });
        };

        return {
            store,
            userMenus,
            defaultMenu,
            handleMenuItemClick,
        };
    },
});
</script>

<style scoped lang="scss">
.nav-menu {
    height: 100%;
    background-color: #001529;

    .logo {
        display: flex;
        height: 28px;
        padding: 12px 10px 8px 10px;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;

        .img {
            height: 100%;
            margin: 0 10px;
        }

        .title {
            font-size: 16px;
            font-weight: 700;
            color: white;
        }
    }

    .el-menu {
        border-right: none;
    }

    // 目录
    .el-submenu {
        background-color: #001529 !important;
        // 二级菜单 ( 默认背景 )
        .el-menu-item {
            padding-left: 50px !important;
            background-color: #0c2135 !important;
        }
    }

    :deep .el-submenu__title {
        background-color: #001529 !important;
    }

    // hover 高亮
    .el-menu-item:hover {
        color: #fff !important; // 菜单
    }

    .el-menu-item.is-active {
        color: #fff !important;
        background-color: #0a60bd !important;
    }
}

.el-menu-vertical:not(.el-menu--collapse) {
    width: 100%;
    height: calc(100% - 48px);
}
</style>
