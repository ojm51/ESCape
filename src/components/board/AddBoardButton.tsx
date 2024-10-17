import {useRouter} from "next/router";

export default function AddBoardButton() {
  const router = useRouter();

  const handleAddPage = () => {
    router.push("/addboard");
  }
  return (
    <button onClick={handleAddPage} className="fixed top-[85%] right-[calc((100%-375px)/2)] md:right-[calc((100%-768px)/2)] xl:right-[calc((100%-1200px)/2)] h-12 rounded-[40px] py-[14px] px-[21px] shadow-xl font-semibold text-[16px] leading-[19px] bg-gradation text-brand-white">
      + 글쓰기
    </button>
  )
}