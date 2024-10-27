import React, { useState } from 'react'
import { Dropdown } from 'flowbite-react'

interface SortDropdownProps {
  productId: number
  teamId: string
  order: (sortOption: string) => void
}

const SortDropdown: React.FC<SortDropdownProps> = ({ productId, teamId, order }) => {
  const [selectedOption, setSelectedOption] = useState('최신순')

  const handleSortChange = (sortOption: string, label: string) => {
    setSelectedOption(label)
    order(sortOption)
  }

  return (
    <div className="flex items-center gap-4">
      <Dropdown label={selectedOption} inline>
        {/* 기본값은 selectedOption */}
        <Dropdown.Item onClick={() => handleSortChange('recent', '최신순')}>최신순</Dropdown.Item>
        <Dropdown.Item onClick={() => handleSortChange('ratingDesc', '별점 높은순')}>별점 높은순</Dropdown.Item>
        <Dropdown.Item onClick={() => handleSortChange('ratingAsc', '별점 낮은순')}>별점 낮은순</Dropdown.Item>
        <Dropdown.Item onClick={() => handleSortChange('likeCount', '좋아요순')}>좋아요순</Dropdown.Item>
      </Dropdown>
    </div>
  )
}

export default SortDropdown
