// generated with @7nohe/openapi-react-query-codegen@2.0.0-beta.3

import { type Options } from '@hey-api/client-fetch';
import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import { usersControllerGetAllUsers } from '../requests/services.gen';
import {
  UsersControllerGetAllUsersData,
  UsersControllerGetAllUsersError,
} from '../requests/types.gen';
import * as Common from './common';
export const useUsersControllerGetAllUsersInfinite = <
  TData = InfiniteData<Common.UsersControllerGetAllUsersDefaultResponse>,
  TError = UsersControllerGetAllUsersError,
  TQueryKey extends Array<unknown> = unknown[],
>(
  clientOptions: Options<UsersControllerGetAllUsersData, true> = {},
  queryKey?: TQueryKey,
  options?: Omit<UseInfiniteQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>
) =>
  useInfiniteQuery({
    queryKey: Common.UseUsersControllerGetAllUsersKeyFn(
      clientOptions,
      queryKey
    ),
    queryFn: ({ pageParam }) =>
      usersControllerGetAllUsers({
        ...clientOptions,
        query: { ...clientOptions.query, page: pageParam as number },
      }).then((response) => response.data as TData) as TData,
    initialPageParam: '1',
    getNextPageParam: (response) =>
      (
        response as {
          nextPage: number;
        }
      ).nextPage,
    ...options,
  });
