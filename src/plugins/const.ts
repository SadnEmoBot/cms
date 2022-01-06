/*
 * @Description:
 * @Author:
 * @Date: 2022-01-03 16:17:00
 * @LastEditTime: 2022-01-03 18:59:58
 * @LastEditors: Please set LastEditors
 */
import { CONST_DEFAULT_CONFIG } from "../config";
import CONST_CONFIG from "../service/const";

class MakeConst {
    const: any;
    constructor(options: any) {
        this.const = {};
        this.constBuilder(options);
    }

    constBuilder({ sep = "/", config = [] }) {
        Object.keys(config).map((namespace) => {
            this._constSingleBuilder({
                namespace,
                sep,
                config: config[namespace as unknown as number],
            });
        });
    }

    _constSingleBuilder({ namespace = "", sep = "/", config = {} as any }) {
        config.forEach((cst: any) => {
            const { name, value } = cst;
            const constName = `${namespace.toUpperCase()}${sep}${name}`;
            Object.defineProperty(this.const, constName, { value });
        });
    }
}

export default new MakeConst({
    config: CONST_CONFIG,
    ...CONST_DEFAULT_CONFIG,
})["const"];
