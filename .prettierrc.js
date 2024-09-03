const config = {
  arrowParens: 'always',
  bracketSpacing: true,
  htmlWhitespaceSensitivity: 'css',
  insertPragma: false,
  singleAttributePerLine: false,
  bracketSameLine: false,
  jsxBracketSameLine: false,
  printWidth: 120,
  plugins: [require.resolve('@trivago/prettier-plugin-sort-imports'), 'prettier-plugin-tailwindcss'],
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  requirePragma: false,
  semi: true,
  singleQuote: true,
  jsxSingleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  importOrder: ['^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

module.exports = config;
