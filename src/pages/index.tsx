import React from 'react'
import ProductDetailSection from '@/components/productDetail/detail/ProductDetailSection'

const HomePage: React.FC = () => {
  const productId = 1053 // 예시로 사용할 productId
  const teamId = '8-5' // 고정된 teamId

  return (
    <div>
      <ProductDetailSection productId={productId} teamId={teamId} />
    </div>
  )
}

export default HomePage
