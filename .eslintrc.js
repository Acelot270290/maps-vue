module.exports = {
  root: true,

  parserOptions: {
    ecmaVersion: '2021', // Suporta recursos modernos do ECMAScript
  },

  env: {
    node: true,
    browser: true,
    'vue/setup-compiler-macros': true
  },

  extends: [
    'plugin:vue/vue3-essential' // Mantenha apenas as regras essenciais para o Vue 3
  ],

  plugins: [
    'vue',
  ],

  globals: {
    ga: 'readonly', // Google Analytics
    cordova: 'readonly',
    __statics: 'readonly',
    __QUASAR_SSR__: 'readonly',
    __QUASAR_SSR_SERVER__: 'readonly',
    __QUASAR_SSR_CLIENT__: 'readonly',
    __QUASAR_SSR_PWA__: 'readonly',
    process: 'readonly',
    Capacitor: 'readonly',
    chrome: 'readonly'
  },

  rules: {
    // Desativa todas as regras de estilo para permitir total liberdade
    'generator-star-spacing': 'off',
    'arrow-parens': 'off',
    'one-var': 'off',
    'no-void': 'off',
    'multiline-ternary': 'off',
    'import/first': 'off',
    'import/named': 'off',
    'import/namespace': 'off',
    'import/default': 'off',
    'import/export': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'prefer-promise-reject-errors': 'off',
    'no-debugger': 'off',
    'space-before-function-paren': 'off',
    'indent': 'off',
    'no-multiple-empty-lines': 'off',
    'quotes': 'off',
    'semi': 'off',
    'no-trailing-spaces': 'off',
    'comma-dangle': 'off',
    'no-console': 'off', // Permite o uso do console
    'no-unused-vars': 'off', // Permite variáveis não utilizadas
  }
}
