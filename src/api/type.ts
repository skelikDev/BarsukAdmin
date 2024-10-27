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
}

type ServerError = GenericError<ErrorCode.SERVER_ERROR>
type NotFoundError = GenericError<ErrorCode.NOT_FOUND>
type ForbiddenError = GenericError<ErrorCode.FORBIDDEN>
type UnauthorizedError = GenericError<ErrorCode.UNAUTHORIZED>
type ValidationError = {
    code: ErrorCode.VALIDATION_ERROR;
    message: string;
    field: string;
};

type DefaultError<T extends ErrorCode | undefined> =
    | ServerError
    | ForbiddenError
    | UnauthorizedError
    | T


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
    phone?: string;  // Поиск по номеру телефона (необязательно)
    name?: string;   // Поиск по имени (необязательно)
}

export type UserSearchResponse = Collections<User>

export type User = {
    id: string;            // Идентификатор клиента
    name: string;     // Имя клиента
    phone: string;    // Номер телефона клиента
}

// GET /api/users/{id}
// Получение подробной информации о пользователе по его идентификатору
export type UserDetailsResponse = {
    id: string;             // Идентификатор пользователя
    phone: string;          // Номер телефона пользователя
    name: string;           // Имя пользователя
    points: number;         // Количество бонусных баллов
    history: UserHistory[]; // История действий пользователя
}

export type UserHistory = {
    id: string;                 // Идентификатор записи истории
    date: string;               // Дата изменения (в формате timestamp)
    adminId: string;           // Идентификатор клиента
    userId: string;           // Имя пользователя, совершившего действие
    action: UserHistoryEvent;         // Тип действия (ACCRUAL, DEDUCTION, REGISTRATION)
}

type RegistrationEvent = {
    type: ActionEnum.REGISTRATION;
}

type PointBalanceEvent = {
    type: ActionEnum.POINT_BALANCE;
    from: number;
    to: number;
    reason: string;
}

type UserHistoryEvent = RegistrationEvent | PointBalanceEvent

export enum ActionEnum {
    POINT_BALANCE = 'POINT_BALANCE',    // Списание баллов
    REGISTRATION = 'REGISTRATION' // Регистрация
}

// PATCH /api/users/{id}
// Обновление количества баллов у пользователя
export type UpdateUserPointsRequest = {
    points: number; // Количество баллов для обновления
}

export type UpdateUserPointsResponse = {
    id: number;         // Идентификатор пользователя
    phone: string;      // Номер телефона пользователя
    name: string;       // Имя пользователя
    points: number;     // Обновленное количество баллов
}

// POST /api/users/
// Создание нового пользователя
export type CreateUserRequest = {
    phone: string;      // Номер телефона нового пользователя
    name: string;       // Имя нового пользователя
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockRegistrationHistory = {
    id: 'id',                 // Идентификатор записи истории
    date: 'date',               // Дата изменения (в формате timestamp)
    adminId: 'id',           // Идентификатор клиента
    userId: 'id',           // Имя пользователя, совершившего действие
    action: {
        type: ActionEnum.REGISTRATION,
    }
} satisfies UserHistory;

export type CreateUserResponse = {
    id: number;         // Идентификатор нового пользователя
    phone: string;      // Номер телефона нового пользователя
    name: string;       // Имя нового пользователя
    points: number;     // Количество баллов (обычно 0 при регистрации)
    history: [typeof mockRegistrationHistory];  // История пользователя (с начальной записью о регистрации)
}