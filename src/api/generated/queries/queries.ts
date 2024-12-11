// generated with @7nohe/openapi-react-query-codegen@2.0.0-beta.3

import { type Options } from '@hey-api/client-fetch';
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';
import {
  productControllerCreateProduct,
  productControllerDeleteProduct,
  productControllerGetProducts,
  productControllerUpdateProduct,
  usersControllerCreateUser,
  usersControllerDeleteUserByPhoneNumber,
  usersControllerGetAllUsers,
  usersControllerGetUserById,
  usersControllerUpdateUserPoints,
} from '../requests/services.gen';
import {
  ProductControllerCreateProductData,
  ProductControllerCreateProductError,
  ProductControllerDeleteProductData,
  ProductControllerDeleteProductError,
  ProductControllerGetProductsData,
  ProductControllerGetProductsError,
  ProductControllerUpdateProductData,
  ProductControllerUpdateProductError,
  UsersControllerCreateUserData,
  UsersControllerCreateUserError,
  UsersControllerDeleteUserByPhoneNumberData,
  UsersControllerDeleteUserByPhoneNumberError,
  UsersControllerGetAllUsersData,
  UsersControllerGetAllUsersError,
  UsersControllerGetUserByIdData,
  UsersControllerGetUserByIdError,
  UsersControllerUpdateUserPointsData,
  UsersControllerUpdateUserPointsError,
} from '../requests/types.gen';
import * as Common from './common';
export const useUsersControllerGetAllUsers = <
  TData = Common.UsersControllerGetAllUsersDefaultResponse,
  TError = UsersControllerGetAllUsersError,
  TQueryKey extends Array<unknown> = unknown[],
>(
  clientOptions: Options<UsersControllerGetAllUsersData, true> = {},
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>
) =>
  useQuery<TData, TError>({
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
export const useUsersControllerGetUserById = <
  TData = Common.UsersControllerGetUserByIdDefaultResponse,
  TError = UsersControllerGetUserByIdError,
  TQueryKey extends Array<unknown> = unknown[],
>(
  clientOptions: Options<UsersControllerGetUserByIdData, true>,
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>
) =>
  useQuery<TData, TError>({
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
export const useProductControllerGetProducts = <
  TData = Common.ProductControllerGetProductsDefaultResponse,
  TError = ProductControllerGetProductsError,
  TQueryKey extends Array<unknown> = unknown[],
>(
  clientOptions: Options<ProductControllerGetProductsData, true> = {},
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>
) =>
  useQuery<TData, TError>({
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
export const useUsersControllerCreateUser = <
  TData = Common.UsersControllerCreateUserMutationResult,
  TError = UsersControllerCreateUserError,
  TQueryKey extends Array<unknown> = unknown[],
  TContext = unknown,
>(
  mutationKey?: TQueryKey,
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      Options<UsersControllerCreateUserData, true>,
      TContext
    >,
    'mutationKey' | 'mutationFn'
  >
) =>
  useMutation<
    TData,
    TError,
    Options<UsersControllerCreateUserData, true>,
    TContext
  >({
    mutationKey: Common.UseUsersControllerCreateUserKeyFn(mutationKey),
    mutationFn: (clientOptions) =>
      usersControllerCreateUser(clientOptions) as unknown as Promise<TData>,
    ...options,
  });
export const useProductControllerCreateProduct = <
  TData = Common.ProductControllerCreateProductMutationResult,
  TError = ProductControllerCreateProductError,
  TQueryKey extends Array<unknown> = unknown[],
  TContext = unknown,
>(
  mutationKey?: TQueryKey,
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      Options<ProductControllerCreateProductData, true>,
      TContext
    >,
    'mutationKey' | 'mutationFn'
  >
) =>
  useMutation<
    TData,
    TError,
    Options<ProductControllerCreateProductData, true>,
    TContext
  >({
    mutationKey: Common.UseProductControllerCreateProductKeyFn(mutationKey),
    mutationFn: (clientOptions) =>
      productControllerCreateProduct(
        clientOptions
      ) as unknown as Promise<TData>,
    ...options,
  });
export const useUsersControllerUpdateUserPoints = <
  TData = Common.UsersControllerUpdateUserPointsMutationResult,
  TError = UsersControllerUpdateUserPointsError,
  TQueryKey extends Array<unknown> = unknown[],
  TContext = unknown,
>(
  mutationKey?: TQueryKey,
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      Options<UsersControllerUpdateUserPointsData, true>,
      TContext
    >,
    'mutationKey' | 'mutationFn'
  >
) =>
  useMutation<
    TData,
    TError,
    Options<UsersControllerUpdateUserPointsData, true>,
    TContext
  >({
    mutationKey: Common.UseUsersControllerUpdateUserPointsKeyFn(mutationKey),
    mutationFn: (clientOptions) =>
      usersControllerUpdateUserPoints(
        clientOptions
      ) as unknown as Promise<TData>,
    ...options,
  });
export const useProductControllerUpdateProduct = <
  TData = Common.ProductControllerUpdateProductMutationResult,
  TError = ProductControllerUpdateProductError,
  TQueryKey extends Array<unknown> = unknown[],
  TContext = unknown,
>(
  mutationKey?: TQueryKey,
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      Options<ProductControllerUpdateProductData, true>,
      TContext
    >,
    'mutationKey' | 'mutationFn'
  >
) =>
  useMutation<
    TData,
    TError,
    Options<ProductControllerUpdateProductData, true>,
    TContext
  >({
    mutationKey: Common.UseProductControllerUpdateProductKeyFn(mutationKey),
    mutationFn: (clientOptions) =>
      productControllerUpdateProduct(
        clientOptions
      ) as unknown as Promise<TData>,
    ...options,
  });
export const useUsersControllerDeleteUserByPhoneNumber = <
  TData = Common.UsersControllerDeleteUserByPhoneNumberMutationResult,
  TError = UsersControllerDeleteUserByPhoneNumberError,
  TQueryKey extends Array<unknown> = unknown[],
  TContext = unknown,
>(
  mutationKey?: TQueryKey,
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      Options<UsersControllerDeleteUserByPhoneNumberData, true>,
      TContext
    >,
    'mutationKey' | 'mutationFn'
  >
) =>
  useMutation<
    TData,
    TError,
    Options<UsersControllerDeleteUserByPhoneNumberData, true>,
    TContext
  >({
    mutationKey:
      Common.UseUsersControllerDeleteUserByPhoneNumberKeyFn(mutationKey),
    mutationFn: (clientOptions) =>
      usersControllerDeleteUserByPhoneNumber(
        clientOptions
      ) as unknown as Promise<TData>,
    ...options,
  });
export const useProductControllerDeleteProduct = <
  TData = Common.ProductControllerDeleteProductMutationResult,
  TError = ProductControllerDeleteProductError,
  TQueryKey extends Array<unknown> = unknown[],
  TContext = unknown,
>(
  mutationKey?: TQueryKey,
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      Options<ProductControllerDeleteProductData, true>,
      TContext
    >,
    'mutationKey' | 'mutationFn'
  >
) =>
  useMutation<
    TData,
    TError,
    Options<ProductControllerDeleteProductData, true>,
    TContext
  >({
    mutationKey: Common.UseProductControllerDeleteProductKeyFn(mutationKey),
    mutationFn: (clientOptions) =>
      productControllerDeleteProduct(
        clientOptions
      ) as unknown as Promise<TData>,
    ...options,
  });
