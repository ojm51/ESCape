export interface BoardData {
  totalCount: number;
  articleList: Article[];
}

export interface Article {
  id: number;
  title: string;
  writer: {
    id: number;
    nickname: string;
  }
  likeCount: number;
  image: string;
  createdAt: string;
  updatedAt: string;
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