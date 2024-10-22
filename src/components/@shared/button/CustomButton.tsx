import classNames from 'classnames'
import { Button } from 'flowbite-react'
import { PropsWithChildren } from 'react'

type ButtonType =
  | { primary: true; secondary?: never; tertiary?: never }
  | { secondary: true; primary?: never; tertiary?: never }
  | { tertiary: true; primary?: never; secondary?: never }

interface CustomButtonProps {
  active: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset' // 버튼 타입 정의
  style?: 'primary' | 'secondary' | 'tertiary'
  secondaryBg?: string
}

export default function CustomButton({
  children,
  active,
  onClick,
  type = 'button',
  style = 'primary',
  secondaryBg = 'bg-body-bg',
}: PropsWithChildren<CustomButtonProps>) {
  /**active에 boolean값을 넣어주세요
기본 style은 "primary"
secondary 스타일을 사용할 때 버튼 색상이 body의 색상과 다르면 tailwind속성을 넣어주세요
   */
  return (
    <button
      type={type}
      onClick={active ? onClick : undefined}
      className={classNames(
        'relative flex h-[50px] w-full items-center justify-center rounded-lg border text-lg font-semibold md:h-[55px] xl:h-[65px]',
        style === 'primary'
          ? active
            ? 'bg-gradation text-white'
            : 'bg-unactive text-brand-gray-dark'
          : style === 'secondary'
            ? active
              ? 'bg-gradation'
              : 'border-solid border-unactive text-brand-gray-dark'
            : active // style === "tertiary"일 때
              ? 'border-solid border-brand-gray-light'
              : 'border-solid border-unactive text-brand-gray-dark',
        !active && 'cursor-not-allowed',
      )}
    >
      {style === 'secondary' && active ? (
        <span
          className={classNames(
            secondaryBg,
            'absolute bottom-[1px] left-[1px] right-[1px] top-[1px] flex items-center justify-center rounded-lg',
          )}
        >
          <span className="bg-gradation bg-clip-text text-transparent">{children}</span>
        </span>
      ) : (
        <>{children}</>
      )}
    </button>
  )
}
