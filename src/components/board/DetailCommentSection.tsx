import {ArticleComment} from "@/dtos/ArticleDto";
import CommentCard from "@/components/board/CommentCard";

export interface DetailCommentProps {
  data?: ArticleComment[];
}

export default function DetailCommentSection({ data }: DetailCommentProps) {
  return (
    <div className="my-10">
      <div className="flex flex-col gap-4">
        {data && data.length > 0 ? (
          data?.map((data) =>(
            <CommentCard key={data.id} data={data} />
          ))
        ) : (
          // 임시 예외 처리
          <div className="text-brand-white">내용이 없습니다.</div>
        )}
      </div>
    </div>
  )
}