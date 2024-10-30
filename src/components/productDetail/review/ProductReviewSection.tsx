import React, { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useAuth } from '@/contexts/AuthProvider'
import { useToaster } from '@/contexts/ToasterProvider'
import { fetchReviews, deleteReview } from '@/libs/axios/product/reviewApi'
import { ProductReviewListTypes } from '@/dtos/ProductDto'
import DefaultImage from '@images/default-image.png'
import SortDropdown from './SortDropdown'
import StarRating from '../StarRating'
import ReviewLikeButton from './ReviewLikeButton'
import ReviewModal from '../ReviewModal'

const ProductReviewSection: React.FC<{ productId: number }> = ({ productId }) => {
  const router = useRouter()
  const toaster = useToaster()
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
        toaster('success', '리뷰가 성공적으로 삭제되었습니다.')
        refetch()
        queryClient.invalidateQueries({ queryKey: ['productDetail', productId] })
      } catch (error) {
        console.error('리뷰 삭제 실패:', error)
        toaster('fail', '리뷰 삭제에 실패했습니다.')
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
        <SortDropdown order={handleSortChange} />
      </div>
      {isLoading ? (
        <p>로딩 중...</p>
      ) : error ? (
        <p>{(error as Error).message}</p>
      ) : (
        <ul>
          {reviews.map(review => (
            <li key={review.id} className="relative mb-4 rounded-lg border border-unactive bg-[#252530] p-6">
              <div className="md:flex md:justify-between">
                {/* 모바일에서는 section이 위에, 그 아래에 리뷰 내용이 배치되도록 설정 */}
                <section className="mb-4 md:mb-0">
                  <div className="flex items-start">
                    <button
                      type="button"
                      onClick={() => handleProfileClick(review.user.id)}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          handleProfileClick(review.user.id)
                        }
                      }}
                      className="mr-4 h-12 w-12 cursor-pointer overflow-hidden rounded-full object-cover focus:outline-none"
                      aria-label={`${review.user.nickname}의 프로필`}
                    >
                      <img
                        src={review.user.image || DefaultImage.src}
                        alt={review.user.nickname}
                        className={`h-full w-full object-cover ${review.user.image ? '' : 'border-2 border-unactive'}`}
                        onError={e => {
                          e.currentTarget.src = DefaultImage.src
                          e.currentTarget.classList.add('border-2', 'border-unactive')
                        }}
                      />
                    </button>

                    <div className="flex w-[120px] flex-col">
                      <p className="truncate font-bold text-white">{review.user.nickname}</p>
                      <StarRating rating={Number(review.rating)} color="#FFD700" />
                    </div>
                  </div>
                </section>

                {/* 모바일에서 아래로 배치되도록 설정 */}
                <div className="space-y-2 md:mx-8 md:flex md:flex-grow md:flex-col">
                  <p className="text-white">{review.content}</p>
                  <div className="flex space-x-2">
                    {review.reviewImages.map(image => (
                      <img
                        key={image.id}
                        src={image.source}
                        alt={`Review_Image ${image.id}`}
                        className="h-16 w-16 rounded object-cover"
                        onError={e => {
                          e.currentTarget.src = DefaultImage.src
                        }}
                      />
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    {/* 작성 시간과 수정/삭제 버튼을 옆에 배치 */}
                    <div className="flex items-center space-x-2 text-gray-400">
                      <p>{new Date(review.createdAt).toLocaleDateString()}</p>
                      {user && user.id === review.user.id && (
                        <div className="flex space-x-2">
                          <button
                            type="button"
                            className="text-[#9FA6B2] hover:underline"
                            onClick={() => handleEditReview(review)}
                          >
                            수정
                          </button>
                          <button
                            type="button"
                            className="text-[#9FA6B2] hover:underline"
                            onClick={() => handleDeleteReview(review.id)}
                          >
                            삭제
                          </button>
                        </div>
                      )}
                    </div>
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
