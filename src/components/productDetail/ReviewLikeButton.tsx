import React, { useState } from 'react'
import axios from 'axios'
import { FaThumbsUp } from 'react-icons/fa'

interface ReviewLikeButtonProps {
  reviewId: number
  productId: number
  teamId: string
  initialIsLiked: boolean
  initialLikeCount: number
}

const ReviewLikeButton: React.FC<ReviewLikeButtonProps> = ({
  reviewId,
  productId,
  teamId,
  initialIsLiked,
  initialLikeCount,
}) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked)
  const [likeCount, setLikeCount] = useState(initialLikeCount)

  const handleLikeToggle = async () => {
    try {
      if (isLiked) {
        // 좋아요 해제 (DELETE 요청)
        await axios.delete(
          `https://mogazoa-api.vercel.app/${teamId}/products/${productId}/reviews/${reviewId}/favorite`,
        )
        setLikeCount((prevCount) => prevCount - 1)
      } else {
        // 좋아요 추가 (POST 요청)
        await axios.post(`https://mogazoa-api.vercel.app/${teamId}/products/${productId}/reviews/${reviewId}/favorite`)
        setLikeCount((prevCount) => prevCount + 1)
      }
      setIsLiked((prevIsLiked) => !prevIsLiked) // 상태 토글
    } catch (error) {
      console.error('좋아요 처리 중 오류가 발생했습니다.', error)
    }
  }

  return (
    <div className="flex cursor-pointer items-center space-x-1" onClick={handleLikeToggle}>
      <FaThumbsUp className={isLiked ? 'text-blue-500' : 'text-gray-400'} />
      <span className={isLiked ? 'font-semibold text-blue-500' : 'font-semibold text-gray-400'}>{likeCount}</span>
    </div>
  )
}

export default ReviewLikeButton
