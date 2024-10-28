import {ChangeEvent} from "react";

interface DetailPostCommentSectionProps {
  comment: string | undefined;
  commentError: string | null;
  setComment: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  type?: string;
  value: string;
}

export default function DetailPostCommentSection({ comment, commentError, setComment, type, value }: DetailPostCommentSectionProps) {

  return (
    <div className={`${type === "modal" ? "pb-[24px] md:pb-[104px]" : "border-b-[1px] border-solid border-brand-black-light pb-[104px]" } relative`}>
      <h2 className="font-bold text-[20px] text-brand-white leading-6">
        {value}
      </h2>
      <div className="relative">
        <textarea
          placeholder="댓글을 입력해주세요."
          className={`${commentError === null ? "" : "border-red-500"} h-[180px] bg-brand-black-medium w-full rounded-xl border-[1px] border-solid border-brand-black-light py-4 px-6 text-brand-white mt-6`}
          value={comment}
          onChange={setComment}
          maxLength={300}
        />
        <p className="absolute bottom-4 right-4 text-brand-white">
          {comment?.length} / 300
        </p>
      </div>
      {commentError && <p className="mt-4 ml-4 text-red-500">{commentError}</p>}
      <button type="submit" className={`${type === "modal" ? "w-full" : "w-[184px]"} absolute right-0 h-12 rounded-xl py-[14px] shadow-xl font-semibold text-[16px] leading-[19px] bg-gradation text-brand-white mt-4`}>
        등록
      </button>
    </div>
  )
}