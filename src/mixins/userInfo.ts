/*
 * @Description: 获取用户信息和菜单的信息
 * @Author:
 * @Date: 2022-01-09 15:01:33
 * @LastEditTime: 2022-01-09 15:08:14
 * @LastEditors: Please set LastEditors
 */
import { defineComponent, getCurrentInstance } from "vue";

export default defineComponent({
    setup() {
        const { proxy } = getCurrentInstance() as any;
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
        const logIn = () => {
            return proxy?.$api["login/authLogin"]();
        };
        return {
            logIn,
        };
    },
});
