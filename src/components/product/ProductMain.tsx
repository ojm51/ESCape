import useProducts from '@/hooks/useProducts'
import ProductList from './ProductList'

export default function ProductMain() {
  //카테고리 id state만들어서 카테고리 id 보여주거나 undefined일때 홈화면
  const { data: reviewCountData } = useProducts({ order: 'reviewCount' })
  const { data: ratingData } = useProducts({ order: 'rating' })

  const hotProducts = reviewCountData?.list || null
  const ratingProducts = ratingData?.list || null
  return (
    <div className="flex w-full flex-col gap-[60px] xl:max-w-[940px] xl:gap-[80px] xl:pt-[60px]">
      <ProductList productList={hotProducts}>
        <div>
          지금 핫한 테마
          <span className="bg-gradation bg-clip-text text-transparent">TOP 6</span>
        </div>
      </ProductList>
      <ProductList productList={ratingProducts}>
        <div>별점이 높은 테마</div>
      </ProductList>
    </div>
  )
}
