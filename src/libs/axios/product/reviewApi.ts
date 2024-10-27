import axiosInstance from './axiosInstance'
import { ProductReviewListTypes } from '@/dtos/ProductDto'
import { CreateReviewRequestBody, UpdateReviewRequestBody } from '@/dtos/ReviewDto'

export const fetchReviews = async (
  teamId: string,
  productId: number,
  sortOption: string,
): Promise<ProductReviewListTypes[]> => {
  const response = await axiosInstance.get(`/${teamId}/products/${productId}/reviews`, {
    params: {
      order: sortOption,
    },
  })
  return response.data.list
}

export const createReview = async (teamId: string, reviewData: CreateReviewRequestBody) => {
  const response = await axiosInstance.post(`/${teamId}/reviews`, reviewData, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return response.data
}

export const updateReview = async (teamId: string, reviewId: number, reviewData: UpdateReviewRequestBody) => {
  const response = await axiosInstance.patch(`/${teamId}/reviews/${reviewId}`, reviewData, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return response.data
}
