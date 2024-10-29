import { PropsWithChildren } from 'react'
import Header from './Header'
import { useRouter } from 'next/router'

export default function Layout({ children }: PropsWithChildren) {
  const { pathname } = useRouter()

  return <>{!pathname.includes('sign') ? <Header>{children}</Header> : <>{children}</>}</>
}
