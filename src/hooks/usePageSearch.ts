/*
 * @Description: 交互逻辑的hook(重置，搜素)
 * @Author:
 * @Date: 2022-01-16 12:01:54
 * @LastEditTime: 2022-01-16 12:09:03
 * @LastEditors: Please set LastEditors
 */
import { ref } from "vue";
import PageContent from "@/components/business/page-content/index";

export function usePageSearch() {
    const handleResetClick = () => {
        pageContentRef.value?.getPageData();
    };
    const handleQueryClick = (queryInfo: any) => {
        pageContentRef.value?.getPageData(queryInfo);
    };
    const pageContentRef = ref<InstanceType<typeof PageContent>>();

    return [handleResetClick, handleQueryClick, pageContentRef];
}
