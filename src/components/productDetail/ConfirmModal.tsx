import React from 'react'
import Modal from '../@shared/modal/Modal'

interface ConfirmModalProps {
  title: string
  description: string
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmModal({ title, description, onConfirm, onCancel }: ConfirmModalProps) {
  return (
    <Modal onClick={onCancel} modalFrameClassNames="w-[40%] max-w-md">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <p className="mt-4 text-sm text-gray-300">{description}</p>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            className="rounded-lg bg-green-500 px-6 py-2 text-white hover:bg-green-600 focus:outline-none"
            onClick={onConfirm}
          >
            확인
          </button>
          <button
            type="button"
            className="rounded-lg bg-red-500 px-6 py-2 text-white hover:bg-red-600 focus:outline-none"
            onClick={onCancel}
          >
            취소
          </button>
        </div>
      </div>
    </Modal>
  )
}
