import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/images/logo.svg";
import EyesShowIcon from "../../../public/icons/icon_eyes_show.svg";
import EyesHiddenIcon from "../../../public/icons/icon_eyes_hidden.svg";
import PrimaryButton from "@/components/@shared/button/PrimaryButton";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  return (
    <div className="mt-[200px] max-w-[640px] text-white p-3 mx-auto">
      <div className="flex justify-center">
        <Link href="/" className="inline-block py-10">
          <Image width={200} src={Logo} alt="로고 이미지" />
        </Link>
      </div>
      <div className="mb-5">
        <label className="block pb-1">이메일</label>
        <input
          type="text"
          className="bg-brand-black-medium w-full rounded-xl border-solid border-brand-black-light py-4 px-6 text-brand-gray-dark focus:outline-blue-gradation"
          placeholder="이메일을 입력해주세요"
        />
      </div>
      <div className="mb-5">
        <label className="block pb-1">닉네임</label>
        <input
          type="text"
          className="bg-brand-black-medium w-full rounded-xl border-solid border-brand-black-light py-4 px-6 text-brand-gray-dark focus:outline-blue-gradation"
          placeholder="이메일을 입력해주세요"
        />
      </div>
      <div className="mb-5 relative">
        <label className="block pb-1">비밀번호</label>
        <input
          type={showPassword ? "text" : "password"}
          className="bg-brand-black-medium w-full rounded-xl border-solid border-brand-black-light py-4 px-6 text-brand-gray-dark focus:outline-blue-gradation"
          placeholder="비밀번호를 입력해주세요"
        />
        <button
          className="absolute right-5 top-11"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보이기"}
        >
          <Image
            width={25}
            src={showPassword ? EyesShowIcon : EyesHiddenIcon}
            alt={
              showPassword ? "비밀번호 숨기기 아이콘" : "비밀번호 보이기 아이콘"
            }
          />
        </button>
      </div>
      <div className="mb-5 relative">
        <label className="block pb-1">비밀번호 확인</label>
        <input
          type={showPasswordConfirm ? "text" : "password"}
          className="bg-brand-black-medium w-full rounded-xl border-solid border-brand-black-light py-4 px-6 text-brand-gray-dark focus:outline-blue-gradation"
          placeholder="비밀번호를 입력해주세요"
        />
        <button
          className="absolute right-5 top-11"
          onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
          aria-label={
            showPasswordConfirm ? "비밀번호 숨기기" : "비밀번호 보이기"
          }
        >
          <Image
            width={25}
            src={showPasswordConfirm ? EyesShowIcon : EyesHiddenIcon}
            alt={
              showPasswordConfirm
                ? "비밀번호 숨기기 아이콘"
                : "비밀번호 보이기 아이콘"
            }
          />
        </button>
      </div>
      <div className="pt-2">
        <PrimaryButton onClick={() => {}} active={true}>
          가입하기
        </PrimaryButton>
      </div>

      <div className="text-center mt-10">
        <p>
          이미 회원이신가요?{" "}
          <Link href="/signin" className="mr-1">
            <u>로그인</u>
          </Link>
          하러가기
        </p>
      </div>
    </div>
  );
}
