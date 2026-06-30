import nextConfig from 'eslint-config-next';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
    ...nextConfig,
    prettierConfig,
    {
        ignores: ['src/generated/**'],
    },
    {
        files: ['**/*.{ts,tsx,js,jsx}'],
        plugins: {
            prettier: prettierPlugin,
        },
        rules: {
            'prettier/prettier': 'error',
            '@next/next/no-img-element': 'off',
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': 'warn',
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            'func-names': 'off',
            'object-shorthand': 'off',
            'class-methods-use-this': 'off',
            'react/prop-types': 0,
            'react/jsx-indent': 0,
            'react/no-unused-state': 'warn',
            'react/jsx-indent-props': 0,
            'react/jsx-wrap-multilines': 0,
            'react/jsx-curly-newline': 0,
            'react/prefer-stateless-function': [0, { ignorePureComponents: false }],
            'import/prefer-default-export': 0,
            'import/no-extraneous-dependencies': 0,
            'no-nested-ternary': 'off',
            'react/jsx-props-no-spreading': 0,
            'no-param-reassign': 'off',
            'no-restricted-globals': 'warn',
            'jsx-a11y/anchor-is-valid': 0,
            'no-return-assign': 'off',
            'jsx-a11y/click-events-have-key-events': 'off',
            'jsx-a11y/no-static-element-interactions': 'off',
            'no-plusplus': 'off',
        },
    },
];
