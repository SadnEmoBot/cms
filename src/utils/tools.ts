/*
 * @Description: 工具
 * @Author:
 * @Date: 2022-01-03 16:04:33
 * @LastEditTime: 2022-01-03 16:05:51
 * @LastEditors: Please set LastEditors
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function assert(condition: unknown, msg: unknown) {
    if (!condition) throw new Error(`[Apior] ${msg}`);
}
