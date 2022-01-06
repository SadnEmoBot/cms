/*
 * @Description: 导入文件夹下所有文件
 * @Author:
 * @Date: 2022-01-03 16:09:19
 * @LastEditTime: 2022-01-03 23:02:04
 * @LastEditors: Please set LastEditors
 */
const fileNameRE = /^\.\/([^\s]+)\.ts$/;
export function importAll(modulesContext: __WebpackModuleApi.RequireContext) {
    return modulesContext.keys().map((modulesPath) => {
        const moduleName = modulesPath.match(fileNameRE) as Array<any>;
        return {
            moduleName,
            camelModuleName: moduleName[1].replace(/-(\w)/g, (_: any, c: any) =>
                c ? c.toUpperCase() : ""
            ),
            module: modulesContext(modulesPath).default,
        };
    });
}
