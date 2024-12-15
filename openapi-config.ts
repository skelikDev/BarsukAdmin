import type { ConfigFile } from '@rtk-query/codegen-openapi';

const config: ConfigFile = {
  schemaFile: 'http://195.49.213.49:8080/api/openapijson',

  apiFile: './src/api/baseApi.ts',

  apiImport: 'baseApi',

  outputFile: './src/api/generated.ts',

  exportName: 'generatedApi',

  hooks: true,
  tag: true, // Если хотите генерировать теги
};

export default config;
