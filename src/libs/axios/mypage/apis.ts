import { UserTypes } from "@/dtos/UserDto"
import axiosInstance from "../axiosInstance"
import { API_PATH } from "../config/path"

export const getMyInfo = async () => {
  const response = await axiosInstance.get<UserTypes>(API_PATH.user.me);
  return response.data ?? [];
}