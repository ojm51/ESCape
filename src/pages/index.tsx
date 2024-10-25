import React from 'react'
import ProductReviewList from '@/components/productDetail/ProductReviewList'
import ProductDetailSection from '@/components/productDetail/ProductDetailSection'

const HomePage: React.FC = () => {
  const productId = 1064 // 예시로 사용할 productId
  const teamId = '8-5' // 고정된 teamId

  return (
    <div>
      <ProductDetailSection productId={productId} teamId={teamId} />
    </div>
  )
}

export default HomePage
