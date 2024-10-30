import { GetServerSideProps } from 'next'
import ProductDetailSection from '@/components/productDetail/detail/ProductDetailSection'
import ProductStatisticsSection from '@/components/productDetail/statistic/ProductStatisticsSection'
import ProductReviewSection from '@/components/productDetail/review/ProductReviewSection'

interface ProductDetailPageProps {
  productId: number
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId }) => {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-5">
        <ProductDetailSection productId={productId} />
      </div>

      <div className="mb-5">
        <ProductStatisticsSection productId={productId} />
      </div>

      <div>
        <ProductReviewSection productId={productId} />
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { id } = context.query

  const productId = parseInt(id as string, 10)

  return {
    props: {
      productId,
    },
  }
}

export default ProductDetailPage
