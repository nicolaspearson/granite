module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:eslint-comments/recommended', 'prettier'],
  rules: {
    /**
     * Global rules
     */
    'eslint-comments/disable-enable-pair': 'off',
    'max-len': [
      'error',
      {
        code: 100,
        ignoreComments: true,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        tabWidth: 2,
      },
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-self-assign': 'off',
    'no-void': ['error', { allowAsStatement: true }],
    'object-curly-spacing': [2, 'always'],
    // See configuration in https://www.npmjs.com/package/eslint-plugin-ordered-imports#configuration
    'ordered-imports/ordered-imports': [
      'error',
      {
        'group-ordering': [
          {
            name: 'framework libraries',
            match: '^(@nestjs/|nest-|nestjs-).*',
            order: 20,
          },
          {
            name: 'other monorepo libraries',
            match: '^(lib|svc|ui|util)-.*/src',
            order: 20,
          },
          {
            name: 'server source code',
            match: '^[$]\\/.*$',
            order: 30,
          },
          {
            name: 'test source code',
            match: '^#\\/.*$',
            order: 40,
          },
          {
            name: 'relative imports',
            match: '^\\.*/.*$',
            order: 50,
          },
          { name: 'third party', match: '.*', order: 10 },
        ],
      },
    ],
    semi: ['error', 'always'],
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/prefer-array-some': 'off',
    'unicorn/prefer-spread': 'off',
    'unicorn/new-for-builtins': 'off',
    'unicorn/filename-case': 'off',
    'unicorn/no-useless-undefined': 'off',
    'unicorn/no-null': 'off',
    'unicorn/numeric-separators-style': 'off',
    'unicorn/prefer-node-protocol': 'off',
    'unicorn/no-array-callback-reference': 'off',
  },
  overrides: [
    {
      /**
       * JavaScript rules
       */
      files: ['**/*.js'],
      extends: ['eslint:recommended', 'plugin:node/recommended'],
    },
    {
      /**
       * TypeScript rules
       */
      files: ['**/*.ts'],
      extends: [
        'plugin:import/typescript',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
          modules: true,
        },
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
      plugins: ['@typescript-eslint', 'ordered-imports'],
      rules: {
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'default',
            format: ['camelCase'],
          },
          {
            selector: 'enumMember',
            format: ['PascalCase'],
          },
          {
            selector: 'parameter',
            format: ['camelCase'],
            leadingUnderscore: 'allow',
          },
          {
            selector: 'typeLike',
            format: ['PascalCase'],
          },
          {
            selector: 'variable',
            format: ['camelCase', 'UPPER_CASE'],
          },
        ],
        '@typescript-eslint/restrict-template-expressions': ['error', { allowAny: true }],
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_+$' }],
      },
    },
    {
      /**
       * Jest rules
       */
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/test/**/*.{j,t}s?(x)',
        '**/*.test.tsx',
        '**/{unit,integration}/setup.ts',
      ],
      plugins: ['jest'],
      extends: ['plugin:jest/recommended'],
      env: {
        jest: true,
      },
      rules: {
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        'jest/expect-expect': [
          'error',
          {
            assertFunctionNames: ['expect', 'request.*.expect'],
          },
        ],
      },
    },
    {
      /**
       * JavaScript configuration file rules
       */
      files: ['**/*.config.{j,t}s?(x)', '**/.eslintrc.js'],
      rules: {
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        'node/no-extraneous-require': 'off',
        'node/no-unpublished-require': 'off',
        'prefer-const': 'off',
      },
    },
  ],
};
