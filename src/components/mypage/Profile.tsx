import Image from 'next/image'
import React from 'react'
import defaultImage from '@images/default_image.png'
import PrimaryButton from '../@shared/button/PrimaryButton'
import TertiaryButton from '../@shared/button/TertiaryButton'
import { UserTypes } from '@/dtos/UserDto'

interface ProfileProps {
  data: UserTypes,
}

export default function Profile({ data }: ProfileProps) {
  // TertiaryButton을 위한 임시 onClick 함수
  const temp = () => {
    return
  }

  const { image, nickname, description, followersCount, followeesCount } = data;
  const profileImage = !!image ? image : defaultImage;

  return (
    <div className="flex w-full flex-col content-center items-center gap-[30px] rounded-xl border-unactive bg-[#252530] px-5 py-[30px] xl:w-[340px]">
      <Image className="rounded-full" src={profileImage} alt="프로필 이미지" width={120} height={120} />
      <div className="flex w-full flex-col gap-[10px]">
        <h3 className="text-center text-xl font-semibold leading-7 text-brand-white">{nickname}</h3>
        <p className="text-sm font-normal leading-tight text-brand-gray-dark">{description}</p>
      </div>

      <div className="flex w-full content-between items-center">
        <button className="flex w-full flex-col content-center items-center gap-[10px] border-r border-r-unactive">
          <h4 className="text-center text-lg font-semibold text-brand-white">{followersCount}</h4>
          <p className="text-center text-sm font-normal text-brand-gray-light">팔로워</p>
        </button>
        <button className="flex w-full flex-col content-center items-center gap-[10px]">
          <h4 className="text-center text-lg font-semibold text-brand-white">{followeesCount}</h4>
          <p className="text-center text-sm font-normal text-brand-gray-light">팔로잉</p>
        </button>
      </div>

      <div className="flex w-full flex-col gap-[10px]">
        <PrimaryButton type='button' active={true}>프로필 편집</PrimaryButton>
        <TertiaryButton active={true} onClick={temp}>
          로그아웃
        </TertiaryButton>
      </div>
    </div>
  )
}
