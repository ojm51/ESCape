import { useAuth } from '@/contexts/AuthProvider'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '../../../public/images/logo.svg'
import PrimaryButton from '@/components/@shared/button/CustomButton'
import { OAuthProviders } from '@/dtos/AuthDto'
import { Spinner } from 'flowbite-react'

export default function NicknamePage({ provider }: { provider?: OAuthProviders }) {
  return (
    <div className="mx-auto mt-[200px] max-w-[640px] p-3 text-white">
      <div className="flex justify-center">
        <Link href="/" className="inline-block py-10">
          <Image width={200} src={Logo} alt="로고 이미지" />
        </Link>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <label className="block pb-1">닉네임</label>
          <input
            type="text"
            className={`w-full rounded-xl border-solid border-brand-black-light bg-brand-black-medium px-6 py-4 text-brand-gray-dark focus:outline-blue-gradation ${
              errors.nickname ? 'border-red-500' : ''
            }`}
            placeholder="닉네임을 입력해주세요"
            {...register('nickname', {
              required: '닉네임은 필수 입력입니다.',
              maxLength: {
                value: 10,
                message: '닉네임은 최대 10자까지 가능합니다.',
              },
            })}
          />
          {errors.nickname && <p className="mt-2 text-sm text-red-500">{errors.nickname.message}</p>}
        </div>
        <div className="pt-2">
          <PrimaryButton style="primary" type="submit" active={true}>
            {loading ? <Spinner aria-label="로딩 중..." size="md" /> : '가입하기'}
          </PrimaryButton>
        </div>
      </form>
    </div>
  )
}
