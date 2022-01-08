/*
 * @Description: 本地缓存
 * @Author:
 * @Date: 2022-01-08 17:29:14
 * @LastEditTime: 2022-01-08 17:59:07
 * @LastEditors: Please set LastEditors
 */
class LocalCache {
    setCache(key: string, value: any) {
        window.localStorage.setItem(key, JSON.stringify(value));
    }
    getCache(key: string) {
        // obj => string => obj
        const value = window.localStorage.getItem(key);
        if (value) {
            return JSON.parse(value);
        }
    }
    deleteCache(key: string) {
        window.localStorage.removeItem(key);
    }
    clearCache() {
        window.localStorage.clear();
    }
}

export default new LocalCache();
