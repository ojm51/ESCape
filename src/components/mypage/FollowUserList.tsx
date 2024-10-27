import React from 'react'
import FollowUser from './FollowUser'
import { FollowListTypes } from '@/dtos/UserDto'

interface FollowUserListProps {
  type: string
  name: string
  title: string
  followUserList: FollowListTypes[] | undefined
  nextCursor?: number
}

export default function FollowUserList({ type, name, title, followUserList, nextCursor }: FollowUserListProps) {
  return (
    <div>
      <h3 className="mb-5 text-xl font-semibold leading-7 md:mb-8 xl:text-2xl">
        {name}님{title}하는 유저
      </h3>
      {followUserList && followUserList.length > 0 ? (
        <div className="flex flex-col content-center items-start gap-5">
          {followUserList.map((followUser) => (
            <FollowUser
              key={followUser.id}
              followUserData={type === 'follower' ? followUser.follower! : followUser.followee!}
            />
          ))}
        </div>
      ) : (
        <p className="font-normal text-brand-gray-dark">아직 없습니다</p>
      )}
    </div>
  )
}
