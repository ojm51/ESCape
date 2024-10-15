import ProductSection from "./ProductSection";

export default function ProductMain() {
  return (
    <div className="flex flex-col">
      <ProductSection productList={[]}>
        <span>지금 핫한 상품 TOP 6</span>
      </ProductSection>
      <ProductSection productList={[]}>
        <span>별점이 높은 상품</span>
      </ProductSection>
    </div>
  );
}
