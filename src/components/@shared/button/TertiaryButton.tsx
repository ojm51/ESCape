import classNames from 'classnames'
import { Button } from 'flowbite-react'
import { PropsWithChildren } from 'react'

interface TertiaryButtonProps {
  active: boolean
  onClick: () => void
}

export default function TertiaryButton({ children, active, onClick }: PropsWithChildren<TertiaryButtonProps>) {
  return (
    <Button
      onClick={active ? onClick : undefined}
      className={classNames(
        'xl-[65px] relative h-[50px] w-full focus:ring-0 md:h-[55px]',
        active ? 'bg-brand-gray-light enabled:hover:bg-brand-gray-light' : 'bg-unactive enabled:hover:bg-unactive',
      )}
    >
      <span
        className={classNames(
          'absolute inset-0.5 flex items-center justify-center rounded-lg bg-body-bg text-lg font-semibold text-brand-gray-light',
          active ? 'hover:bg-brand-gray-light hover:text-white' : 'text-brand-gray-dark',
        )}
      >
        {children}
      </span>
    </Button>
  )
}
