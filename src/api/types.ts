// User Types
export interface CreateUserDto {
  phone: string; // Номер телефона пользователя
  name: string; // Имя пользователя
}

export interface CreateUserResponseDto {
  id: number;
  name: string;
  phone: string;
  points: number;
}

export interface UserSearchParams {
  name?: string;
  phone?: string;
  page?: number;
  size?: number;
}

export interface UserResponseDto {
  id: number;
  name: string;
  phone: string;
}

export interface UserPaginationDTO {
  total: number;
  size: number;
  page: number;
  items: UserResponseDto[];
}

export interface RegistrationHistoryDto {
  id: number;
  action: string;
  date: string; // ISO date format
}

export interface UserResponseByIdDto {
  id: number;
  name: string;
  phone: string;
  registrationHistories: RegistrationHistoryDto[];
}

export interface UpdateUserPointsDto {
  points: number; // Количество баллов пользователя
}

// Product Types
export interface ProductDto {
  id: number; // Уникальный идентификатор продукта
  name: string; // Название продукта
  description: string; // Описание продукта
  price: number; // Цена продукта
  category: string[] | null; // Категории продукта
  images: string[]; // Ссылки на изображения продукта
}
