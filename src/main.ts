/*
 * @Description:
 * @Author:
 * @Date: 2022-01-02 13:17:32
 * @LastEditTime: 2022-04-10 17:03:15
 * @LastEditors: Please set LastEditors
 */
import { createApp } from "vue";
import App from "./App.vue";
// import router from "./router";
import router from "./plugins/router";

// import store from "./store";
import store from "./plugins/store";

// import { ElMessage } from "element-plus"; //引入message组件
import "element-plus/dist/index.css"; //引入全局样式
// import 'element-plus/lib/theme-chalk/index.css' //一样的吧？ 毕竟代码都一样

import "./assets/style/index.scss";
import "./assets/font/iconfont.css";

import * as ElIcons from "@element-plus/icons-vue"; // 是否需要按需导入？https://blog.csdn.net/kzj0916/article/details/121880468

//引入插件
// import inject from "./plugins/inject";
import api from "./plugins/api";

import globalRegister from "./global/index";

// import PageContent from "@/components/business/page-content/index";

import SocketService from "@/utils/socket-service";
SocketService.Instance.connect();

store.dispatch("user/loadLocalData");

// createApp(App).use(store).use(router).use(inject).mount("#app");
const app = createApp(App);

app.config.globalProperties.$api = api;
app.config.globalProperties.$socket = SocketService.Instance;

// app.use(ElMessage);
// app.config.globalProperties.$message = ElMessage; //挂载到app实例上

app.use(globalRegister);

for (const name in ElIcons) {
    app.component(name, (ElIcons as any)[name]);
}

// app.component("page-content", PageContent); //注册全局组件

app.use(store).use(router).mount("#app");
