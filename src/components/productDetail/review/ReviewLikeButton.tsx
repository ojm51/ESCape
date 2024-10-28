import React, { useState } from 'react'
import { FaThumbsUp } from 'react-icons/fa'
import { useRouter } from 'next/router'
import { useAuth } from '@/contexts/AuthProvider'
import { addReviewLike, removeReviewLike } from '@/libs/axios/product/reviewApi'

interface ReviewLikeButtonProps {
  reviewId: number
  initialIsLiked: boolean
  initialLikeCount: number
}

const ReviewLikeButton: React.FC<ReviewLikeButtonProps> = ({ reviewId, initialIsLiked, initialLikeCount }) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked)
  const [likeCount, setLikeCount] = useState(initialLikeCount)
  const { user, isPending } = useAuth()
  const router = useRouter()

  const handleLikeToggle = async () => {
    if (!user && !isPending) {
      alert('로그인이 필요합니다.')
      router.push('/signin')
      return
    }

    try {
      if (isLiked) {
        await removeReviewLike(reviewId)
        setLikeCount((prevCount) => prevCount - 1)
      } else {
        await addReviewLike(reviewId)
        setLikeCount((prevCount) => prevCount + 1)
      }
      setIsLiked((prevIsLiked) => !prevIsLiked)
    } catch (error) {
      console.error('좋아요 처리 중 오류가 발생했습니다.', error)
    }
  }

  return (
    <div
      className={`flex cursor-pointer items-center space-x-1 rounded-full border px-3 py-1 ${
        isLiked ? 'border-blue-500 text-blue-500' : 'border-gray-400 text-gray-400'
      }`}
      onClick={handleLikeToggle}
    >
      <FaThumbsUp className={isLiked ? 'text-blue-500' : 'text-gray-400'} />
      <span className={isLiked ? 'font-semibold text-blue-500' : 'font-semibold text-gray-400'}>{likeCount}</span>
    </div>
  )
}

export default ReviewLikeButton
