import Axios from "axios";
import {CommentFormData} from "@/dtos/ArticleDto";

const Base_URL = process.env.NEXT_PUBLIC_BOARD_API_URL;

interface postCommentsProps {
  id: string | string[] | undefined;
  comment: CommentFormData;
}

export async function postComments({id, comment}: postCommentsProps) {
  const url = `${Base_URL}/articles/${id}/comments`;
  const responses = await Axios.post(
    url,
    comment,
    {
      headers: {
        "Content-Type": "application/json"
      },
    },
  );
  return responses.data
}