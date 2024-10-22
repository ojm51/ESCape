import { useCategory } from '@/contexts/CategoryProvider'

interface SidebarProps {}

export default function Sidebar({}: SidebarProps) {
  const { categories } = useCategory()
  console.log(categories)
  return (
    <div className="hidden flex-col gap-[35px] pl-[30px] pt-[45px] md:flex md:w-[180px] xl:w-[220px]">
      <span>카테고리</span>
      {!!categories.length &&
        categories.map((menu) => (
          <span key={menu.id} className="text-brand-gray-dark">
            {menu.name}
          </span>
        ))}
    </div>
  )
}
