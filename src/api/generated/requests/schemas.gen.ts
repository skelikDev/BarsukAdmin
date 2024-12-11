// This file is auto-generated by @hey-api/openapi-ts

export const CreateUserDtoSchema = {
    type: 'object',
    properties: {
        phone: {
            type: 'string',
            example: '+123456789',
            description: 'Номер телефона пользователя'
        },
        name: {
            type: 'string',
            example: 'Иван Иванов',
            description: 'Имя пользователя'
        }
    },
    required: ['phone', 'name']
} as const;

export const CreateUserResponseDtoSchema = {
    type: 'object',
    properties: {
        id: {
            type: 'number',
            example: 1
        },
        name: {
            type: 'string',
            example: 'Ruslan'
        },
        phone: {
            type: 'string',
            example: '88005553535'
        },
        points: {
            type: 'number',
            example: 12
        }
    },
    required: ['id', 'name', 'phone', 'points']
} as const;

export const UserResponseDtoSchema = {
    type: 'object',
    properties: {
        id: {
            type: 'number',
            example: 1
        },
        name: {
            type: 'string',
            example: 'Ruslan'
        },
        phone: {
            type: 'string',
            example: '88005553535'
        }
    },
    required: ['id', 'name', 'phone']
} as const;

export const UserPaginationDTOSchema = {
    type: 'object',
    properties: {
        total: {
            type: 'number',
            example: 100
        },
        size: {
            type: 'number',
            example: 10
        },
        page: {
            type: 'number',
            example: 1
        },
        items: {
            type: 'array',
            items: {
                '$ref': '#/components/schemas/UserResponseDto'
            }
        }
    },
    required: ['total', 'size', 'page', 'items']
} as const;

export const RegistrationHistoryDtoSchema = {
    type: 'object',
    properties: {
        id: {
            type: 'number',
            example: 1
        },
        action: {
            type: 'string',
            example: 'REGISTRATION'
        },
        date: {
            format: 'date-time',
            type: 'string',
            example: '2024-11-23T11:37:16.121Z'
        }
    },
    required: ['id', 'action', 'date']
} as const;

export const UserResponseByIdDtoSchema = {
    type: 'object',
    properties: {
        id: {
            type: 'number',
            example: 1
        },
        name: {
            type: 'string',
            example: 'Ruslan'
        },
        phone: {
            type: 'string',
            example: '88005553535'
        },
        registrationHistories: {
            type: 'array',
            items: {
                '$ref': '#/components/schemas/RegistrationHistoryDto'
            }
        }
    },
    required: ['id', 'name', 'phone', 'registrationHistories']
} as const;

export const UpdateUserPointsDtoSchema = {
    type: 'object',
    properties: {
        points: {
            type: 'number',
            example: 100,
            description: 'Количество баллов пользователя'
        }
    },
    required: ['points']
} as const;

export const ProductDtoSchema = {
    type: 'object',
    properties: {
        id: {
            type: 'number',
            example: 1,
            description: 'Уникальный идентификатор продукта'
        },
        name: {
            type: 'string',
            example: 'Продукт A',
            description: 'Название продукта'
        },
        description: {
            type: 'string',
            example: 'Описание продукта A',
            description: 'Описание продукта'
        },
        price: {
            type: 'number',
            example: 100,
            description: 'Цена продукта'
        },
        category: {
            example: ['Категория1', 'Категория2'],
            description: 'Категории продукта',
            nullable: true,
            type: 'array',
            items: {
                type: 'string'
            }
        },
        images: {
            example: ['url1.jpg', 'url2.jpg'],
            description: 'Ссылки на изображения продукта',
            type: 'array',
            items: {
                type: 'string'
            }
        }
    },
    required: ['id', 'name', 'description', 'price', 'category', 'images']
} as const;