/* eslint-disable */
/* tslint:disable */

/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CreateUserDto {
  /**
   * Номер телефона пользователя
   * @example "+123456789"
   */
  phone: string;
  /**
   * Имя пользователя
   * @example "Иван Иванов"
   */
  name: string;
}

export type User = object;

export interface UpdateUserPointsDto {
  /**
   * Количество баллов пользователя
   * @example 100
   */
  points: number;
}

export interface ProductDto {
  /**
   * Уникальный идентификатор продукта
   * @example 1
   */
  id: number;
  /**
   * Название продукта
   * @example "Продукт A"
   */
  name: string;
  /**
   * Описание продукта
   * @example "Описание продукта A"
   */
  description: string;
  /**
   * Цена продукта
   * @example 100
   */
  price: number;
  /**
   * Категории продукта
   * @example ["Категория1","Категория2"]
   */
  category: string[] | null;
  /**
   * Ссылки на изображения продукта
   * @example ["url1.jpg","url2.jpg"]
   */
  images: string[];
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = import.meta.env.VITE_BACKEND_URL;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Product API
 * @version 1.0
 * @contact
 *
 * API для управления продуктами
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags App
   * @name AppControllerGetHello
   * @request GET:/
   */
  appControllerGetHello = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/`,
      method: "GET",
      ...params,
    });

  users = {
    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerCreateUser
     * @summary Создать нового пользователя
     * @request POST:/users
     */
    usersControllerCreateUser: (
      data: CreateUserDto,
      params: RequestParams = {},
    ) =>
      this.request<User, any>({
        path: `/users`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerGetAllUsers
     * @summary Получить список пользователей с фильтрацией и пагинацией
     * @request GET:/users
     */
    usersControllerGetAllUsers: (
      query?: {
        /** Фильтр по имени пользователя */
        name?: string;
        /** Фильтр по номеру телефона */
        phone?: string;
        /**
         * Номер страницы для пагинации
         * @example 1
         */
        page?: number;
        /**
         * Размер страницы для пагинации
         * @example 10
         */
        size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/users`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerGetUserById
     * @summary Получить пользователя по ID
     * @request GET:/users/{id}
     */
    usersControllerGetUserById: (id: number, params: RequestParams = {}) =>
      this.request<User, void>({
        path: `/users/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerDeleteUserByPhoneNumber
     * @summary Удалить пользователя по номеру телефона
     * @request DELETE:/users/{phoneNumber}
     */
    usersControllerDeleteUserByPhoneNumber: (
      phoneNumber: string,
      params: RequestParams = {},
    ) =>
      this.request<User, void>({
        path: `/users/${phoneNumber}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerUpdateUserPoints
     * @summary Обновить количество баллов у пользователя
     * @request PATCH:/users/{userId}
     */
    usersControllerUpdateUserPoints: (
      userId: string,
      data: UpdateUserPointsDto,
      params: RequestParams = {},
    ) =>
      this.request<User, void>({
        path: `/users/${userId}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  products = {
    /**
     * No description
     *
     * @tags Products
     * @name ProductControllerCreateProduct
     * @summary Создать новый продукт
     * @request POST:/products
     */
    productControllerCreateProduct: (
      data: ProductDto,
      params: RequestParams = {},
    ) =>
      this.request<ProductDto, any>({
        path: `/products`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products
     * @name ProductControllerGetProducts
     * @summary Получить список продуктов с фильтрацией и сортировкой
     * @request GET:/products
     */
    productControllerGetProducts: (
      query?: {
        /** Фильтр по имени продукта */
        name?: string;
        /** Фильтр по категории */
        category?: string;
        /**
         * Порядок сортировки по цене (ASC или DESC)
         * @example "ASC"
         */
        sortOrder?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ProductDto[], any>({
        path: `/products`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products
     * @name ProductControllerUpdateProduct
     * @summary Обновить продукт
     * @request PATCH:/products/{id}
     */
    productControllerUpdateProduct: (
      id: number,
      data: ProductDto,
      params: RequestParams = {},
    ) =>
      this.request<ProductDto, any>({
        path: `/products/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products
     * @name ProductControllerDeleteProduct
     * @summary Удалить продукт
     * @request DELETE:/products/{id}
     */
    productControllerDeleteProduct: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/products/${id}`,
        method: "DELETE",
        ...params,
      }),
  };
}
