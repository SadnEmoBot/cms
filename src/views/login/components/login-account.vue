<!--
 * @Description:
 * @Author:
 * @Date: 2022-01-08 16:08:19
 * @LastEditTime: 2022-01-17 15:01:18
 * @LastEditors: Please set LastEditors
-->
<template>
    <div class="login-account">
        <el-form
            label-width="60px"
            :rules="rules"
            :model="account"
            ref="formRef"
        >
            <el-form-item label="账号" prop="name">
                <el-input v-model="account.name" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="account.password" show-password />
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
// import { getCurrentInstance } from "vue";
import { ElForm } from "element-plus";

import localCache from "@/utils/cache";

// import { useMutations } from "../hooks/useMapper";

import { useStore } from "vuex";

// import { createNamespacedHelpers } from "vuex";
// const { mapMutations } = createNamespacedHelpers("user");

const rules = {
    name: [
        {
            required: true,
            message: "用户名是必传内容~",
            trigger: "blur",
        },
        {
            pattern: /^[a-z0-9]{5,10}$/,
            message: "用户名必须是5~10个字母或者数字~",
            trigger: "blur",
        },
    ],
    password: [
        {
            required: true,
            message: "密码是必传内容~",
            trigger: "blur",
        },
        {
            pattern: /^[a-z0-9]{3,}$/,
            message: "用户名必须是3位以上的字母或者数字~",
            trigger: "blur",
        },
    ],
};

export default defineComponent({
    setup() {
        const store = useStore();
        // const storeMutations = useMutations("user", ["SET_TOKEN"]);

        // const { proxy } = getCurrentInstance() as any;

        const account = reactive({
            name: localCache.getCache("name") ?? "",
            password: localCache.getCache("password") ?? "",
        });
        let userId = 1;

        const formRef = ref<InstanceType<typeof ElForm>>();

        const loginAction = (isKeepPassword: boolean) => {
            formRef.value?.validate((valid) => {
                if (valid) {
                    // 1. 判断是否需要记住密码
                    if (isKeepPassword) {
                        // 本地缓存
                        localCache.setCache("name", account.name);
                        localCache.setCache("password", account.password);
                    } else {
                        localCache.deleteCache("name");
                        localCache.deleteCache("password");
                    }

                    //2. 开始进行登录验证
                    store.dispatch("user/accountLoginAction", { ...account });
                    // 把登录验证写在vuex user.ts的action里面 然后在里面发送请求,老师是这样做的 那我也这样做的 因为在vue组件里暂时拿不到...mapMutations
                    // proxy?.$api["login/authLogin"]({
                    //     name: account.name,
                    //     password: account.password,
                    // }).then((res: any) => {
                    //     // console.log(res);
                    //     storeMutations.SET_TOKEN = res.data.token;
                    //     userId = res.data.id;
                    //     localCache.setCache("token", storeMutations.SET_TOKEN);
                    // });

                    // // 获取用户信息
                    // proxy?.$api["login/getUserInfo"]({
                    //     id: userId,
                    // }).then((res: any) => {
                    //     console.log(res);
                    // });
                }
            });
        };

        return {
            account,
            rules,
            loginAction,
            formRef,
            userId,
            // storeMutations,
        };
    },
    computed: {
        // ...mapState(["userInfo"]),
    },
});
</script>

<style scoped lang="scss"></style>
