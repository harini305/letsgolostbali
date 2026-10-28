import nextVitals from 'eslint-config-next/core-web-vitals';

const eslintConfig = [
  ...nextVitals,
  { ignores: ['.next/**', 'node_modules/**', 'docs/**', 'public/**'] },
];

export default eslintConfig;
