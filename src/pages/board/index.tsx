import SearchSection from "@/components/board/SearchSection";
import BestBoardSection from "@/components/board/BestBoardSection";
import BoardSection from "@/components/board/BoardSection";
import AddBoardButton from "@/components/board/AddBoardButton";

export default function BoardsPage() {
  return (
      <div className="mx-4 md:6 xl:mx-auto xl:w-[1200px] py-[100px]">
        <SearchSection />
        <BestBoardSection />
        <BoardSection />
        <AddBoardButton />
      </div>
  );
}
