// generated with @7nohe/openapi-react-query-codegen@2.0.0-beta.3

import { type Options } from '@hey-api/client-fetch';
import { type QueryClient } from '@tanstack/react-query';
import {
  productControllerGetProducts,
  usersControllerGetAllUsers,
  usersControllerGetUserById,
} from '../requests/services.gen';
import {
  ProductControllerGetProductsData,
  UsersControllerGetAllUsersData,
  UsersControllerGetUserByIdData,
} from '../requests/types.gen';
import * as Common from './common';
export const prefetchUseUsersControllerGetAllUsers = (
  queryClient: QueryClient,
  clientOptions: Options<UsersControllerGetAllUsersData, true> = {}
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UseUsersControllerGetAllUsersKeyFn(clientOptions),
    queryFn: () =>
      usersControllerGetAllUsers({ ...clientOptions }).then(
        (response) => response.data
      ),
  });
export const prefetchUseUsersControllerGetUserById = (
  queryClient: QueryClient,
  clientOptions: Options<UsersControllerGetUserByIdData, true>
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UseUsersControllerGetUserByIdKeyFn(clientOptions),
    queryFn: () =>
      usersControllerGetUserById({ ...clientOptions }).then(
        (response) => response.data
      ),
  });
export const prefetchUseProductControllerGetProducts = (
  queryClient: QueryClient,
  clientOptions: Options<ProductControllerGetProductsData, true> = {}
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UseProductControllerGetProductsKeyFn(clientOptions),
    queryFn: () =>
      productControllerGetProducts({ ...clientOptions }).then(
        (response) => response.data
      ),
  });
