import Image from 'next/image'
import { ChangeEvent, FormEvent, PropsWithChildren, useEffect, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import iconHamburger from '@icons/icon_hamburger.svg'
import logoBig from '@images/logo.svg'
import iconGlass from '@icons/icon_glass.svg'
import iconSignin from '@icons/icon_signin.svg'
import defaultProfileImage from '@images/user_default.svg'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { useAuth } from '@/contexts/AuthProvider'

export default function Header({ children }: PropsWithChildren) {

  const { user, logout } = useAuth()
  const { pathname } = useRouter()
  const [searchInputValue, setSearchInputValue] = useState('')
  const router = useRouter()
  
  const handleLogout = () => {
    logout()
  }

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = defaultProfileImage.src
  }

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value)
  }
  const onSubmitSearchInput = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!searchInputValue) {
      router.push('/product')
      return
    }
    router.push({ pathname: '/product', query: { keyword: searchInputValue } })
    setSearchInputValue('')
  }
  }, []

  return (
    <>
      <div className="relative z-10">
        <div className="fixed flex h-[70px] w-full items-center justify-between border-b border-[#252530] bg-body-bg px-5 md:h-[80px] md:px-[30px] xl:h-[100px] xl:px-[120px]">
          <button className="relative h-[11.27px] w-[17px] md:hidden">
            <Image src={iconHamburger} alt="카테고리 보기" fill />
          </button>
          <div className="flex items-center gap-10">
            <Link href="/" className="relative h-[24px] w-[120px] md:h-[28px] md:w-[140px] xl:h-[34px] xl:w-[170px]">
              <Image src={logoBig} alt="로고" fill sizes="(max-width: 768px) 120px, (max-width: 1280px) 140px, 170px" />
            </Link>
            <Link href="/board" className="hidden md:block">
              자유게시판
            </Link>
          </div>
          <div className="hidden items-center gap-[30px] md:flex">
            <div className="flex h-[50px] w-[300px] items-center gap-1.5 rounded-[28px] bg-[#252530] px-6">
              <Image src={iconGlass} alt="테마검색" width={18.38} height={18.38} className="hidden md:block" />
              <form onSubmit={onSubmitSearchInput}>
                <input value={searchInputValue} onChange={handleSearchInput} placeholder="테마를 검색해 보세요" />
              </form>
            </div>
            {user ? (
                <>
                  <Link href="/mypage" className="flex items-center gap-3">
                    <div className="relative h-[42px] w-[42px] rounded-full overflow-hidden bg-brand-black-light">
                      <Image
                        src={user.image || defaultProfileImage}
                        alt="프로필 이미지"
                        width={42}
                        height={42}
                        onError={handleImageError}
                      />
                    </div>
                    {user.nickname}
                  </Link>
                  <button type="button" className="text-white" onClick={handleLogout}>로그아웃</button>
                </>
              ) : (
                <>
                  <Link href="/signin">로그인</Link>
                  <Link href="/signup">회원가입</Link>
                </>
              )}
          </div>
          <div className="flex items-center gap-5 md:hidden">
            <button className="relative h-[18.38px] w-[18.38px]">
              <Image src={iconGlass} alt="테마검색" fill />
            </button>
            {user ? (
              <span>유저프로필</span>
            ) : (
              <Link href="/signin" className="relative h-[18.38px] w-[18.38px]">
                <Image src={iconSignin} alt="로그인" fill />
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="pt-[70px] md:pt-[80px] xl:pt-[100px]">{children}</div>
    </>
  )
}
