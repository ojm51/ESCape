import React from 'react'
import ProductReviewList from '@/components/productDetail/ProductReviewList'
import ProductStatisticsSection from '@/components/productDetail/ProductStatisticsSection'

const HomePage: React.FC = () => {
  const productId = 1 // 예시로 사용할 productId
  const teamId = '8-5' // 고정된 teamId

  return (
    <div>
      <ProductStatisticsSection productId={productId} teamId={teamId} />
      <ProductReviewList productId={productId} teamId={teamId} />
    </div>
  )
}

export default HomePage
