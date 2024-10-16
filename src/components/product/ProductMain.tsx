import ProductSection from "./ProductSection";

export default function ProductMain() {
  return (
    <div className="flex flex-col gap-[60px] max-w-[940px] bg-slate-700">
      <ProductSection productList={[]}>
        <div>
          지금 핫한 상품{" "}
          <span className="bg-gradation bg-clip-text text-transparent">
            TOP 6
          </span>
        </div>
      </ProductSection>
      <ProductSection productList={[]}>
        <div>별점이 높은 상품</div>
      </ProductSection>
    </div>
  );
}
