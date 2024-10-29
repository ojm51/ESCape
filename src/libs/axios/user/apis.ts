import { UserTypes } from '@/dtos/UserDto'
import { API_PATH } from '../config/path'
import axiosInstance from '../axiosInstance'
import { AddFollowParams, DeleteFollowParams } from './types'

export const addFollow = async ({ userId }: AddFollowParams) => {
  const params = { userId }
  const response = await axiosInstance.post<UserTypes>(API_PATH.follow.default, params)
  return response.data ?? []
}

export const deleteFollow = async ({ userId }: DeleteFollowParams) => {
  const params = { userId }
  const response = await axiosInstance.delete<UserTypes>(API_PATH.follow.default, {
    data: params,
  })
  return response.data ?? []
}
