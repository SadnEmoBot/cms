/*
 * @Description:
 * @Author:
 * @Date: 2022-01-02 13:17:32
 * @LastEditTime: 2022-01-08 16:48:55
 * @LastEditors: Please set LastEditors
 */
import { createApp } from "vue";
import App from "./App.vue";
// import router from "./router";
import router from "./plugins/router";

import store from "./store";

import { ElMessage } from "element-plus"; //引入message组件
import "element-plus/dist/index.css"; //引入全局样式
// import 'element-plus/lib/theme-chalk/index.css' //一样的吧？ 毕竟代码都一样

import "./assets/style/index.scss";

//引入插件
// import inject from "./plugins/inject";
import api from "./plugins/api";

// createApp(App).use(store).use(router).use(inject).mount("#app");
const app = createApp(App);

app.config.globalProperties.$api = api;

app.use(ElMessage);
app.config.globalProperties.$message = ElMessage; //挂载到app实例上

app.use(store).use(router).mount("#app");
