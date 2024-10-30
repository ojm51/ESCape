import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/contexts/AuthProvider'
import { getUserInfo } from '@/libs/axios/mypage/apis'
import { Spinner } from 'flowbite-react'
import Profile from '@/components/mypage/Profile'
import ActivityCardList from '@/components/mypage/ActivityCardList'
import ProductCardList from '@/components/mypage/ProductCardList'

export default function UserPage() {
  const { user: myInfo } = useAuth()
  const router = useRouter()
  const { id } = router.query
  const queryId = Array.isArray(id) ? id[0] : id

  /** 경로에 있는 유저 아이디가 내 아이디와 같다면 마이페이지로 리디렉션 */
  useEffect(() => {
    /** @todo 토스트나 모달 띄우기 */
    if (!queryId) {
      console.error('유효하지 않은 유저 아이디입니다.')
      return
    }

    if (myInfo && myInfo.id == queryId) {
      /** @todo 토스트나 모달 띄우기 */
      router.push('/mypage')
    }
  }, [myInfo, queryId, router])

  const { isPending, isError, data } = useQuery({
    queryKey: ['userInfo', queryId],
    queryFn: () => getUserInfo({ userId: queryId! }),
    enabled: !!queryId,
  })

  if (!queryId) {
    return <div>유효하지 않은 유저 ID입니다.</div>
  }

  if (isPending) return <Spinner aria-label="로딩 중..." size="xl" />
  if (isError) return <p>failed..</p>

  return (
    <div className="m-auto mt-[30px] max-w-[335px] md:mt-[40px] md:max-w-[509px] xl:mt-[60px] xl:max-w-[1340px]">
      <section className="mb-[60px] xl:float-left xl:mr-[60px]">
        <Profile data={data} />
      </section>
      <section className="mb-[60px]">
        <ActivityCardList data={data} />
      </section>
      <ProductCardList data={data} />
    </div>
  )
}
