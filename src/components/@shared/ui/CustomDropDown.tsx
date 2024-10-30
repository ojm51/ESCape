import { CustomFlowbiteTheme, Dropdown, Flowbite } from 'flowbite-react'
import { useState } from 'react'
import { RxTriangleDown } from 'react-icons/rx'

interface DropDownValues {
  label: string
  value: any
}

interface CustomDropDown {
  dropDownValues: DropDownValues[]
  onClick: (value: any) => void
}

const customTheme: CustomFlowbiteTheme = {
  dropdown: {
    content: 'absolute bg-unactive overflow-hidden -top-1 -left-1 -right-1 rounded-md',
    floating: {
      base: 'rounded-xl bg-unactive ',
      item: {
        base: 'flex w-full  cursor-pointer items-center justify-start px-4 py-2 text-sm text-brand-gray-light hover:bg-brand-gray-dark hover:text-brand-white',
      },
    },
  },
}

/**
 *
 * @param dropDownValues 드랍다운 아이템의 label과 value(onClick함수에 인자로 전달될 값)를 객체형태로 배열에 저장하여 props로 전달
 * @param onClick 드랍다운 아이템을 클릭하면실행될 함수 인자로 dropDownValues의 value를 전달받음
 */
export default function CustomDropDown({ dropDownValues, onClick }: CustomDropDown) {
  const [selectedLabel, setSelectedLabel] = useState(dropDownValues[0].label)
  const handleSelectedLabel = (labelValue: any) => {
    setSelectedLabel(labelValue)
  }
  return (
    <Flowbite theme={{ theme: customTheme }}>
      <Dropdown
        renderTrigger={() => (
          <button className="flex items-center gap-5 text-sm text-brand-gray-light">
            <span>{selectedLabel}</span>
            <RxTriangleDown />
          </button>
        )}
      >
        {dropDownValues.map(item => (
          <Dropdown.Item
            key={item.value}
            onClick={() => {
              onClick(item.value)
              handleSelectedLabel(item.label)
            }}
          >
            {item.label}
          </Dropdown.Item>
        ))}
      </Dropdown>
    </Flowbite>
  )
}
