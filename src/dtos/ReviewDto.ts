export interface CreateReviewRequestBody {
  productId: number
  images: string
  content: string
  rating: number
}

export interface UpdateReviewRequestBody {
  images: string
  content: string
  rating: number
}
