import Dropdown from "@/components/@shared/DropDown";
import Image from "next/image";
import KebabIcon from "../../../public/icons/kebab_icon.svg";
import {ArticleComment} from "@/dtos/ArticleDto";
import CommentCard from "@/components/board/CommentCard";

export interface DetailCommentProps {
  data?: ArticleComment;
}

export default function DetailCommentSection({ data }: DetailCommentProps) {
  return (
    <div className="mt-10">
      <div className="flex flex-col gap-4">
        <CommentCard />
      </div>
    </div>
  )
}