import React from 'react'
import FollowUser from './FollowUser'
import { FollowListTypes } from '@/dtos/UserDto'

interface FollowUserListProps {
  name: string
  title: string
  followUserData: FollowListTypes[] | undefined
  nextCursor?: number
}

export default function FollowUserList({ name, title, followUserData, nextCursor }: FollowUserListProps) {
  return (
    <div>
      <h3 className="mb-5 text-xl font-semibold leading-7 md:mb-8 xl:text-2xl">
        {name}님{title}하는 유저
      </h3>
      {followUserData && followUserData.length > 0 ? (
        <div className="flex flex-col content-center items-start gap-5">
          {followUserData.map((followUser) => (
            <FollowUser key={followUser.id} followUserData={followUser.follow} />
          ))}
        </div>
      ) : (
        <p className="font-normal text-brand-gray-dark">아직 없습니다</p>
      )}
    </div>
  )
}
