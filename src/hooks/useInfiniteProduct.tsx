import { fetchReviews, ReviewsQueryParams } from '@/libs/axios/product/reviewApi'
import { useInfiniteQuery } from '@tanstack/react-query'
import { ProductReviewsResponseTypes } from '@/dtos/ProductDto'

export default function useInfiniteReviews(productId: number, params: ReviewsQueryParams) {
  return useInfiniteQuery<ProductReviewsResponseTypes, Error>({
    queryKey: ['reviews', productId, params],
    queryFn: ({ pageParam }: { pageParam: number | null }) => fetchReviews(productId, { ...params, cursor: pageParam }),
    initialPageParam: null,
    getNextPageParam: lastPage => lastPage.nextCursor ?? undefined,
  })
}
