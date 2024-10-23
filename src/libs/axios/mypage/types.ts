export interface UpdateMyInfoParams {
  description: string
  nickname: string
  image: string
}

export interface GetUserInfoParams {
  userId: string | number
}

export interface GetUserProductsParams {
  userId: string | number
  type: string
}

export interface GetUserFollowsParams {
  userId: string | number
  type: string
}
