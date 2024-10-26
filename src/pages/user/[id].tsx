import { useQuery } from '@tanstack/react-query'
import { getUserInfo } from '@/libs/axios/mypage/apis'
import { Spinner } from 'flowbite-react'
import Profile from '@/components/mypage/Profile'
import ActivityCardList from '@/components/mypage/ActivityCardList'
import ProductCardList from '@/components/mypage/ProductCardList'
import { UserTypes } from '@/dtos/UserDto'
import { useRouter } from 'next/router'

export default function UserPage() {
  const { pathname } = useRouter()
  const { isPending, isError, data } = useQuery({
    queryKey: [`userInfo${pathname}`],
    queryFn: () => getUserInfo({ userId: pathname }),
  })

  if (isPending) return <Spinner aria-label="로딩 중..." size="xl" />
  if (isError) return <p>failed..</p>

  return (
    <>
      <div className="m-auto max-w-[335px] md:max-w-[509px] xl:max-w-[1340px]">
        <section className="mb-[60px] xl:float-left xl:mr-[60px]">
          {!!data ? <Profile data={data} /> : <p>failed..</p>}
        </section>
        <section className="mb-[60px]">{!!data ? <ActivityCardList data={data} /> : <p>failed..</p>}</section>
        <ProductCardList data={data} />
      </div>
    </>
  )
}
