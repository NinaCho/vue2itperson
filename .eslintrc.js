/**
 * rules
 * https://eslint.org/docs/rules/
 * https://github.com/benmosher/eslint-plugin-import
 */
module.exports = {
  extends: [
    'standard', //使用standard做代码规范
    'prettier'
  ],
  env: {
    node: true,
    commonjs: true
  },
  globals: {
    App: true,
    getApp: true,
    Page: true,
    wx: true,
    getCurrentPages: true,
    Component: true,
    Behavior: true
  },
  plugins: ['import', 'prettier'],

  /**
   * "off"    0
   * "warn"   1
   * "error"  2
   */
  rules: {
    'prettier/prettier': 'error',

    'space-before-function-paren': [0],
    // 'prefer-const': [0],
    // 'no-useless-return': [0],
    // 'no-multi-spaces': [0],
    // 'no-else-return': [0],
    // 'no-restricted-syntax': [0],
    // 'no-bitwise': [0],
    // 'no-param-reassign': [0],
    // 'no-unused-vars': [0],
    // 'no-underscore-dangle': [0],
    // 'no-useless-escape': [0],
    // 'no-new': [0],
    // 'no-console': [0],
    // 'no-trailing-spaces': [0],
    // 'no-multi-assign': [0],
    // 'no-plusplus': [0],
    // 'arrow-body-style': [0],
    // 'generator-star-spacing': [0],
    // 'consistent-return': [0],
    // 'implicit-arrow-linebreak': [0],
    // indent: [0],
    // quotes: [0],
    // 'func-names': [0],
    // 'arrow-parens': [0],
    // 'space-before-function-paren': [0],
    // 'object-curly-newline': [0],
    // 'function-paren-newline': [0],
    // 'class-methods-use-this': [0],
    // 'linebreak-style': [0],
    // 'comma-dangle': [0],
    // 'prefer-destructuring': [0],
    // semi: [0],
    eqeqeq: [0],
    // 'space-before-blocks': ['warn'],
    // 'max-len': ['warn', 140],
    // 'no-shadow': ['error'],
    // 'no-cond-assign': ['error', 'always'],
    // 'no-nested-ternary': ['error'],
    // 'no-unused-expressions': [
    //   'error',
    //   {
    //     allowShortCircuit: true,
    //     allowTernary: true
    //   }
    // ],
    'no-use-before-define': [
      'error',
      {
        classes: true,
        functions: false,
        variables: true
      }
    ]
    // 'operator-linebreak': [
    //   'error',
    //   'after',
    //   { overrides: { '?': 'before', ':': 'before' } }
    // ],
    // curly: ['error'],
    // 'require-yield': ['error'],
    // 'import/no-extraneous-dependencies': [0]
  }
}
