/*
 * @Description:
 * @Author:
 * @Date: 2022-01-09 00:44:41
 * @LastEditTime: 2022-01-09 14:58:03
 * @LastEditors: Please set LastEditors
 */
import { computed } from "vue";
import { mapGetters, mapState, useStore, createNamespacedHelpers } from "vuex";

const useMapper = (mapper: any, mapFn: any, isFn = false) => {
    const store = useStore();

    const storeStateFns = mapFn(mapper);
    const storeState = {} as any;
    Object.keys(storeStateFns).forEach((keyFn) => {
        const fn = storeStateFns[keyFn].bind({ $store: store });
        storeState[keyFn] = isFn ? fn : computed(fn);
    });

    return storeState;
};

export const useState = (moduleName: any, mapper: any) => {
    let mapperFn = mapState;
    if (typeof moduleName === "string" && moduleName.length > 0) {
        mapperFn = createNamespacedHelpers(moduleName).mapState;
    } else {
        mapper = moduleName;
    }
    return useMapper(mapper, mapperFn);
};

export const useGetters = (moduleName: any, mapper: any) => {
    let mapperFn = mapGetters;
    if (typeof moduleName === "string" && moduleName.length > 0) {
        mapperFn = createNamespacedHelpers(moduleName).mapGetters;
    } else {
        mapper = moduleName;
    }
    return useMapper(mapper, mapperFn);
};

export const useMutations = (moduleName: any, mapper: any) => {
    let mapperFn = useMutations;
    if (typeof moduleName === "string" && moduleName.length > 0) {
        mapperFn = createNamespacedHelpers(moduleName).mapMutations;
        // console.log(mapperFn);
    } else {
        mapper = moduleName;
    }
    return useMapper(mapper, mapperFn, true);
};
