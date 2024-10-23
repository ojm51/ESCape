import { useEffect, useRef } from 'react'

interface InfiniteScrollParams {
  loadMore: () => void
  hasMore: boolean
}

const useInfiniteScroll = ({ loadMore, hasMore }: InfiniteScrollParams) => {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const targetRef = useRef<HTMLDivElement | null>(null)
  const scrollYRef = useRef(0)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting && hasMore) {
            saveScrollPosition()
            await loadMore()
            window.scrollTo(0, scrollYRef.current)
          }
        })
      },
      { threshold: 1.0 },
    )

    const currentTarget = targetRef.current

    if (currentTarget) {
      observerRef.current.observe(currentTarget)
    }

    return () => {
      if (currentTarget) {
        observerRef.current?.unobserve(currentTarget)
      }
      observerRef.current?.disconnect()
    }
  }, [loadMore, hasMore])

  // 데이터 로드 전 스크롤 위치 저장
  const saveScrollPosition = () => {
    scrollYRef.current = window.scrollY
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [scrollYRef.current])

  return { targetRef }
}

export default useInfiniteScroll
