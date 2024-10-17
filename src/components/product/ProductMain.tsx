import ProductList from "./ProductList";

export default function ProductMain() {
  return (
    <div className="flex flex-col w-full  xl:pt-[60px] xl:max-w-[940px] bg-slate-700">
      <ProductList productList={[]}>
        <div>
          지금 핫한 테마
          <span className="bg-gradation bg-clip-text text-transparent">
            TOP 6
          </span>
        </div>
      </ProductList>
      <ProductList productList={[]}>
        <div>별점이 높은 테마</div>
      </ProductList>
    </div>
  );
}
