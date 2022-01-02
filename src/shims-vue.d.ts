/*
 * @Description:
 * @Author:
 * @Date: 2022-01-02 13:17:32
 * @LastEditTime: 2022-01-02 22:45:44
 * @LastEditors:
 */
/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// declare let $store: any
