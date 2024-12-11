// generated with @7nohe/openapi-react-query-codegen@2.0.0-beta.3

import { type Options } from '@hey-api/client-fetch';
import { UseQueryOptions, useSuspenseQuery } from '@tanstack/react-query';
import {
  productControllerGetProducts,
  usersControllerGetAllUsers,
  usersControllerGetUserById,
} from '../requests/services.gen';
import {
  ProductControllerGetProductsData,
  ProductControllerGetProductsError,
  UsersControllerGetAllUsersData,
  UsersControllerGetAllUsersError,
  UsersControllerGetUserByIdData,
  UsersControllerGetUserByIdError,
} from '../requests/types.gen';
import * as Common from './common';
export const useUsersControllerGetAllUsersSuspense = <
  TData = Common.UsersControllerGetAllUsersDefaultResponse,
  TError = UsersControllerGetAllUsersError,
  TQueryKey extends Array<unknown> = unknown[],
>(
  clientOptions: Options<UsersControllerGetAllUsersData, true> = {},
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>
) =>
  useSuspenseQuery<TData, TError>({
    queryKey: Common.UseUsersControllerGetAllUsersKeyFn(
      clientOptions,
      queryKey
    ),
    queryFn: () =>
      usersControllerGetAllUsers({ ...clientOptions }).then(
        (response) => response.data as TData
      ) as TData,
    ...options,
  });
export const useUsersControllerGetUserByIdSuspense = <
  TData = Common.UsersControllerGetUserByIdDefaultResponse,
  TError = UsersControllerGetUserByIdError,
  TQueryKey extends Array<unknown> = unknown[],
>(
  clientOptions: Options<UsersControllerGetUserByIdData, true>,
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>
) =>
  useSuspenseQuery<TData, TError>({
    queryKey: Common.UseUsersControllerGetUserByIdKeyFn(
      clientOptions,
      queryKey
    ),
    queryFn: () =>
      usersControllerGetUserById({ ...clientOptions }).then(
        (response) => response.data as TData
      ) as TData,
    ...options,
  });
export const useProductControllerGetProductsSuspense = <
  TData = Common.ProductControllerGetProductsDefaultResponse,
  TError = ProductControllerGetProductsError,
  TQueryKey extends Array<unknown> = unknown[],
>(
  clientOptions: Options<ProductControllerGetProductsData, true> = {},
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>
) =>
  useSuspenseQuery<TData, TError>({
    queryKey: Common.UseProductControllerGetProductsKeyFn(
      clientOptions,
      queryKey
    ),
    queryFn: () =>
      productControllerGetProducts({ ...clientOptions }).then(
        (response) => response.data as TData
      ) as TData,
    ...options,
  });
