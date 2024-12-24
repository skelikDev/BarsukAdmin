const { generateEndpoints } = require('@rtk-query/codegen-openapi');
const api = generateEndpoints({
  schemaFile: 'http://195.49.213.49:8080/api/openapijson',
  apiFile: './src/api/baseApi.ts',
  apiImport: 'baseApi',
  outputFile: './src/api/generated.ts',
  exportName: 'generatedApi',
  hooks: true,
  tag: true,
});
