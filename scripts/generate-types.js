import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Базовый URL бэкенда
// const baseURL = "https://barsuk-service.onrender.com/";
// const swaggerUrl = baseURL + "api";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateTypes() {
  try {
    // Путь к файлу спецификации OpenAPI (Swagger)
    const swaggerSpecPath = path.resolve(__dirname, "./swagger.json");

    // Путь к выходному файлу, где будут сохранены типы
    const outputPath = path.resolve(__dirname, "../src/api/types.ts");

    // Проверяем, существует ли файл спецификации
    if (!fs.existsSync(swaggerSpecPath)) {
      console.error(`Файл спецификации не найден: ${swaggerSpecPath}`);
      process.exit(1);
    }

    // Команда для генерации типов с использованием openapi-typescript
    const command = `npx openapi-typescript ${swaggerSpecPath} --output ${outputPath}`;

    // Запуск команды для генерации типов
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Ошибка при генерации типов: ${error.message}`);
        process.exit(1);
      }
      if (stderr) {
        console.error(`Предупреждение: ${stderr}`);
      }
      console.log(`Типы успешно сгенерированы в: ${outputPath}`);
    });
  } catch (error) {
    console.error("Неожиданная ошибка:", error);
    process.exit(1);
  }
}

// Запускаем скрипт
generateTypes();
