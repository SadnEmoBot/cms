/*
 * @Description:
 * @Author:
 * @Date: 2022-01-02 13:17:32
 * @LastEditTime: 2022-01-05 17:44:16
 * @LastEditors: Please set LastEditors
 */
module.exports = {
  root: true,
  env: {
    // 'browser': true,
    // 'es2021': true,
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
    // 'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020,
    // 'parser': 'babel-eslint',
    // 'sourceType': 'module'
  },
//   'plugins': [
//     'vue'
//     ],
   'globals': {
    'URL_PREFIX': true
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off"
  },
};
