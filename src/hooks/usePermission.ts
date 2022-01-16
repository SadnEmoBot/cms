/*
 * @Description:
 * @Author:
 * @Date: 2022-01-16 16:48:06
 * @LastEditTime: 2022-01-16 16:50:11
 * @LastEditors: Please set LastEditors
 */
import { useStore } from "@/service/store/type";

export function usePermission(pageName: string, handleName: string) {
    const store = useStore();
    const permissions = store.state.user.permissions;
    const verifyPermission = `system:${pageName}:${handleName}`;

    // name = "august"
    // !name -> false
    // !!name -> true
    return !!permissions.find((item) => item === verifyPermission);
}
