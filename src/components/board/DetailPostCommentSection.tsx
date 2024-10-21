import {ChangeEvent} from "react";

interface DetailPostCommentSectionProps {
  comment: string;
  setComment: (value: string) => void;
}

export default function DetailPostCommentSection({ comment, setComment }: DetailPostCommentSectionProps) {

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  return (
    <div className="relative pb-[104px] border-b-[1px] border-solid border-brand-black-light">
      <h2 className="font-bold text-[20px] text-brand-white leading-6">
        댓글달기
      </h2>
      <div className="relative">
        <textarea
          placeholder="댓글을 입력해주세요."
          className="h-[180px] bg-brand-black-medium w-full rounded-xl border-[1px] border-solid border-brand-black-light py-4 px-6 text-brand-white mt-6"
          value={comment}
          onChange={handleChange}
          maxLength={300}
        />
        <p className="absolute bottom-4 right-4 text-brand-white">
          {comment.length} / 300
        </p>
      </div>
      <button
        className="absolute right-0 w-[184px] h-12 rounded-xl py-[14px] shadow-xl font-semibold text-[16px] leading-[19px] bg-gradation text-brand-white mt-4">
        등록
      </button>
    </div>
  )
}