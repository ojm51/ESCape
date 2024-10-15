export default function HeaderSection() {
  return (
    <div className="flex justify-between items-center pb-6 border-b-[1px] border-solid border-brand-black-light">
      <h1 className="font-bold text-[24px] text-brand-white leading-6">
        게시글 쓰기
      </h1>
      <button className="w-[184px] h-12 rounded-xl py-[14px] shadow-xl font-semibold text-[16px] leading-[19px] bg-gradation text-brand-white">
        등록
      </button>
    </div>
  )
}