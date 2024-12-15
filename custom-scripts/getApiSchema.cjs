const http = require('http');
const fs = require('fs');
const path = require('path');

const URLS = {
  yaml: 'http://195.49.213.49:8080/api/openapiyml',
  json: 'http://195.49.213.49:8080/api/openapijson',
};

const OUTPUT_DIR = path.join(__dirname, '../src/api/schemas');
const OUTPUT_FILES = {
  yaml: path.join(OUTPUT_DIR, 'api-schema.yaml'),
  json: path.join(OUTPUT_DIR, 'api-schema.json'),
};

// Создаем папку, если она не существует
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function downloadFile(url, outputFile) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outputFile);

    http
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          console.error(
            `Failed to fetch the file from ${url}. Status code: ${response.statusCode}`
          );
          response.resume(); // Consume response data to free up memory
          reject(new Error(`HTTP Status Code: ${response.statusCode}`));
          return;
        }

        response.pipe(file);

        file.on('finish', () => {
          file.close(() => {
            console.log(`File saved to ${outputFile}`);
            resolve();
          });
        });
      })
      .on('error', (err) => {
        if (fs.existsSync(outputFile)) {
          fs.unlinkSync(outputFile); // Delete the file in case of error
        }
        console.error(`Error fetching file from ${url}: ${err.message}`);
        reject(err);
      });
  });
}

async function downloadOpenAPISchemas() {
  try {
    await Promise.all([
      downloadFile(URLS.yaml, OUTPUT_FILES.yaml),
      downloadFile(URLS.json, OUTPUT_FILES.json),
    ]);
    console.log('Both OpenAPI schemas downloaded successfully.');
  } catch (err) {
    console.error('Error downloading OpenAPI schemas:', err);
  }
}

downloadOpenAPISchemas();
