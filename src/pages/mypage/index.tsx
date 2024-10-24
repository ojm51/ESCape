import { useQuery } from '@tanstack/react-query'
import { getMyInfo } from '@/libs/axios/mypage/apis'
import { Spinner } from 'flowbite-react'
import Profile from '@/components/mypage/Profile'
import ActivityCardList from '@/components/mypage/ActivityCardList'
import ProductCardList from '@/components/mypage/ProductCardList'
import { UserTypes } from '@/dtos/UserDto'

const defaultUserData: UserTypes = {
  updatedAt: '',
  createdAt: '',
  teamId: '',
  image: '',
  description: '',
  nickname: '',
  id: 0,
  mostFavoriteCategory: {
    name: '',
    id: 0,
  },
  averageRating: 0,
  reviewCount: 0,
  followeesCount: 0,
  followersCount: 0,
  isFollowing: false,
}

export default function MyPage() {
  const { isPending, isError, data } = useQuery({
    queryKey: ['myInfo'],
    queryFn: getMyInfo,
  })

  if (isPending) return <Spinner aria-label="로딩 중..." size="xl" />
  // if(isError) return <p>failed..</p>

  return (
    <>
      <div className="m-auto mt-[30px] max-w-[335px] md:mt-[40px] md:max-w-[509px] xl:mt-[60px] xl:max-w-[1340px]">
        <section className="mb-[60px] xl:float-left xl:mr-[60px]">
          {/* {!!data ? <Profile data={data} /> : <p>failed..</p>} */}
          <Profile data={data ?? defaultUserData} />
        </section>
        <section className="mb-[60px]">
          {/* {!!data ? <ActivityCardList data={data} /> : <p>failed..</p>} */}
          <ActivityCardList data={data ?? defaultUserData} />
        </section>
        <ProductCardList data={data ?? defaultUserData} />
      </div>
    </>
  )
}
