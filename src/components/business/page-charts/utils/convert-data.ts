/*
 * @Description:
 * @Author:
 * @Date: 2022-01-18 00:45:39
 * @LastEditTime: 2022-01-18 01:01:15
 * @LastEditors:
 */
import { coordinateData } from "./coordinate-data";

export function convertData(data: any) {
    const res = [];
    for (let i = 0; i < data.length; i++) {
        const geoCoord = coordinateData[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value),
            });
        }
    }
    return res;
}
