import React, { useEffect, useState } from 'react'
import axios from 'axios'
import starIcon from '@icons/star_icon.svg'
import commentIcon from '@icons/comment_icon.svg'
import heartIcon from '@icons/heart_icon.svg'
import StatisticsDetail from './StatisticsDetail'
import { ProductDetailTypes } from '@/dtos/ProductDto'

interface StatisticsProps {
  teamId: string
  productId: number
}

const ProductStatisticsSection: React.FC<StatisticsProps> = ({ teamId, productId }) => {
  const [productData, setProductData] = useState<ProductDetailTypes | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://mogazoa-api.vercel.app/${teamId}/products/${productId}`)
        setProductData(response.data) // ProductDetailTypes에 맞는 데이터를 받아옴
      } catch (error) {
        console.error('상품 데이터를 가져오는 중 오류 발생:', error)
      }
    }

    fetchData()
  }, [teamId, productId])

  if (!productData) {
    return <div>로딩 중...</div>
  }

  const { rating, favoriteCount, reviewCount, categoryMetric } = productData

  const statisticsDetailContents = [
    {
      title: '별점 평균',
      icon: starIcon,
      value: parseFloat(rating.toFixed(2)), // 소수점 둘째 자리에서 반올림
      difference: parseFloat((rating - categoryMetric.rating).toFixed(2)), // 차이 값 반올림
      description: (
        <>
          {'같은 카테고리의 제품들보다'}
          <br />
          {rating > categoryMetric.rating
            ? `${Math.abs(parseFloat((rating - categoryMetric.rating).toFixed(2)))}점 높아요!`
            : `${Math.abs(parseFloat((rating - categoryMetric.rating).toFixed(2)))}점 낮아요!`}
        </>
      ),
    },
    {
      title: '찜 수',
      icon: heartIcon,
      value: parseFloat(favoriteCount.toFixed(0)),
      difference: parseFloat((favoriteCount - categoryMetric.favoriteCount).toFixed(0)), // 차이 값 반올림
      description: (
        <>
          {'같은 카테고리의 제품들보다'}
          <br />
          {favoriteCount > categoryMetric.favoriteCount
            ? `${Math.abs(parseFloat((favoriteCount - categoryMetric.favoriteCount).toFixed(0)))}개 더 많아요!`
            : `${Math.abs(parseFloat((favoriteCount - categoryMetric.favoriteCount).toFixed(0)))}개 더 적어요!`}
        </>
      ),
    },
    {
      title: '리뷰 수',
      icon: commentIcon,
      value: parseFloat(reviewCount.toFixed(0)),
      difference: parseFloat((reviewCount - categoryMetric.reviewCount).toFixed(0)), // 차이 값 반올림
      description: (
        <>
          {'같은  카테고리의 제품들보다'}
          <br />
          {reviewCount > categoryMetric.reviewCount
            ? `${Math.abs(parseFloat((reviewCount - categoryMetric.reviewCount).toFixed(0)))}개 더 많아요!`
            : `${Math.abs(parseFloat((reviewCount - categoryMetric.reviewCount).toFixed(0)))}개 더 적어요!`}
        </>
      ),
    },
  ]

  return (
    <div className={'mx-auto mb-10 max-w-[940px]'}>
      {' '}
      <h3 className={'mb-[30px] text-lg font-semibold'}>{'상품 통계'}</h3>
      <div className={'grid grid-cols-3 gap-[10px] xl:gap-5'}>
        {statisticsDetailContents.map((statisticsDetailContent) => (
          <StatisticsDetail
            key={statisticsDetailContent.title}
            title={statisticsDetailContent.title}
            icon={statisticsDetailContent.icon}
            value={statisticsDetailContent.value}
            description={statisticsDetailContent.description}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductStatisticsSection
