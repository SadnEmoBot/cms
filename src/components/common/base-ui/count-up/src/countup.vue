<!--
 * @Description:
 * @Author:
 * @Date: 2022-01-18 01:02:04
 * @LastEditTime: 2022-01-18 01:09:44
 * @LastEditors: Please set LastEditors
-->
<template>
    <span ref="counterRef" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
// https://github.com/inorganik/CountUp.js#usage
import { CountUp } from "countup.js";
import type { CountUpOptions } from "countup.js";
const defaultOptions: CountUpOptions = {
    decimalPlaces: 2, // 保留两位
    duration: 2, // 动画时长
    separator: ",", // 千位分割
    decimal: ".", // 小数分割
    prefix: "￥", // 单位
};
export default defineComponent({
    components: {},
    props: {
        number: {
            type: Number,
            default: 0,
        },
        option: {
            type: Object,
            default: () => {
                return {};
            },
        },
    },
    setup(props) {
        const counterRef = ref<HTMLDivElement | null>(null);
        const instance = ref<CountUp | null>(null);

        watch(
            () => props.number,
            () => {
                update(props.number);
            }
        );
        onMounted(() => {
            createCounter();
        });

        const createCounter = () => {
            if (!counterRef.value) return;
            const opts: CountUpOptions = Object.assign(
                defaultOptions,
                props.option
            );
            instance.value = new CountUp(counterRef?.value, props.number, opts);
            start();
        };

        const start = () => {
            if (!instance.value) return;
            instance?.value.start();
        };
        const update = (number: number) => {
            if (!instance.value) return;
            instance?.value.update(number);
        };
        return {
            counterRef,
        };
    },
});
</script>

<style scoped lang="scss"></style>
