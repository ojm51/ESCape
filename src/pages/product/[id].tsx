import { GetServerSideProps } from 'next'
import ProductDetailSection from '@/components/productDetail/detail/ProductDetailSection'
import ProductStatisticsSection from '@/components/productDetail/statistic/ProductStatisticsSection'
import ProductReviewSection from '@/components/productDetail/review/ProductReviewSection'
import { useQuery } from '@tanstack/react-query'
import { fetchProductDetails } from '@/libs/axios/product/productApi'
import { fetchReviews } from '@/libs/axios/product/reviewApi'
import { ProductDetailTypes, ProductReviewListTypes } from '@/dtos/ProductDto'
import { Spinner } from 'flowbite-react'

interface ProductDetailPageProps {
  productId: number
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId }) => {
  const {
    data: detailData,
    isLoading: isDetailLoading,
    error: detailError,
  } = useQuery<ProductDetailTypes>({
    queryKey: ['productDetail', productId],
    queryFn: () => fetchProductDetails(productId),
  })

  const {
    data: reviews = [],
    isLoading: isReviewsLoading,
    error: reviewsError,
    refetch: refetchReviews,
  } = useQuery<ProductReviewListTypes[]>({
    queryKey: ['reviews', productId, 'recent'],
    queryFn: () => fetchReviews(productId, 'recent'),
  })

  if (isDetailLoading || isReviewsLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="xl" aria-label="Loading" />
      </div>
    )
  }

  if (detailError) return <div>상품 데이터를 가져오는 중 오류 발생: {(detailError as Error).message}</div>
  if (reviewsError) return <div>리뷰 데이터를 가져오는 중 오류 발생: {(reviewsError as Error).message}</div>
  if (!detailData) return null

  return (
    <div className="container mx-auto p-4">
      <div className="mb-5">
        <ProductDetailSection productId={productId} detailData={detailData} />
      </div>

      <div className="mb-5">
        <ProductStatisticsSection productData={detailData} />
      </div>

      <div>
        <ProductReviewSection productId={productId} reviews={reviews} refetchReviews={refetchReviews} />
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
