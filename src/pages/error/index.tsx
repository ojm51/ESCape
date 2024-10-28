import { useRouter } from 'next/router'
import PrimaryButton from '@/components/@shared/ui/CustomButton'

export default function ErrorPage() {
  const router = useRouter()

  // 홈으로 이동하는 함수
  const handleClick = () => {
    router.push('/')
  }
  return (
    <div className="mx-auto mt-[200px] max-w-[640px] p-3 text-white">
      <div className="mb-20 text-center">비정상적인 접근입니다.</div>
      <PrimaryButton style="primary" type="button" active={true} onClick={handleClick}>
        홈으로 가기
      </PrimaryButton>
    </div>
  )
}
