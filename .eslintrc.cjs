module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "plugin:@typescript-eslint/recommended",
    "plugin:cypress/recommended",
    "plugin:vue/vue3-recommended",
    "plugin:prettier-vue/recommended",
    "prettier",
    "@vue/typescript",
  ],
  parserOptions: {
    ecmaVersion: 2018,
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["prettier", "vue", "@typescript-eslint"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  rules: {
    "no-irregular-whitespace": 0,
    "vue/no-deprecated-v-on-native-modifier": 0,
    "eol-last": "error",
    "vue/require-default-prop": 0,
    "vue/no-v-html": 0,
    "vue/v-on-event-hyphenation": 0,
    "vue/multi-word-component-names": 0,
    "vue/attribute-hyphenation": 0,

    "max-classes-per-file": "off",
    "no-useless-constructor": "off",
    "no-empty-function": "off",
    "@typescript-eslint/no-useless-constructor": "error",
    "import/prefer-default-export": "off",
    "no-use-before-define": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-this-alias": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-empty-function": "off",
  },
  ignorePatterns: [
    "contribuer",
    "dist",
    "dist-server",
    "IndividuForm.vue",
    "*.min.js",
    "node_modules",
    "test/integration",
    ".tmp",
    "tmp",
  ],

  overrides: [
    {
      files: ["**/__tests__/*.{j,t}s?(x)"],
      env: {
        jest: true,
      },
    },
  ],
}
