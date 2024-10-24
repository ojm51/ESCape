import Image from 'next/image'
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import defaultImage from '@images/default_image.png'
import Modal from '../@shared/modal/Modal'
import FollowUserList from './FollowUserList'
import CustomButton from '../@shared/button/CustomButton'
import { FollowListTypes, FollowResponseTypes, UserTypes } from '@/dtos/UserDto'
import { getUserFollows } from '@/libs/axios/mypage/apis'
import { useRouter } from 'next/router'
import EditProfile from '../user/EditProfile'

interface ProfileProps {
  data: UserTypes
}

export default function Profile({ data: userData }: ProfileProps) {
  const [followData, setFollowData] = useState<FollowResponseTypes>()
  const [modalType, setModalType] = useState<string>('팔로워')
  const [isFollowModalOpen, setIsFollowModalOpen] = useState<boolean>(false)
  const [isEditProfileModalOpen, setEditProfileModalOpen] = useState<boolean>(false)
  const toggleFollowModal = () => setIsFollowModalOpen((prev) => !prev)
  const toggleEditProfileModal = () => setEditProfileModalOpen((prev) => !prev)

  const { id, image, nickname, description, followersCount, followeesCount, isFollowing } = userData
  const profileImage = !!image ? image : defaultImage

  const { pathname } = useRouter()

  const {
    isPending: isFollowerPending,
    isError: isFollowerError,
    data: followerList,
  } = useQuery({
    queryKey: ['userFollowers'],
    queryFn: () => getUserFollows({ userId: id, type: '팔로워' }),
    enabled: !!id,
  })

  const {
    isPending: isFolloweePending,
    isError: isFolloweeError,
    data: followeeList,
  } = useQuery({
    queryKey: ['userFollowees'],
    queryFn: () => getUserFollows({ userId: id, type: '팔로잉' }),
    enabled: !!id,
  })

  const handleFollowListClick = (type: string) => {
    setModalType(type)
    modalType === '팔로워' ? setFollowData(followerList) : setFollowData(followeeList)
    toggleFollowModal()
  }

  const handleEditProfileButtonClick = () => {
    toggleEditProfileModal()
  }

  // 로그아웃을 위한 임시 onClick 함수
  const temp = () => {
    return
  }

  return (
    <>
      <div className="flex w-full flex-col content-center items-center gap-[30px] rounded-xl border-unactive bg-[#252530] px-5 py-[30px] xl:w-[340px]">
        <Image className="rounded-full" src={profileImage} alt="프로필 이미지" width={120} height={120} />
        <div className="flex w-full flex-col gap-[10px]">
          <h3 className="text-center text-xl font-semibold leading-7 text-brand-white">{nickname}</h3>
          <p className="text-sm font-normal leading-tight text-brand-gray-dark">{description}</p>
        </div>

        <div className="flex w-full content-between items-center">
          <button
            className="flex w-full flex-col content-center items-center gap-[10px]"
            onClick={() => handleFollowListClick('팔로워')}
          >
            <h4 className="text-center text-lg font-semibold text-brand-white">{followersCount}</h4>
            <p className="text-center text-sm font-normal text-brand-gray-light">팔로워</p>
          </button>
          <button
            className="flex w-full flex-col content-center items-center gap-[10px]"
            onClick={() => handleFollowListClick('팔로잉')}
          >
            <h4 className="text-center text-lg font-semibold text-brand-white">{followeesCount}</h4>
            <p className="text-center text-sm font-normal text-brand-gray-light">팔로잉</p>
          </button>
        </div>

        {/** @todo
         * accessToken이 있으면 -> 프로필 편집 & 로그아웃
         * accessToken이 없으면 ->
         *  팔로우 중일 땐 '팔로우 취소'
         *  팔로우 중이 아닐 땐 '팔로우'*/}
        {pathname === '/mypage' ? (
          <div className="flex w-full flex-col gap-[10px]">
            <CustomButton active={true} onClick={handleEditProfileButtonClick}>
              프로필 편집
            </CustomButton>
            <CustomButton style="tertiary" active={true} onClick={temp}>
              로그아웃
            </CustomButton>
          </div>
        ) : isFollowing ? (
          <CustomButton style="tertiary" active={true}>
            팔로우 취소
          </CustomButton>
        ) : (
          <CustomButton active={true}>팔로우</CustomButton>
        )}
      </div>

      {isFollowModalOpen && (
        <Modal
          onClick={toggleFollowModal}
          modalFrameClassNames="max-h-[550px] w-[335px] overflow-auto scrollbar-hide md:max-h-[600px] md:w-[500px] xl:max-h-[660px]"
        >
          <FollowUserList
            name={nickname}
            title={`${modalType === '팔로워' ? '을 팔로우' : '이 팔로잉'}`}
            followUserData={followData?.list}
          />
        </Modal>
      )}

      {isEditProfileModalOpen && (
        <Modal
          onClick={toggleEditProfileModal}
          modalFrameClassNames="max-h-[550px] w-[335px] overflow-auto scrollbar-hide md:max-h-[600px] md:w-[500px] xl:max-h-[660px]"
        >
          <EditProfile />
        </Modal>
      )}
    </>
  )
}
