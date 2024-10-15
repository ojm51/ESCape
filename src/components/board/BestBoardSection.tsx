import BestBoardCard from "@/components/board/BestBoardCard";

export default function BestBoardSection() {
  return (
    <>
      <div className="flex justify-between items-center mt-10">
        <h2 className="font-bold text-[20px] leading-6 text-brand-white">
          베스트 게시글
        </h2>
        <button className="font-normal text-[14px] leading-[17px] text-brand-gray-dark">
          더보기 {'>'}
        </button>
      </div>
      <div className="relative py-10 border-b-[1px] border-solid border-brand-black-light grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        <BestBoardCard />
        <BestBoardCard />
        <BestBoardCard />
      </div>
    </>
  )
}