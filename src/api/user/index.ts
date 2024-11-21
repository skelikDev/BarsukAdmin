/// fake api on localhost:3000

import {
  CreateUserRequest,
  CreateUserResponse,
  UpdateUserPointsRequest,
  UpdateUserPointsResponse,
  UserDetailsResponse,
  UserSearchQuery,
  UserSearchResponse,
} from "../type.ts";
import { apiClient } from "../api-client";

// TODO убрать в либу
const queryfy = (query: Record<string, string | number | undefined>) => {
  const queryObj = Object.entries(query).reduce((acc, [key, value]) => {
    if (value) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      acc[key] = value;
    }
    return acc;
  }, {});
  return new URLSearchParams(queryObj).toString();
};

// const userRoot = (path = '') => `/users${path}`;
const USER_ROOT = "/users";
// 1. Поиск пользователей по номеру телефона и/или имени
const searchUser = async (
  query: UserSearchQuery,
): Promise<UserSearchResponse> => {
  try {
    const queryParams = queryfy(query);
    const response = await apiClient.get(`${USER_ROOT}?${queryParams}`);

    return response.data;
  } catch (error) {
    throw new Error(`Ошибка при поиске пользователей: ${error}`);
  }
};

// 2. Получение подробной информации о пользователе по его ID
const getUserDetails = async (id: string): Promise<UserDetailsResponse> => {
  try {
    const response = await apiClient.get(`${USER_ROOT}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Ошибка при получении данных пользователя: ${error}`);
  }
};

// 3. Обновление количества баллов у пользователя
const updateUserPoints = async (
  id: string,
  data: UpdateUserPointsRequest,
): Promise<UpdateUserPointsResponse> => {
  try {
    const response = await apiClient.patch(`${USER_ROOT}/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(`Ошибка при обновлении баллов пользователя: ${error}`);
  }
};

// 4. Создание нового пользователя
const createUser = async (
  data: CreateUserRequest,
): Promise<CreateUserResponse> => {
  try {
    const response = await apiClient.post(USER_ROOT, data);
    return response.data;
  } catch (error) {
    throw new Error(`Ошибка при создании пользователя: ${error}`);
  }
};

export const userApi = {
  searchUser,
  getUserDetails,
  updateUserPoints,
  createUser,
};
