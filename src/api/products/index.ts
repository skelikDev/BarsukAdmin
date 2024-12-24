import { api } from '@/api/api-instance';
import { ProductDto } from '@/api/types.ts';

export const productsApi = {
  createProduct: (data: ProductDto) => api.post<ProductDto>('/products', data),

  getProducts: (params?: {
    name?: string;
    category?: string;
    sortOrder?: 'ASC' | 'DESC';
  }) => api.get<ProductDto[]>('/products', { params }),

  updateProduct: (id: number, data: ProductDto) =>
    api.patch<ProductDto>(`/products/${id}`, data),

  deleteProduct: (id: number) => api.delete(`/products/${id}`),
};
