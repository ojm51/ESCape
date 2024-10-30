import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import defaultProfileImage from '@images/user_default.svg'
import { FollowResponseTypes, UserTypes } from '@/dtos/UserDto'
import { updateMyInfo, addImageFile, getUserFollows } from '@/libs/axios/mypage/apis'
import { AddImageFileParams, UpdateMyInfoParams } from '@/libs/axios/mypage/types'
import { useAuth } from '@/contexts/AuthProvider'
import { AddFollowParams, DeleteFollowParams } from '@/libs/axios/user/types'
import { addFollow, deleteFollow } from '@/libs/axios/user/apis'
import { patchUsers } from '@/libs/axios/board/patchUsers'
import Modal from '../@shared/modal/Modal'
import CustomButton from '../@shared/ui/CustomButton'
import EditProfile from './EditProfile'
import FollowUserList from './FollowUserList'

type ProfileContentsTypes = {
  image: string | File | null
  nickname: string
  description: string
}

interface ProfileProps {
  data: UserTypes
}

export default function Profile({ data: userData }: ProfileProps) {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { user: myInfo, logout } = useAuth()
  const { id, image, nickname, description, followersCount, followeesCount, isFollowing } = userData
  const profileImage = typeof image === 'string' ? image : image ? URL.createObjectURL(image) : defaultProfileImage

  const [followData, setFollowData] = useState<FollowResponseTypes>()
  const [isFollowingState, setIsFollowingState] = useState<boolean>(isFollowing)

  const [modalType, setModalType] = useState<string>('follower')
  const [isFollowModalOpen, setIsFollowModalOpen] = useState<boolean>(false)
  const [isEditProfileModalOpen, setEditProfileModalOpen] = useState<boolean>(false)
  const [newProfile, setNewProfile] = useState<ProfileContentsTypes>({
    image: myInfo?.image ? myInfo.image : null,
    nickname: myInfo?.nickname ?? '',
    description: myInfo?.description ?? '',
  })

  const toggleFollowModal = () => setIsFollowModalOpen(prev => !prev)
  const toggleEditProfileModal = () => setEditProfileModalOpen(prev => !prev)

  /** 페이지를 이동하면 열려 있던 모달을 닫는 함수 */
  useEffect(() => {
    const handleRouteChange = () => {
      toggleFollowModal()
    }

    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [router])

  const {
    isPending: isFollowerPending,
    isError: isFollowerError,
    data: followerList,
  } = useQuery({
    queryKey: ['userFollowers', id],
    queryFn: () => getUserFollows({ userId: id, type: 'follower' }),
    enabled: !!id,
  })

  const {
    isPending: isFolloweePending,
    isError: isFolloweeError,
    data: followeeList,
  } = useQuery({
    queryKey: ['userFollowees', id],
    queryFn: () => getUserFollows({ userId: id, type: 'followee' }),
    enabled: !!id,
  })

  const handleFollowListClick = (type: string) => {
    setModalType(type)
    setFollowData(type === 'follower' ? followerList : followeeList)
    toggleFollowModal()
  }

  const handleEditProfileButtonClick = () => {
    toggleEditProfileModal()
  }

  const handleLogoutButtonClick = () => {
    logout()
    router.push('/')
  }

  const uploadNewProfileMutation = useMutation({
    mutationFn: async (newProfile: UpdateMyInfoParams) => {
      await Promise.all([
        updateMyInfo(newProfile),
        patchUsers({
          id: Number(myInfo?.id),
          nickname: newProfile.nickname,
          description: newProfile.description,
          image: newProfile.image,
        }),
      ])
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myInfo'] })
      toggleEditProfileModal()
    },
  })

  const uploadImageFileMutation = useMutation({
    mutationFn: (newImageFile: AddImageFileParams) => addImageFile(newImageFile),
    onSuccess: imageUrl => {
      uploadNewProfileMutation.mutate({
        image: imageUrl,
        nickname: newProfile?.nickname ?? '',
        description: newProfile?.description ?? '',
      })
    },
  })

  const handleUpdateProfileButtonClick = async ({ image, nickname, description }: ProfileContentsTypes) => {
    setNewProfile({
      image,
      nickname,
      description,
    })

    /** 새로운 이미지를 선택한 경우(type File) -> 이미지를 먼저 업로드 한 뒤에 프로필 업데이트 */
    if (image instanceof File) {
      uploadImageFileMutation.mutate({ image })
      return
    }
    /** 기존 이미지와 동일한 경우(type string) -> 바로 프로필 업데이트 */
    uploadNewProfileMutation.mutate({
      image: typeof image === 'string' ? image : '',
      nickname: nickname ?? '',
      description: description ?? '',
    })
  }

  const followUserMutation = useMutation({
    mutationFn: (userId: AddFollowParams) => addFollow(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInfo', id] })
      queryClient.invalidateQueries({ queryKey: ['userFollowers', id] })
    },
  })

  const handleFollowButtonClick = () => {
    followUserMutation.mutate(
      { userId: id },
      {
        onSuccess: () => {
          setIsFollowingState(true)
        },
      },
    )
  }

  const unfollowUserMutation = useMutation({
    mutationFn: (userId: DeleteFollowParams) => deleteFollow(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInfo', id] })
      queryClient.invalidateQueries({ queryKey: ['userFollowers', id] })
    },
  })

  const handleUnfollowButtonClick = () => {
    unfollowUserMutation.mutate(
      { userId: id },
      {
        onSuccess: () => {
          setIsFollowingState(false)
        },
      },
    )
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
            onClick={() => handleFollowListClick('follower')}
          >
            <h4 className="text-center text-lg font-semibold text-brand-white">{followersCount}</h4>
            <p className="text-center text-sm font-normal text-brand-gray-light">팔로워</p>
          </button>
          <button
            className="flex w-full flex-col content-center items-center gap-[10px]"
            onClick={() => handleFollowListClick('followee')}
          >
            <h4 className="text-center text-lg font-semibold text-brand-white">{followeesCount}</h4>
            <p className="text-center text-sm font-normal text-brand-gray-light">팔로잉</p>
          </button>
        </div>

        {!!myInfo && myInfo.id === userData.id ? (
          <div className="flex w-full flex-col gap-[10px]">
            <CustomButton active onClick={handleEditProfileButtonClick}>
              프로필 편집
            </CustomButton>
            <CustomButton styleType="tertiary" active onClick={handleLogoutButtonClick}>
              로그아웃
            </CustomButton>
          </div>
        ) : isFollowingState ? (
          <CustomButton styleType="tertiary" active onClick={handleUnfollowButtonClick}>
            팔로우 취소
          </CustomButton>
        ) : (
          <CustomButton active onClick={handleFollowButtonClick}>
            팔로우
          </CustomButton>
        )}
      </div>

      {isFollowModalOpen && (
        <Modal
          onClick={toggleFollowModal}
          modalFrameClassNames="max-h-[550px] w-[335px] overflow-auto scrollbar-hide md:max-h-[600px] md:w-[500px] xl:max-h-[660px]"
        >
          <FollowUserList
            type={modalType}
            name={nickname}
            title={`${modalType === 'follower' ? '을 팔로우' : '이 팔로잉'}`}
            followUserList={followData?.list}
          />
        </Modal>
      )}

      {isEditProfileModalOpen && (
        <Modal
          onClick={toggleEditProfileModal}
          modalFrameClassNames="max-h-[550px] w-[335px] overflow-auto scrollbar-hide md:max-h-[600px] md:w-[500px] xl:max-h-[660px]"
        >
          <EditProfile
            image={image || null}
            nickname={nickname ?? ''}
            description={description ?? ''}
            onEdit={handleUpdateProfileButtonClick}
            isPending={uploadNewProfileMutation.isPending}
          />
        </Modal>
      )}
    </>
  )
}
