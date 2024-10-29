import { useRouter } from 'next/router'

const useRouteHandler = () => {
  const router = useRouter()
  const { category, keyword, order } = router.query
  const handleKeyword = (keyword: string) => {
    router.push({ pathname: '/product', query: { ...(category && { category: category }), keyword: keyword } })
  }

  const handleCategory = (category: number) => {
    router.push({ pathname: '/product', query: { ...(keyword && { keyword: keyword }), category: category } })
  }

  const handleQueryReset = () => {
    router.push('/product')
  }
  const handleOrder = (order: 'recent' | 'rating' | 'reviewCount') => {
    router.push({
      pathname: 'product',
      query: { ...(keyword && { keyword: keyword }), ...(category && { category: category }), order: order },
    })
  }

  return { handleKeyword, handleCategory, handleOrder, category, keyword, order }
}

export default useRouteHandler
