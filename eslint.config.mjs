import pluginVue from 'eslint-plugin-vue';
import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';

export default tsEslint.config(
  {
    ignores: ['.firebase', '.yarn', 'dist', 'node_modules'],
  },
  eslint.configs.recommended,
  ...tsEslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  stylistic.configs.customize({
    arrowParens: true,
    braceStyle: '1tbs',
    semi: true,
  }),
  {
    files: ['*.vue', '**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-import-type-side-effects': 'error',
      'vue/max-attributes-per-line': ['warn', {
        singleline: {
          max: 3,
        },
      }],
    },
  },
);
