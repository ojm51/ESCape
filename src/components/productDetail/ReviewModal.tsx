import React, { useEffect, useState } from 'react'
import Modal from '@/components/@shared/modal/Modal'
import { FaStar } from 'react-icons/fa'
import { createReview, updateReview } from '@/libs/axios/product/reviewApi'
import axios from 'axios' // 이미지 업로드를 위한 axios
import DefaultImage from '@images/default-image.png' // 기본 이미지 import
import { IoMdCloseCircle } from 'react-icons/io' // X 버튼 아이콘

interface ReviewModalProps {
  isOpen: boolean
  onClose: () => void
  productName: string
  productId: number
  isEdit?: boolean // 리뷰 수정 모드 여부
  initialReviewData?: { rating: number; content: string; images: string[]; reviewId?: number } // 수정 모드 시 초기 데이터
}

const MAX_CHAR_COUNT = 500
const MAX_IMAGE_COUNT = 3 // 최대 이미지 개수 설정

const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  productName,
  productId,
  isEdit = false,
  initialReviewData = { rating: 0, content: '', images: [] },
}) => {
  const [rating, setRating] = useState<number>(initialReviewData.rating)
  const [reviewText, setReviewText] = useState<string>(initialReviewData.content)
  const [imageFiles, setImageFiles] = useState<File[]>([]) // 여러 이미지 파일을 배열로 관리
  const [loading, setLoading] = useState<boolean>(false)
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>(initialReviewData.images || []) // 업로드된 이미지 URL 배열

  useEffect(() => {
    if (isEdit) {
      setRating(initialReviewData.rating)
      setReviewText(initialReviewData.content)
      setUploadedImageUrls(initialReviewData.images) // 기존 이미지 URL 설정
    }
  }, [isEdit, initialReviewData])

  const handleRatingClick = (value: number) => setRating(value)

  const handleReviewTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= MAX_CHAR_COUNT) {
      setReviewText(e.target.value)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      if (imageFiles.length + newFiles.length <= MAX_IMAGE_COUNT) {
        setImageFiles([...imageFiles, ...newFiles]) // 이미지 파일 추가
      } else {
        alert(`이미지는 최대 ${MAX_IMAGE_COUNT}개까지만 업로드할 수 있습니다.`)
      }
    }
  }

  // 이미지 삭제 핸들러
  const handleImageRemove = (index: number) => {
    setImageFiles(imageFiles.filter((_, i) => i !== index)) // 해당 인덱스 이미지 파일 제거
    setUploadedImageUrls(uploadedImageUrls.filter((_, i) => i !== index)) // URL 배열에서도 제거
  }

  // 이미지 업로드 요청
  const uploadImages = async (): Promise<string[]> => {
    if (imageFiles.length === 0) return []

    try {
      const uploadedUrls: string[] = []
      for (const file of imageFiles) {
        const formData = new FormData()
        formData.append('image', file)
        const response = await axios.post(`/images/upload`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        uploadedUrls.push(response.data.imageUrl)
      }
      return uploadedUrls
    } catch (error) {
      console.error('이미지 업로드 실패:', error)
      alert('이미지 업로드에 실패했습니다.')
      return []
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      let imageUrls = uploadedImageUrls

      // 이미지 파일이 새로 업로드되면 먼저 업로드 처리
      if (imageFiles.length > 0) {
        const uploadedUrls = await uploadImages()
        if (uploadedUrls.length > 0) {
          imageUrls = [...uploadedImageUrls, ...uploadedUrls]
        } else {
          setLoading(false)
          return // 업로드 실패 시 처리 중단
        }
      }

      if (isEdit && initialReviewData.reviewId) {
        // 수정 요청
        await updateReview(initialReviewData.reviewId, {
          images: imageUrls.join(','), // 이미지 URL을 ','로 연결해 전송
          content: reviewText,
          rating,
        })
        alert('리뷰가 성공적으로 수정되었습니다.')
      } else {
        // 생성 요청
        await createReview({
          productId,
          images: imageUrls.join(','), // 이미지 URL을 ','로 연결해 전송
          content: reviewText,
          rating,
        })
        alert('리뷰가 성공적으로 등록되었습니다.')
      }
      onClose()
    } catch (error) {
      console.error(isEdit ? '리뷰 수정 실패:' : '리뷰 등록 실패:', error)
      alert(isEdit ? '리뷰 수정에 실패했습니다.' : '리뷰 등록에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <Modal onClick={onClose}>
      <div className="space-y-6">
        {/* 상품 이름 */}
        <h2 className="text-2xl font-semibold text-white">{productName}</h2>

        {/* 별점 입력 */}
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              size={24}
              className={star <= rating ? 'text-yellow-400' : 'text-gray-400'}
              onClick={() => handleRatingClick(star)}
              cursor="pointer"
            />
          ))}
        </div>

        {/* 리뷰 작성 칸 */}
        <div
          className="flex flex-col"
          style={{
            width: '540px',
            gap: '20px',
          }}
        >
          <div className="relative rounded-lg bg-[#252530]">
            <textarea
              value={reviewText}
              onChange={handleReviewTextChange}
              className="w-full rounded-lg border border-gray-600 bg-transparent p-3"
              rows={5}
              placeholder="리뷰를 작성해 주세요"
            />
            <p className="absolute bottom-2 right-3 text-sm text-[#6E6E82]">
              {reviewText.length}/{MAX_CHAR_COUNT}
            </p>
          </div>

          {/* 이미지 파일 업로드 */}
          <div className="flex items-center space-x-2">
            {/* 기본 이미지 업로드 버튼 */}
            {imageFiles.length < MAX_IMAGE_COUNT && (
              <div onClick={() => document.getElementById('imageUpload')?.click()} className="relative cursor-pointer">
                <div className="relative h-40 w-40">
                  <img src={DefaultImage.src} alt="Default Image" className="h-40 w-40 rounded-md object-cover" />
                </div>
              </div>
            )}

            {/* 업로드된 이미지 미리보기 */}
            {imageFiles.map((file, index) => (
              <div key={index} className="relative h-40 w-40">
                <img
                  src={URL.createObjectURL(file)}
                  alt="Uploaded Image"
                  className="h-40 w-40 rounded-md object-cover"
                />
                {/* X 버튼 (이미지 삭제 버튼) */}
                <button className="absolute right-2 top-2" onClick={() => handleImageRemove(index)}>
                  <IoMdCloseCircle size={24} className="text-white" />
                </button>
              </div>
            ))}
          </div>

          {/* 파일 선택 input */}
          <input
            type="file"
            accept="image/*"
            id="imageUpload"
            onChange={handleImageChange}
            className="hidden"
            multiple
          />
        </div>

        {/* 제출 버튼 */}
        <button
          onClick={handleSubmit}
          className="w-full rounded-lg bg-blue-500 p-3 text-white hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? '처리 중...' : isEdit ? '수정하기' : '작성하기'}
        </button>
      </div>
    </Modal>
  )
}

export default ReviewModal
