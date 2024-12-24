// src/api/api.ts
// -----------------------------------------------------------------------------
// Назначение этого файла:
// Данный модуль предоставляет заранее сконфигурированный экземпляр axios для
// работы с API в проекте на React с использованием TypeScript.
//
// Основные возможности:
// 1. Базовая конфигурация axios, включая базовый URL, таймаут, стандартные заголовки.
// 2. Автоматическое добавление токена авторизации (Authorization) при его наличии.
// 3. Интерсепторы для обработки ошибок и логирования запросов/ответов.
// 4. Возможность динамической конфигурации версии API (например, v1, v2).
// 5. Строгая типизация входящих и исходящих данных с использованием готовых типов axios.
//
// Дополнительные возможности и рекомендации по расширению:
// - Можно добавить функцию для динамического изменения базового URL и/или версии API.
// - Можно добавить глобальную обработку специфичных ошибок (например, 401 - релогин).
// - Можно добавить кастомные заголовки или параметры запросов для специфичных модулей.
// - Можно использовать разные экземпляры axios для разных доменов или разных версий API.
// -----------------------------------------------------------------------------

import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';

/**
 * Тип версии API. Можно расширить или изменить в зависимости от поддерживаемых версий.
 * Например, добавить 'v3', 'beta' или 'internal'.
 */
export type ApiVersion = 'v1' | 'v2';

/**
 * Интерфейс опций для создания экземпляра API.
 * Можно расширить, добавив, например, необязательный параметр `params` или `headers`.
 */
interface CreateApiOptions {
  baseURL: string; // Базовый URL для API (например, 'https://api.example.com')
  version?: ApiVersion; // Версия API, по умолчанию v1
  timeout?: number; // Таймаут запросов в мс
  token?: string; // Токен авторизации, если есть
  logRequests?: boolean; // Логировать ли запросы/ответы в режиме разработки
}

/**
 * Основная функция для создания сконфигурированного экземпляра axios.
 * Можно использовать несколько раз для разных API или разных конфигураций.
 */
export function createApiInstance(options: CreateApiOptions): AxiosInstance {
  const {
    baseURL,
    version,
    timeout = 10000, // 10 секунд по умолчанию
    token,
    logRequests = process.env.NODE_ENV === 'development', // В dev-режиме логируем по умолчанию
  } = options;

  // Формируем полный базовый URL с учётом версии API.
  const apiBaseURL = version ? `${baseURL}/${version}` : baseURL;

  // Создаём экземпляр axios с базовой конфигурацией.
  const instance = axios.create({
    baseURL: apiBaseURL,
    timeout,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Если у нас есть токен, добавим его в заголовки авторизации.
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  // ---------------------------------------------------------------------------
  // Интерсептор запросов:
  // 1. Можно автоматически добавлять или обновлять токен,
  //    если он хранится, например, в localStorage или в контексте приложения.
  // 2. Можно добавлять кастомные заголовки или параметры.
  // ---------------------------------------------------------------------------
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Пример: динамическое добавление токена перед каждым запросом
      const dynamicToken = getAuthToken();
      if (dynamicToken) {
        // Заголовки в axios v1 уже строго типизированы, поэтому мы просто устанавливаем нужное поле:
        config.headers.Authorization = `Bearer ${dynamicToken}`;
      }

      // Логирование запроса в режиме разработки (если включено)
      if (logRequests) {
        console.log(
          `[API Request] ${config.method?.toUpperCase()} ${config.url}`,
          {
            params: config.params,
            data: config.data,
            headers: config.headers,
          }
        );
      }

      return config;
    },
    (error: AxiosError) => {
      // Здесь можно обработать ошибки, возникшие до отправки запроса
      return Promise.reject(error);
    }
  );

  // ---------------------------------------------------------------------------
  // Интерсептор ответов:
  // 1. Логирование ответов в режиме разработки.
  // 2. Обработка ошибок, уведомление пользователя, перезапуск аутентификации и т.д.
  // ---------------------------------------------------------------------------
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      // Логирование успешного ответа, если включено
      if (logRequests) {
        console.log('[API Response]', response.config.url, {
          status: response.status,
          data: response.data,
        });
      }

      return response;
    },
    (error: AxiosError) => {
      // Обработка ошибок ответа
      if (error.response) {
        const { status, data } = error.response;
        // Пример простой обработки:
        // if (status === 401) {
        //   // Логика разлогина или рефреша токена
        // }

        if (logRequests) {
          console.error(`[API Error] ${status}`, data);
        }
      } else {
        // Если ошибка вообще не связана с ответом (например, проблема сети)
        if (logRequests) {
          console.error('[API Error] Network or CORS issue:', error.message);
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
}

/**
 * Пример функции для получения актуального токена.
 * На практике это может быть обращение к Redux-store, Context API,
 * localStorage, cookie или любому другому источнику.
 * Здесь для примера стоит заглушка, всегда возвращающая undefined.
 */
function getAuthToken(): string | undefined {
  // TODO: Реализуйте логику получения токена по необходимости
  return undefined;
}

// -----------------------------------------------------------------------------
// Пример использования:
//
// import { createApiInstance } from './api';
//
// const api = createApiInstance({
//   baseURL: 'https://api.example.com',
//   version: 'v2',
//   timeout: 5000,
//   token: 'initial_token_here',
//   logRequests: true
// });
//
// Теперь `api` можно использовать в любом месте приложения для отправки запросов:
// api.get<YourResponseType>('/endpoint').then(response => {
//   console.log(response.data);
// });
//
// При необходимости можно создать другой экземпляр для другой части API или
// для другого домена, просто вызвав createApiInstance с другими параметрами.
// -----------------------------------------------------------------------------
