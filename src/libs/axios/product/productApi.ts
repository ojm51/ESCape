import { AxiosResponse } from 'axios'
import axiosInstance from '../axiosInstance'
import { ProductListTypes } from '@/dtos/ProductDto'

interface QueryParams {
  keyword?: string
  categoryId?: number
  order?: 'rating' | 'recent' | 'reviewCount'
  cursor?: number
}

interface ApiResponse {
  data: ProductListTypes[]
}

export const getProduct = async ({ keyword, categoryId, order, cursor }: QueryParams) => {
  try {
    const res: AxiosResponse<ApiResponse> = await axiosInstance.get('products', {
      params: {
        keyword: keyword,
        categoryId: categoryId,
        order: order,
        cursor: cursor,
      },
    })
    console.log(res.data)
    return res.data
  } catch (err) {
    console.log(err)
  }
}
