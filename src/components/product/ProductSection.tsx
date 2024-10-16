import { PropsWithChildren } from "react";
import ProductCard from "./ProductCard";

interface ProductSectionProps {
  productList: ProductListType[];
}

export default function ProductSection({
  children,
  productList,
}: PropsWithChildren<ProductSectionProps>) {
  return (
    <section className="flex flex-col gap-[30px]">
      <div className="text-2xl font-semibold">{children}</div>
      <div className="grid grid-cols-2 md:grid-cols-3">
        {productList.length > 0 &&
          productList.map((product) => <ProductCard product={product} />)}
      </div>
    </section>
  );
}
