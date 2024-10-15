import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/images/logo.svg";
import KakaoIcon from "../../../public/icons/icon_kakao.svg";
import GoogleIcon from "../../../public/icons/icon_google.svg";
import EyesShowIcon from "../../../public/icons/icon_eyes_show.svg";
import EyesHiddenIcon from "../../../public/icons/icon_eyes_hidden.svg";
import PrimaryButton from "@/components/@shared/button/PrimaryButton";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
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
      <div className="mb-5 relative">
        <label className="block pb-1">비밀번호</label>
        <input
          type={showPassword ? "text" : "password"}
          className="bg-brand-black-medium w-full rounded-xl border-solid border-brand-black-light py-4 px-6 text-brand-gray-dark focus:outline-blue-gradation "
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
      <div className="pt-2">
        <PrimaryButton onClick={() => {}} active={true}>
          로그인
        </PrimaryButton>
      </div>

      <div className="text-center mt-10">
        <p>
          처음이신가요?{" "}
          <Link href="/signup" className="mr-1">
            <u>회원가입</u>
          </Link>
          하러가기
        </p>
        <p className="text-brand-gray-dark my-3">SNS로 바로 시작하기</p>
        <div className="flex justify-center gap-4">
          <button
            title="구글 로그인"
            className="border-solid rounded-full border-brand-black-light"
          >
            <Image width={56} src={GoogleIcon} alt="구글 로고" />
          </button>
          <button
            title="카카오 로그인"
            className="border-solid rounded-full border-brand-black-light"
          >
            <Image width={56} src={KakaoIcon} alt="카카오 로고" />
          </button>
        </div>
      </div>
    </div>
  );
}
