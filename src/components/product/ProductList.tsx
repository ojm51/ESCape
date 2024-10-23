import { PropsWithChildren } from 'react'
import { ProductTypes } from '@/dtos/ProductDto'
import ThemeCard from '../@shared/themeCard/ThemeCard'

interface ProductListProps {
  productList: ProductTypes[] | null
}

export default function ProductList({ children, productList }: PropsWithChildren<ProductListProps>) {
  return (
    <section className="flex flex-col gap-[30px]">
      <div className="text-2xl font-semibold">{children}</div>
      <div className="grid grid-cols-2 gap-[15px] md:grid-cols-3 xl:min-w-[940px] xl:gap-5">
        {productList &&
          productList.length > 0 &&
          productList
            .slice(0, 6)
            .map((product) => <ThemeCard key={product.id} data={product} productId={product.id} />)}
      </div>
    </section>
  )
}
