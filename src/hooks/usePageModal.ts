/*
 * @Description:
 * @Author:
 * @Date: 2022-01-16 19:25:47
 * @LastEditTime: 2022-01-16 19:49:18
 * @LastEditors: Please set LastEditors
 */
import { ref } from "vue";
import PageModal from "@/components/business/page-modal/index";

type CallbackFn = () => void;

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

        editCb && editCb();
    };

    return [pageModalRef, defaultInfo, handleNewData, handleEditData];
}
