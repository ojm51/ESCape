import React from 'react'
import FollowUser from './FollowUser'
import { FollowListTypes } from '@/dtos/UserDto'

interface FollowUserListProps {
  name: string
  title: string
  followData: FollowListTypes[] | undefined
  nextCursor?: number
}

export default function FollowUserList({ name, title, followData, nextCursor }: FollowUserListProps) {
  return (
    <div>
      <h3 className="mb-5 text-xl font-semibold leading-7 md:mb-8 xl:text-2xl">
        {name}님{title}하는 유저
      </h3>
      {followData && followData.length > 0 ? (
        <div className="flex flex-col content-center items-start gap-5">
          {followData.map((follow) => (
            <FollowUser key={follow.id} data={follow.follow} />
          ))}
        </div>
      ) : (
        <p className="font-normal text-brand-gray-dark">아직 아무도 없습니다</p>
      )}
    </div>
  )
}
