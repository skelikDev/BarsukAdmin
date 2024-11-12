export enum ErrorCode {
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
  VALIDATION_ERROR = 422,
}

type GenericError<T extends ErrorCode> = {
  code: T;
  message: string;
};

type ServerError = GenericError<ErrorCode.SERVER_ERROR>;
type NotFoundError = GenericError<ErrorCode.NOT_FOUND>;
type ForbiddenError = GenericError<ErrorCode.FORBIDDEN>;
type UnauthorizedError = GenericError<ErrorCode.UNAUTHORIZED>;
type ValidationError = {
  code: ErrorCode.VALIDATION_ERROR;
  message: string;
  field: string;
};

type DefaultError<T extends ErrorCode | undefined> =
  | ServerError
  | ForbiddenError
  | UnauthorizedError
  | T;

type Collections<T> = {
  count: number;
  size: number;
  page: number;
  totalPages: number;
  items: T[];
};

// GET /api/users/search?phone=123&name=Ivanov
// Поиск пользователей по номеру телефона и/или имени
export type UserSearchQuery = {
  phone?: string; // Поиск по номеру телефона (необязательно)
  name?: string; // Поиск по имени (необязательно)
};

export type UserSearchResponse = Collections<User>;

export type User = {
  id: string; // Идентификатор клиента
  name: string; // Имя клиента
  phone: string; // Номер телефона клиента
};

// GET /api/users/{id}

export type UserDetailsResponse = {
  id: string;
  phone: string;
  name: string;
  points: number;
  history: UserHistory[];
};

export type UserHistory = {
  id: string;
  date: string;
  adminId: string;
  userId: string;
  action: UserHistoryEvent;
};

type RegistrationEvent = {
  type: ActionEnum.REGISTRATION;
};

type PointBalanceEvent = {
  type: ActionEnum.POINT_BALANCE;
  from: number;
  to: number;
  reason: string;
};

type UserHistoryEvent = RegistrationEvent | PointBalanceEvent;

export enum ActionEnum {
  POINT_BALANCE = "POINT_BALANCE",
  REGISTRATION = "REGISTRATION",
}

export type UpdateUserPointsRequest = {
  points: number;
};

export type UpdateUserPointsResponse = {
  id: number;
  phone: string;
  name: string;
  points: number;
};

export type CreateUserRequest = {
  phone: string;
  name: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockRegistrationHistory = {
  id: "id",
  date: "date",
  adminId: "id",
  userId: "id",
  action: {
    type: ActionEnum.REGISTRATION,
  },
} satisfies UserHistory;

export type CreateUserResponse = User & {
  points: number;
  history: [typeof mockRegistrationHistory];
};
