import useRouteHandler from '@/hooks/useRouteHandler'
import classNames from 'classnames'
import { CATEGORY_DATA } from '@/libs/constants/category'

interface CategoryListProps {}

export default function CategoryList({}: CategoryListProps) {
  const { handleCategory, category } = useRouteHandler()

  return (
    <div className="hidden flex-col items-start pl-[30px] pt-[45px] md:flex md:w-[180px] xl:w-[220px]">
      <span className="pb-5 pl-5">카테고리</span>
      {CATEGORY_DATA.map(
        (menu) =>
          menu.name && (
            <button
              onClick={() => {
                handleCategory(menu.id)
              }}
              key={menu.id}
              className={classNames(
                'flex h-[45px] w-full items-center rounded-lg pl-5 xl:h-[50px]',
                Number(category) === menu.id ? 'bg-unactive' : 'text-brand-gray-dark',
              )}
            >
              {menu.name}
            </button>
          ),
      )}
    </div>
  )
}
