<!--
 * @Description: 封装main搜索栏块区域
 * @Author:
 * @Date: 2022-01-13 20:25:45
 * @LastEditTime: 2022-01-14 01:20:36
 * @LastEditors: Please set LastEditors
-->
<template>
    <div class="form">
        <div class="header">
            <slot name="header"></slot>
        </div>
        <el-form :label-width="labelWidth">
            <el-row>
                <template v-for="item in formItems" :key="item.label">
                    <el-col v-bind="colWidth">
                        <el-form-item :label="item.label" :style="itemStyle">
                            <!-- 输入框 -->
                            <template
                                v-if="
                                    item.type === 'input' ||
                                    item.type === 'password'
                                "
                            >
                                <el-input
                                    v-bind="item.otherOptions"
                                    :placeholder="item.placeholder"
                                    :show-password="item.type === 'password'"
                                    v-model="formData[`${item.field}`]"
                                ></el-input>
                            </template>
                            <!-- 下拉菜单 -->
                            <template v-else-if="item.type === 'select'">
                                <el-select
                                    :placeholder="item.placeholder"
                                    v-bind="item.otherOptions"
                                    v-model="formData[`${item.field}`]"
                                >
                                    <el-option
                                        v-for="option in item.options"
                                        :key="option.value"
                                        :value="option.value"
                                        >{{ option.title }}</el-option
                                    >
                                </el-select>
                            </template>
                            <!-- 时间范围选择 -->
                            <template v-else-if="item.type === 'datepicker'">
                                <el-date-picker
                                    style="width: 100%"
                                    v-bind="item.otherOptions"
                                    v-model="formData[`${item.field}`]"
                                ></el-date-picker>
                            </template>
                        </el-form-item>
                    </el-col>
                </template>
            </el-row>
        </el-form>
        <div class="footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";
import { IFormItem } from "../type/type";

export default defineComponent({
    props: {
        modelValue: {
            type: Object,
            required: true,
        },
        formItems: {
            type: Array as PropType<IFormItem[]>, // 数组对象可以使用propType
            default: () => [],
        },
        labelWidth: {
            type: String,
            default: "100px",
        },
        colWidth: {
            type: Object,
            default: () => ({
                xl: 6, // 24 / 6 = 一排4个  >1920px 4个
                lg: 8,
                md: 12,
                sm: 24,
                xs: 24,
            }),
        },
        itemStyle: {
            type: Object,
            default: () => ({ padding: "10px 40px" }),
        },
    },
    emits: ["update:modelValue"],
    setup(props, { emit }) {
        const formData = ref({ ...props.modelValue });
        watch(
            formData,
            (newValue: any) => {
                console.log(newValue);
                emit("update:modelValue", newValue);
            },
            {
                deep: true,
            }
        );
        return {
            formData,
        };
    },
});
</script>

<style scoped lang="scss">
.form {
    padding-top: 22px;
}
</style>
