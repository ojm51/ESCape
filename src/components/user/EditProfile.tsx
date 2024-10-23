import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import imageIcon from '@icons/image_icon.svg'
import deleteIcon from '@icons/close_icon.svg'
import CustomButton from '../@shared/button/CustomButton'

const MAX_LENGTH = 300

interface EditProfileProps {
  onEdit: () => void
  image: string
  nickname: string
  description: string
}

export default function EditProfile({ onEdit, image = '', nickname, description }: EditProfileProps) {
  const [formValues, setFormValues] = useState({
    image: image,
    nickname: nickname,
    description: description,
  })
  const [previewImage, setPreviewImage] = useState<string>(image)
  const [inputCount, setInputCount] = useState<number>(0)

  const isFormComplete = useMemo(() => {
    const { image, ...restValues } = formValues
    const isAllInputFilled = Object.values(restValues).every((inputValue) => inputValue !== '')
    return isAllInputFilled
  }, [formValues])

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const selectedImage = URL.createObjectURL(e.target.files[0])
    setPreviewImage(selectedImage)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }))
  }

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let inputValue = e.target.value
    if (inputValue.length > MAX_LENGTH) {
      inputValue = inputValue.slice(0, MAX_LENGTH)
    }
    setInputCount(inputValue.length)
    handleInputChange(e)
  }

  const handleFileInputDelete = () => {
    setPreviewImage('')
  }

  const inputClassNames =
    'w-full rounded-lg border border-brand-gray-dark bg-[#252530] p-5 placeholder:text-sm placeholder:font-normal placeholder:text-brand-gray-dark md:py-[23px]'

  return (
    <div className="flex w-full flex-col content-start items-stretch gap-5 md:gap-10">
      <h3 className="text-xl font-semibold leading-7 xl:text-2xl">프로필 편집</h3>
      <section className="flex flex-col items-start justify-start gap-[10px]">
        <div className="flex content-start items-center">
          <label
            className="relative inline-block h-[140px] w-[140px] cursor-pointer rounded-lg border border-unactive bg-[#252530]"
            htmlFor="profileImage"
          >
            <div className="absolute left-1/2 top-1/2 float-left -translate-x-1/2 -translate-y-1/2 transform">
              <Image src={imageIcon} alt="이미지 아이콘" width={24} height={24} />
            </div>
          </label>
          <input
            className="hidden"
            value={formValues.image}
            id="profileImage"
            name="image"
            type="file"
            onChange={handleFileInputChange}
          />

          {!!previewImage && (
            <div className="relative inline-block">
              <Image
                className="ml-[10px] inline-block h-[140px] w-[140px] rounded-lg object-cover"
                src={previewImage}
                alt="업로드 한 이미지 미리보기"
                width={140}
                height={140}
              />
              <button onClick={handleFileInputDelete}>
                <Image
                  className="absolute right-2 top-2 rounded-full bg-brand-black-medium p-1"
                  src={deleteIcon}
                  alt="이미지 삭제 아이콘"
                  width={20}
                  height={20}
                />
              </button>
            </div>
          )}
        </div>

        <input
          className={inputClassNames}
          value={formValues.nickname}
          id="nickname"
          name="nickname"
          type="text"
          placeholder="닉네임을 입력해주세요"
          onChange={handleInputChange}
        />

        <div className="relative w-full">
          <textarea
            className={inputClassNames}
            value={formValues.description}
            id="description"
            name="description"
            placeholder="소개를 입력해 주세요"
            maxLength={500}
            onChange={handleTextAreaChange}
          />
          <p className="absolute bottom-5 right-5 text-right text-sm font-normal text-brand-gray-dark">
            <span>{inputCount}</span>/{MAX_LENGTH}
          </p>
        </div>
      </section>

      <CustomButton style="primary" active={isFormComplete} onClick={onEdit}>
        저장하기
      </CustomButton>
    </div>
  )
}
