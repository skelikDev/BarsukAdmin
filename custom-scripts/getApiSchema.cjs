const http = require('http');
const fs = require('fs');
const path = require('path');

const URL = 'http://195.49.213.49:8080/api/openapiyml';
const OUTPUT_DIR = path.join(__dirname, '../src/api');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'api-schema.yaml');

// Создаем папку, если она не существует
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function downloadOpenAPISchema() {
  const file = fs.createWriteStream(OUTPUT_FILE);

  http.get(URL, (response) => {
    if (response.statusCode !== 200) {
      console.error(`Failed to fetch the OpenAPI schema. Status code: ${response.statusCode}`);
      response.resume(); // Consume response data to free up memory
      return;
    }

    response.pipe(file);

    file.on('finish', () => {
      file.close();
      console.log(`OpenAPI schema saved to ${OUTPUT_FILE}`);
    });
  }).on('error', (err) => {
    if (fs.existsSync(OUTPUT_FILE)) {
      fs.unlinkSync(OUTPUT_FILE); // Delete the file in case of error
    }
    console.error(`Error fetching OpenAPI schema: ${err.message}`);
  });
}

downloadOpenAPISchema();
