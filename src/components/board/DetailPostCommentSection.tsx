import {ChangeEvent, useState} from "react";

export default function DetailPostCommentSection() {
  const [text, setText] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  return (
    <div className="relative pb-[104px] border-b-[1px] border-solid border-[#353542]">
      <h2 className="font-bold text-[20px] text-[#f1f1f5] leading-6">
        댓글달기
      </h2>
      <div className="relative">
        <textarea
          placeholder="댓글을 입력해주세요."
          className="h-[180px] bg-[#252530] w-full rounded-xl border-[1px] border-solid border-[#353542] py-4 px-6 text-[#f1f1f5] mt-6"
          value={text}
          onChange={handleChange}
          maxLength={299}
        />
        <p className="absolute bottom-4 right-4 text-[#f1f1f5]">
          {text.length} / 300
        </p>
      </div>
      <button
        className="absolute right-0 w-[184px] h-12 rounded-xl py-[14px] shadow-xl font-semibold text-[16px] leading-[19px] bg-[#5363ff] text-[#f1f1f5] mt-4">
        등록
      </button>
    </div>
  )
}