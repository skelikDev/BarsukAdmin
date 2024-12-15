import { api } from '@/api/api-instance.ts';
import {
  CreateUserDto,
  CreateUserResponseDto,
  UserSearchParams,
  UpdateUserPointsDto,
  UserPaginationDTO,
  UserResponseByIdDto,
} from '@/api/types.ts';

export const usersApi = {
  createUser: (data: CreateUserDto) =>
    api.post<CreateUserResponseDto>('/users', data),

  getAllUsers: (params?: UserSearchParams) =>
    api.get<UserPaginationDTO>('/users', { params }),

  getUserById: (id: number) => api.get<UserResponseByIdDto>(`/users/${id}`),

  deleteUserById: (id: number) => api.delete(`/users/${id}`),

  updateUserPoints: (userId: string, data: UpdateUserPointsDto) =>
    api.patch(`/users/${userId}`, data),
};
