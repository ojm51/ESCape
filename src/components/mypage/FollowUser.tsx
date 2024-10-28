import React from 'react'
import Image from 'next/image'
import defaultProfileImage from '@images/user_default.svg'
import { FollowTypes } from '@/dtos/UserDto'
import Link from 'next/link'

interface FollowUserProps {
  followUserData: FollowTypes
}

export default function FollowUser({ followUserData }: FollowUserProps) {
  const { id, image, nickname } = followUserData || {}

  const profileImage = typeof image === 'string' && image ? image : defaultProfileImage

  return (
    <Link className="flex content-start items-center gap-5" href={`/user/${id}`}>
      <Image className="xl:w-[52px]" src={profileImage} alt="프로필 이미지" width={48} height={48} />
      <p className="text-base font-medium xl:text-lg">{nickname}</p>
    </Link>
  )
}
