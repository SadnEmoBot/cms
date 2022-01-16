/*
 * @Description: 工具
 * @Author:
 * @Date: 2022-01-03 16:04:33
 * @LastEditTime: 2022-01-16 23:07:51
 * @LastEditors: Please set LastEditors
 */

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
// import u from "dayjs/plugin/unix";

dayjs.extend(utc);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function assert(condition: unknown, msg: unknown) {
    if (!condition) throw new Error(`[Apior] ${msg}`);
}

const DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";

export function formatUtcTime(
    utcTime: string,
    format: string = DATE_TIME_FORMAT
) {
    return dayjs.utc(utcTime).utcOffset(8).format(format);
}

export function formatTimestamp(
    timestamp: number,
    format: string = DATE_TIME_FORMAT
) {
    return dayjs.unix(timestamp).format(format);
}
