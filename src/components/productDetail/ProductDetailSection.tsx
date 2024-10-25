import Image from 'next/image'
import { useEffect, useState } from 'react'
import FeatureTag from './FeatureTag'
import { IoChatbubbleSharp } from 'react-icons/io5'
import { IoMdShare } from 'react-icons/io'
import CustomButton from '../@shared/button/CustomButton'
import axios from 'axios'
import FavoriteButton from './FavoriteButton'
import { ProductDetailTypes } from '@/dtos/ProductDto'

const EscapeDetailSection: React.FC<{ productId: number; teamId: string }> = ({ productId, teamId }) => {
  const [productDetail, setProductDetail] = useState<ProductDetailTypes | null>(null)

  useEffect(() => {
    // productId와 teamId로 제품 세부 정보를 불러오기
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`/api/product/${productId}?teamId=${teamId}`)
        setProductDetail(response.data)
      } catch (error) {
        console.error('제품 세부 정보 불러오기에 실패했습니다:', error)
      }
    }
    fetchProductDetails()
  }, [productId, teamId])

  const handleShareClick = () => {
    const shareUrl = window.location.href
    navigator.clipboard.writeText(shareUrl)
    alert('링크가 클립보드에 복사되었습니다.')
  }

  const handleReviewClick = () => {
    alert('리뷰 작성 모달이 나타납니다.')
  }

  const handleKakaoShare = () => {
    alert('카카오톡 공유 기능이 호출되었습니다.')
    // 카카오톡 공유 기능 구현
  }

  if (!productDetail) return <div>Loading...</div>

  return (
    <div className="mx-auto flex max-w-[940px] flex-col rounded-md pt-6 text-white lg:flex-row">
      <div className="mb-4 flex-shrink-0 lg:mb-0 lg:mr-6">
        <Image src={productDetail.image} alt={productDetail.name} className="h-48 w-48 rounded-md object-fill" />
      </div>

      {/* Escape 정보 */}
      <div className="flex w-full flex-col justify-between">
        {/* Escape 제목 및 찜하기 버튼 */}
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center">
            <h2 className="text-2xl font-bold">{productDetail.name}</h2>
            <FavoriteButton productId={productId} teamId={teamId.toString()} isFavorite={productDetail.isFavorite} />
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleKakaoShare}
              className="flex items-center justify-center rounded-lg border-unactive bg-[#252530] p-2 text-[#6E6E82] hover:bg-[#252530] hover:text-white"
            >
              <IoChatbubbleSharp size={24} />
            </button>
            <button
              onClick={handleShareClick}
              className="flex items-center justify-center rounded-lg border-unactive bg-[#252530] p-2 text-[#6E6E82] hover:bg-[#252530] hover:text-white"
            >
              <IoMdShare size={24} />
            </button>
          </div>
        </div>

        {/* Escape 위치 */}
        <p className="mb-2 text-lg text-[#A0A0A0]">{`${productDetail.description.loc} ${productDetail.description.spot}`}</p>

        {/* Escape 설명 */}
        <div className="mb-4">
          <p className="text-white">{productDetail.description.des}</p>
        </div>

        {/* FeatureTags */}
        <div className="mb-4 flex flex-wrap gap-4">
          <FeatureTag label="난이도" value={productDetail.description.lev} isStarRating={true} />
          <FeatureTag label="시간" value={`${productDetail.description.time} min`} />
          <FeatureTag label="공포도" value={productDetail.description.hor} isStarRating={true} />
          <FeatureTag label="활동성" value={productDetail.description.act} isStarRating={true} />
        </div>

        {/* 버튼들 */}
        <div className="flex space-x-4">
          <CustomButton active={true} onClick={handleReviewClick} style="primary">
            리뷰 작성하기
          </CustomButton>
          <CustomButton active={true} onClick={() => alert('예약하기 클릭')} style="secondary">
            예약하기
          </CustomButton>
        </div>
      </div>
    </div>
  )
}

export default EscapeDetailSection
