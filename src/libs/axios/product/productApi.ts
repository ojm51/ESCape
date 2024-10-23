import axiosInstance from '../axiosInstance'
import { ResponseProductListTypes } from '@/dtos/ProductDto'

export interface ProductQueryParams {
  keyword?: string
  categoryId?: number
  order?: 'rating' | 'recent' | 'reviewCount'
  cursor?: number
}

export const getProduct = async ({
  keyword,
  categoryId,
  order,
  cursor,
}: ProductQueryParams): Promise<ResponseProductListTypes | null> => {
  try {
    const res = await axiosInstance.get('products', {
      params: {
        keyword: keyword,
        categoryId: categoryId,
        order: order,
        cursor: cursor,
      },
    })
    return res.data
  } catch (err) {
    console.log(err)
    return null
  }
}
