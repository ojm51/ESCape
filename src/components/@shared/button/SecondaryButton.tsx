import classNames from 'classnames'
import { Button } from 'flowbite-react'
import { PropsWithChildren } from 'react'

interface SecondaryButtonProps {
  active: boolean
  onClick: () => void
}

export default function SecondaryButton({ children, active, onClick }: PropsWithChildren<SecondaryButtonProps>) {
  return (
    <Button
      onClick={active ? onClick : undefined}
      className={classNames(
        'xl-[65px] relative h-[50px] w-full focus:ring-0 md:h-[55px]',
        active ? 'bg-gradation' : 'bg-unactive enabled:hover:bg-unactive',
      )}
    >
      <span
        className={classNames(
          'absolute inset-0.5 flex items-center justify-center rounded-lg bg-body-bg text-transparent',
          active ? 'hover:bg-transparent hover:text-white' : '',
        )}
      >
        <span
          className={classNames('text-lg font-semibold', active ? 'bg-gradation bg-clip-text' : 'text-brand-gray-dark')}
        >
          {children}
        </span>
      </span>
    </Button>
  )
}
