// generated with @7nohe/openapi-react-query-codegen@2.0.0-beta.3

import { type Options } from '@hey-api/client-fetch';
import { UseQueryResult } from '@tanstack/react-query';
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
export type UsersControllerGetAllUsersDefaultResponse = Awaited<
  ReturnType<typeof usersControllerGetAllUsers>
>['data'];
export type UsersControllerGetAllUsersQueryResult<
  TData = UsersControllerGetAllUsersDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useUsersControllerGetAllUsersKey = 'UsersControllerGetAllUsers';
export const UseUsersControllerGetAllUsersKeyFn = (
  clientOptions: Options<unknown, true> = {},
  queryKey?: Array<unknown>
) => [useUsersControllerGetAllUsersKey, ...(queryKey ?? [clientOptions])];
export type UsersControllerGetUserByIdDefaultResponse = Awaited<
  ReturnType<typeof usersControllerGetUserById>
>['data'];
export type UsersControllerGetUserByIdQueryResult<
  TData = UsersControllerGetUserByIdDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useUsersControllerGetUserByIdKey = 'UsersControllerGetUserById';
export const UseUsersControllerGetUserByIdKeyFn = (
  clientOptions: Options<unknown, true>,
  queryKey?: Array<unknown>
) => [useUsersControllerGetUserByIdKey, ...(queryKey ?? [clientOptions])];
export type ProductControllerGetProductsDefaultResponse = Awaited<
  ReturnType<typeof productControllerGetProducts>
>['data'];
export type ProductControllerGetProductsQueryResult<
  TData = ProductControllerGetProductsDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useProductControllerGetProductsKey =
  'ProductControllerGetProducts';
export const UseProductControllerGetProductsKeyFn = (
  clientOptions: Options<unknown, true> = {},
  queryKey?: Array<unknown>
) => [useProductControllerGetProductsKey, ...(queryKey ?? [clientOptions])];
export type UsersControllerCreateUserMutationResult = Awaited<
  ReturnType<typeof usersControllerCreateUser>
>;
export const useUsersControllerCreateUserKey = 'UsersControllerCreateUser';
export const UseUsersControllerCreateUserKeyFn = (
  mutationKey?: Array<unknown>
) => [useUsersControllerCreateUserKey, ...(mutationKey ?? [])];
export type ProductControllerCreateProductMutationResult = Awaited<
  ReturnType<typeof productControllerCreateProduct>
>;
export const useProductControllerCreateProductKey =
  'ProductControllerCreateProduct';
export const UseProductControllerCreateProductKeyFn = (
  mutationKey?: Array<unknown>
) => [useProductControllerCreateProductKey, ...(mutationKey ?? [])];
export type UsersControllerUpdateUserPointsMutationResult = Awaited<
  ReturnType<typeof usersControllerUpdateUserPoints>
>;
export const useUsersControllerUpdateUserPointsKey =
  'UsersControllerUpdateUserPoints';
export const UseUsersControllerUpdateUserPointsKeyFn = (
  mutationKey?: Array<unknown>
) => [useUsersControllerUpdateUserPointsKey, ...(mutationKey ?? [])];
export type ProductControllerUpdateProductMutationResult = Awaited<
  ReturnType<typeof productControllerUpdateProduct>
>;
export const useProductControllerUpdateProductKey =
  'ProductControllerUpdateProduct';
export const UseProductControllerUpdateProductKeyFn = (
  mutationKey?: Array<unknown>
) => [useProductControllerUpdateProductKey, ...(mutationKey ?? [])];
export type UsersControllerDeleteUserByPhoneNumberMutationResult = Awaited<
  ReturnType<typeof usersControllerDeleteUserByPhoneNumber>
>;
export const useUsersControllerDeleteUserByPhoneNumberKey =
  'UsersControllerDeleteUserByPhoneNumber';
export const UseUsersControllerDeleteUserByPhoneNumberKeyFn = (
  mutationKey?: Array<unknown>
) => [useUsersControllerDeleteUserByPhoneNumberKey, ...(mutationKey ?? [])];
export type ProductControllerDeleteProductMutationResult = Awaited<
  ReturnType<typeof productControllerDeleteProduct>
>;
export const useProductControllerDeleteProductKey =
  'ProductControllerDeleteProduct';
export const UseProductControllerDeleteProductKeyFn = (
  mutationKey?: Array<unknown>
) => [useProductControllerDeleteProductKey, ...(mutationKey ?? [])];
