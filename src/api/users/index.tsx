import { api } from '@/api/api-instance.ts';
import {
  CreateUserDto,
  CreateUserResponseDto,
  UserSearchParams,
  UpdateUserPointsDto,
  UserPaginationDTO,
  UserResponseByIdDto,
} from '@/api/types.ts';
import { useEffect, useState } from 'react';
import { useToast } from '@/shadcn/hooks/use-toast.ts';
import { ToastAction } from '@/shadcn/components/ui/toast.tsx';

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

export const useGetUserById = (id: number) => {
  const [userDetails, setUserDetails] = useState<UserResponseByIdDto | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const { toast } = useToast();

  const fetchUser = async () => {
    try {
      setLoading(true);
      setCount(count + 1);
      const { data } = await usersApi.getUserById(id);
      setUserDetails(data);
    } catch (err) {
      toast({
        variant: 'destructive',
        // @ts-ignore
        title: `Ошибка ${err.response.status}`,
        description: 'There was a problem with your request.',
        action: (
          <ToastAction
            altText="Try again"
            onClick={() => {
              fetchUser();
            }}
          >
            Попробуй еще раз (попыток - {count})
          </ToastAction>
        ),
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { userDetails, loading, setUserDetails };
};

export const useUpdateUserPoints = () => {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const { toast } = useToast();

  const updateUserPoints = async (id: number, data: UpdateUserPointsDto) => {
    try {
      setLoading(true);
      setCount(count + 1);
      await usersApi.updateUserPoints(id.toString(), data);
      toast({
        variant: 'default',
        duration: 3000,
        title: 'Успешно',
        description: 'Баллы пользователя обновлены',
        action: <ToastAction altText={'Undo'}>Отменить</ToastAction>,
      });
      setCount(0);
    } catch (err) {
      toast({
        variant: 'destructive',
        // @ts-ignore
        title: `Ошибка ${err.response.status}`,
        description: 'There was a problem with your request.',
        action: (
          <ToastAction
            altText="Try again"
            onClick={() => {
              updateUserPoints(id, data);
            }}
          >
            Попробуй еще раз (попыток - {count})
          </ToastAction>
        ),
      });
    } finally {
      setLoading(false);
    }
  };

  return { updateUserPoints, loading };
};

export const useDeleteUser = () => {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const { toast } = useToast();

  const deleteUser = async (id: number) => {
    try {
      setLoading(true);
      setCount(count + 1);
      await usersApi.deleteUserById(id);
      toast({
        variant: 'default',
        duration: 3000,
        title: 'Успешно',
        description: 'Пользователь удален',
        action: <ToastAction altText={'Undo'}>Отменить</ToastAction>,
      });
      setCount(0);
    } catch (err) {
      toast({
        variant: 'destructive',
        // @ts-ignore
        title: `Ошибка ${err.response.status}`,
        description: 'There was a problem with your request.',
        action: (
          <ToastAction
            altText="Try again"
            onClick={() => {
              deleteUser(id);
            }}
          >
            Попробуй еще раз (попыток - {count})
          </ToastAction>
        ),
      });
    } finally {
      setLoading(false);
    }
  };

  return { deleteUser, loading };
};

export const useCreateUser = () => {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const { toast } = useToast();

  const createUser = async (
    params: CreateUserDto
  ): Promise<CreateUserResponseDto | void> => {
    try {
      setLoading(true);
      setCount(count + 1);
      const { data } = await usersApi.createUser(params);
      toast({
        variant: 'default',
        duration: 3000,
        title: 'Успешно',
        description: 'Пользователь создан',
        action: <ToastAction altText={'Undo'}>Отменить</ToastAction>,
      });
      setCount(0);
      return data;
    } catch (err) {
      toast({
        variant: 'destructive',
        // @ts-ignore
        title: `Ошибка ${err.response.status}`,
        description: 'There was a problem with your request.',
        action: (
          <ToastAction
            altText="Try again"
            onClick={() => {
              createUser(params);
            }}
          >
            Попробуй еще раз (попыток - {count})
          </ToastAction>
        ),
      });
    } finally {
      setLoading(false);
    }
  };

  return { createUser, loading };
};
