import { GetServerSideProps } from 'next'
import ProductDetailSection from '@/components/productDetail/detail/ProductDetailSection'
import ProductStatisticsSection from '@/components/productDetail/statistic/ProductStatisticsSection'
import ProductReviewSection from '@/components/productDetail/review/ProductReviewSection'

interface ProductDetailPageProps {
  productId: number
  teamId: string
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId, teamId }) => {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-5">
        <ProductDetailSection productId={productId} teamId={teamId} />
      </div>

      <div className="mb-5">
        <ProductStatisticsSection productId={productId} teamId={teamId} />
      </div>

      <div>
        <ProductReviewSection productId={productId} teamId={teamId} />
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query

  const productId = parseInt(id as string, 10)
  const teamId = '8-5'

  return {
    props: {
      productId,
      teamId,
    },
  }
}

export default ProductDetailPage
