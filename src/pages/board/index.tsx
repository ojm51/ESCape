import SearchSection from "@/components/board/SearchSection";
import BestBoardSection from "@/components/board/BestBoardSection";
import BoardSection from "@/components/board/BoardSection";
import AddBoardButton from "@/components/board/AddBoardButton";
import {keepPreviousData, useInfiniteQuery, useQuery} from "@tanstack/react-query";
import {getArticles} from "@/libs/axios/board/getArticles";
import {getArticlesByLike} from "@/libs/axios/board/getArticlesByLike";
import React, {useState} from "react";

export default function BoardsPage() {
  const [selectedOption, setSelectedOption] = useState("최신순");
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  }

  // 페이지네이션을 위한 useInfiniteQuery
  // API Responses 로 오는 값들 중 총 리스트 갯수인 totalCount 를 활용
  // 더보기 버튼을 클릭 시 3개씩 불러오도록 설정, 마지막 페이지 이후에는 버튼 비활성화
  const { data: likeArticlesData, fetchNextPage, hasNextPage, isFetchingNextPage} = useInfiniteQuery({
    queryKey: ['likes'],
    queryFn: ({ pageParam }) => getArticlesByLike(pageParam, 3),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const hasMore = lastPage.articleList.length < lastPage.totalCount;
      if (hasMore) {
        return lastPage.articleList.length / 3 + 1;
      }
      return undefined;
    }
  })

  // 받아온 likeArticlesData 의 pages 가 객체 형태이기 때문에 1차원 배열로 변경
  const likesList = likeArticlesData?.pages?.flatMap(page => page.articleList)

  const handleLoadMore = () => {
    fetchNextPage().catch(() => alert("다음 데이터를 가져오는데 오류가 있습니다."));
  };

  // 검색 및 정렬을 위한 useQuery
  // placeholderData 속성을 활용하여 데이터 수정 시 화면이 깜빡이는 문제 해결
  const { data: articlesData, isLoading, isError } = useQuery({
    queryKey: ['articles', selectedOption, searchValue],
    queryFn: () => getArticles({selectedOption, searchValue}),
    placeholderData: keepPreviousData,
  });

  // 임시 로딩 & 에러 처리
  if (isLoading) return <div className="h-dvh flex justify-center items-center text-brand-white">Loading...</div>;
  if (isError) return <div className="h-dvh flex justify-center items-center text-brand-white">Error!</div>;

  return (
      <div className="mx-4 md:6 xl:mx-auto xl:w-[1200px] py-[100px]">
        <SearchSection onSearchChange={handleSearchChange} />
        <div className={`${searchValue !== "" ? "hidden" : "" }`}>
          <BestBoardSection likes={likesList} onClick={handleLoadMore} disabled={!hasNextPage || isFetchingNextPage} />
        </div>
        <BoardSection articles={articlesData?.articleList} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
        <AddBoardButton />
      </div>
  );
}
