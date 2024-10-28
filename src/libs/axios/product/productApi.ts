<<<<<<< HEAD
// libs/axios/productApi.ts
import axiosInstance from './axiosInstance'
import { ProductDetailTypes, DescriptionTypes } from '@/dtos/ProductDto'

export const fetchProductDetails = async (teamId: string, productId: number): Promise<ProductDetailTypes> => {
  const response = await axiosInstance.get(`/${teamId}/products/${productId}`)
  const productData = response.data

  // description이 JSON 문자열일 경우 객체로 변환
  if (typeof productData.description === 'string') {
    productData.description = JSON.parse(productData.description) as DescriptionTypes
  }

  return productData
=======
import axiosInstance from '../axiosInstance'
import { ResponseProductListTypes } from '@/dtos/ProductDto'

export interface ProductQueryParams {
  keyword?: string | null
  categoryId?: number | null
  order?: 'rating' | 'recent' | 'reviewCount' | null
  cursor?: number | null
}

export const getProduct = async ({
  keyword,
  categoryId,
  order,
  cursor,
}: ProductQueryParams): Promise<ResponseProductListTypes> => {
  try {
    const res = await axiosInstance.get('products', {
      params: {
        keyword: keyword,
        category: categoryId,
        order: order,
        cursor: cursor,
      },
    })
    return res.data
  } catch (err) {
    console.log(err)
    return { nextCursor: 0, list: [] } as ResponseProductListTypes
  }
>>>>>>> upstream/dev
}
