export interface BoardData {
  totalCount: number;
  list: Article[];
}

export interface Article {
  updatedAt: string,
  createdAt: string,
  likeCount: number,
  writer: {
    nickname: string,
    id: number,
  }
  image: string,
  title: string,
  id: number,
}

export interface ArticleDetail extends Article {
  commentCount: number,
  isLiked: boolean,
  content: string,
}

export interface CommentData {
  nextCursor: number;
  list: ArticleComment[];
}

export interface ArticleComment {
  writer: {
    image: string,
    nickname: string,
    id: number,
  },
  updatedAt: string,
  createdAt: string,
  content: string,
  id: number,
}