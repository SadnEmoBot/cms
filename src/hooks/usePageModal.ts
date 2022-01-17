/*
 * @Description:
 * @Author:
 * @Date: 2022-01-16 19:25:47
 * @LastEditTime: 2022-01-17 12:56:38
 * @LastEditors: Please set LastEditors
 */
import { ref } from "vue";
import PageModal from "@/components/business/page-modal/index";

type CallbackFn = (item?: any) => void;

export function usePageModal(newCb?: CallbackFn, editCb?: CallbackFn) {
    const pageModalRef = ref<InstanceType<typeof PageModal>>();
    const defaultInfo = ref({});
    const handleNewData = () => {
        defaultInfo.value = {};
        if (pageModalRef.value) {
            pageModalRef.value.dialogVisible = true;
        }

        newCb && newCb();
    };
    const handleEditData = (item: any) => {
        defaultInfo.value = { ...item };
        if (pageModalRef.value) {
            pageModalRef.value.dialogVisible = true;
        }

        editCb && editCb(item);
    };

    return [pageModalRef, defaultInfo, handleNewData, handleEditData];
}
