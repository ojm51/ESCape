import React, { ComponentPropsWithoutRef, useState } from 'react'
import Image from 'next/image'
import closeIcon from '@icons/close_icon.svg'

interface ModalProps extends ComponentPropsWithoutRef<'div'> {
  onClick: () => void;
}

export default function Modal({ children, onClick }: ModalProps) {
  return (
    <div className='fixed inset-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50  backdrop-blur-sm z-50'
      onClick={onClick}>
      <section className='w-[335px] max-h-[550px] relative px-5 py-10 rounded-xl bg-[#1b1b22] overflow-auto scrollbar-hide md:py-[60px] md:w-[500px] md:max-h-[600px] xl:max-h-[660px] xl:rounded-2xl' onClick={(e) => e.stopPropagation()}>
        <button className='absolute top-4 right-4 ml-auto md:top-5 md:right-5 md:w-9 xl:w-10' onClick={onClick}>
          <Image className='md:w-9 xl:w-10' src={closeIcon} alt='닫기 아이콘' width={24} height={24} />
        </button>
        {children}
      </section>
    </div>
  )
}
