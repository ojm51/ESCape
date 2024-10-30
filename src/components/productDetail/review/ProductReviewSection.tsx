import React, { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { fetchReviews, deleteReview } from '@/libs/axios/product/reviewApi'
import { ProductReviewListTypes } from '@/dtos/ProductDto'
import DefaultImage from '@images/default-image.png'
import { useAuth } from '@/contexts/AuthProvider'
import SortDropdown from './SortDropdown'
import StarRating from '../StarRating'
import ReviewLikeButton from './ReviewLikeButton'
import ReviewModal from '../ReviewModal'

const ProductReviewSection: React.FC<{ productId: number }> = ({ productId }) => {
  const router = useRouter()
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const [sortOption, setSortOption] = useState<string>('recent')
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false)
  const [editingReview, setEditingReview] = useState<ProductReviewListTypes | null>(null)

  const {
    data: reviews = [],
    isLoading,
    error,
    refetch,
  } = useQuery<ProductReviewListTypes[]>({
    queryKey: ['reviews', productId, sortOption],
    queryFn: () => fetchReviews(productId, sortOption),
  })

  const handleSortChange = (newSortOption: string) => {
    setSortOption(newSortOption)
    refetch()
  }

  const handleProfileClick = (userId: number) => {
    router.push(`/user/${userId}`)
  }

  const handleEditReview = (review: ProductReviewListTypes) => {
    setEditingReview(review)
    setIsReviewModalOpen(true)
  }

  const handleDeleteReview = async (reviewId: number) => {
    const confirmed = window.confirm('리뷰를 삭제하시겠습니까?')

    if (confirmed) {
      try {
        await deleteReview(reviewId)
        alert('리뷰가 성공적으로 삭제되었습니다.')
        refetch()
        queryClient.invalidateQueries({ queryKey: ['productDetail', productId] })
      } catch (error) {
        console.error('리뷰 삭제 실패:', error)
        alert('리뷰 삭제에 실패했습니다.')
      }
    }
  }

  const closeModal = () => {
    setIsReviewModalOpen(false)
    setEditingReview(null)
    refetch()
    queryClient.invalidateQueries({ queryKey: ['productDetail', productId] })
  }

  return (
    <div className="relative mx-auto max-w-[940px]">
      <div className="mb-[30px] flex items-center justify-between">
        <h3 className="text-lg font-semibold">상품 리뷰</h3>
        <SortDropdown productId={productId} order={handleSortChange} />
      </div>
      {isLoading ? (
        <p>로딩 중...</p>
      ) : error ? (
        <p>{(error as Error).message}</p>
      ) : (
        <ul>
          {reviews.map(review => (
            <li key={review.id} className="relative mb-4 rounded-lg border border-unactive bg-[#252530] p-6">
              <div className="flex justify-between">
                <div className="flex items-start">
                  <img
                    src={review.user.image || DefaultImage.src}
                    alt={review.user.nickname}
                    className={`mr-4 h-12 w-12 cursor-pointer rounded-full object-cover ${
                      review.user.image ? '' : 'border-2 border-unactive'
                    }`}
                    onClick={() => handleProfileClick(review.user.id)}
                    onError={e => {
                      e.currentTarget.src = DefaultImage.src
                      e.currentTarget.classList.add('border-2', 'border-unactive')
                    }}
                  />

                  <div className="flex w-[120px] flex-col">
                    <p className="truncate font-bold text-white">{review.user.nickname}</p>
                    <StarRating rating={Number(review.rating)} color="#FFD700" />
                  </div>
                </div>

                <div className="mx-8 flex flex-grow flex-col">
                  <p className="mb-3 text-white">{review.content}</p>
                  <div className="mb-2 flex space-x-2">
                    {review.reviewImages.map(image => (
                      <img
                        key={image.id}
                        src={image.source}
                        alt={`Review Image ${image.id}`}
                        className="h-16 w-16 rounded object-cover"
                        onError={e => {
                          e.currentTarget.src = DefaultImage.src
                        }}
                      />
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</p>

                    {user && user.id === review.user.id && (
                      <div className="flex space-x-2">
                        <button className="text-[#9FA6B2] hover:underline" onClick={() => handleEditReview(review)}>
                          수정
                        </button>
                        <button
                          className="text-[#9FA6B2] hover:underline"
                          onClick={() => handleDeleteReview(review.id)}
                        >
                          삭제
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <div className="mt-auto flex items-center space-x-1">
                    <ReviewLikeButton
                      reviewId={review.id}
                      initialIsLiked={review.isLiked}
                      initialLikeCount={review.likeCount}
                    />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {editingReview && (
        <ReviewModal
          isOpen={isReviewModalOpen}
          onClose={closeModal}
          productName="상품 이름"
          productId={productId}
          isEdit
          initialReviewData={{
            rating: editingReview.rating,
            content: editingReview.content,
            images: editingReview.reviewImages.map(image => ({
              id: image.id,
              source: image.source,
            })),
            reviewId: editingReview.id,
          }}
        />
      )}
    </div>
  )
}

export default ProductReviewSection
