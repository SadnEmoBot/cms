/*
 * @Description:
 * @Author:
 * @Date: 2022-01-15 18:35:02
 * @LastEditTime: 2022-01-16 13:02:16
 * @LastEditors: Please set LastEditors
 */
import { App } from "vue";
import { formatUtcTime } from "@/utils/tools";
import PageContent from "@/components/business/page-content/index";
// import { ElMessage } from "element-plus"; //引入message组件

function registerProperties(app: App) {
    app.config.globalProperties.$filters = {
        formatTime(value: string) {
            return formatUtcTime(value);
        },
    };
}

export default function globalRegister(app: App): void {
    app.use(registerProperties);
    // app.use(ElMessage);
    // app.config.globalProperties.$message = ElMessage; //挂载到app实例上
    app.component("page-content", PageContent); //注册全局组件
}
