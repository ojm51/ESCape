import axiosInstance from '../axiosInstance'
import { ProductReviewListTypes } from '@/dtos/ProductDto'
import { CreateReviewRequestBody, UpdateReviewRequestBody } from '@/dtos/ReviewDto'

export const fetchReviews = async (productId: number, sortOption: string): Promise<ProductReviewListTypes[]> => {
  const response = await axiosInstance.get(`/products/${productId}/reviews`, {
    params: {
      order: sortOption,
    },
  })
  return response.data.list
}

export const createReview = async (reviewData: CreateReviewRequestBody) => {
  const response = await axiosInstance.post(`/reviews`, reviewData, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return response.data
}

export const updateReview = async (reviewId: number, reviewData: UpdateReviewRequestBody) => {
  const response = await axiosInstance.patch(`/reviews/${reviewId}`, reviewData, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return response.data
}
