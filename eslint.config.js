// eslint.config.js
import js from '@eslint/js';
import react from 'eslint-plugin-react';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
      react: react,
    },
    rules: {
      'simple-import-sort/exports': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off', // Disables checking for explicit return types
      '@typescript-eslint/no-restricted-types': 'warn', // Warning for banning certain types
      '@typescript-eslint/ban-ts-comment': 'off', // Disables @ts-ignore comments
      '@typescript-eslint/no-explicit-any': 'warn', // Warning for calling functions with an argument of type any
      '@typescript-eslint/no-unused-vars': 'off', // Disables declarations of unused variables in TS files
      'react/no-array-index-key': 'error', // Error for array index keys in JSX
      'react/function-component-definition': [
        'error',
        {namedComponents: 'arrow-function', unnamedComponents: 'arrow-function'},
      ],
      'react/react-in-jsx-scope': 'off', // Disables the requirement to import React in JSX files
      'react/jsx-props-no-spreading': 'warn', // Warning for spreading props to components
      'unused-imports/no-unused-imports': 'error', // Error for unused imports
      'simple-import-sort/imports': ['warn', {groups: [['^react'], ['^@?\\w'], ['@/(.*)'], ['^[./]']]}], // Warning for import sorting
    },
    settings: {
      react: {
        version: 'detect', // Automatically detects the React version
      },
    },
  },
];
