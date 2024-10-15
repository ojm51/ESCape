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
    <div className="flex flex-col">
      {productList.length > 0 &&
        productList.map((product) => <ProductCard product={product} />)}
    </div>
  );
}
