// generated with @7nohe/openapi-react-query-codegen@2.0.0-beta.3 

import { type Options } from "@hey-api/client-fetch";
import { type QueryClient } from "@tanstack/react-query";
import { productControllerGetProducts, usersControllerGetAllUsers, usersControllerGetUserById } from "../requests/services.gen";
import { ProductControllerGetProductsData, UsersControllerGetAllUsersData, UsersControllerGetUserByIdData } from "../requests/types.gen";
import * as Common from "./common";
export const ensureUseUsersControllerGetAllUsersData = (queryClient: QueryClient, clientOptions: Options<UsersControllerGetAllUsersData, true> = {}) => queryClient.ensureQueryData({ queryKey: Common.UseUsersControllerGetAllUsersKeyFn(clientOptions), queryFn: () => usersControllerGetAllUsers({ ...clientOptions }).then(response => response.data) });
export const ensureUseUsersControllerGetUserByIdData = (queryClient: QueryClient, clientOptions: Options<UsersControllerGetUserByIdData, true>) => queryClient.ensureQueryData({ queryKey: Common.UseUsersControllerGetUserByIdKeyFn(clientOptions), queryFn: () => usersControllerGetUserById({ ...clientOptions }).then(response => response.data) });
export const ensureUseProductControllerGetProductsData = (queryClient: QueryClient, clientOptions: Options<ProductControllerGetProductsData, true> = {}) => queryClient.ensureQueryData({ queryKey: Common.UseProductControllerGetProductsKeyFn(clientOptions), queryFn: () => productControllerGetProducts({ ...clientOptions }).then(response => response.data) });
