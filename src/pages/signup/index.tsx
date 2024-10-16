import { useState } from "react";
import { useRouter } from "next/router";
import { signUp } from "@/libs/axios/auth/auth";
import { useAuth } from "@/contexts/AuthProvider";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/images/logo.svg";
import EyesShowIcon from "../../../public/icons/icon_eyes_show.svg";
import EyesHiddenIcon from "../../../public/icons/icon_eyes_hidden.svg";
import PrimaryButton from "@/components/@shared/button/PrimaryButton";
import { useForm } from "react-hook-form";
import { Spinner } from "flowbite-react";

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: "onChange",
  });
  const [loading, setLoading] = useState(false);
<<<<<<< Updated upstream

  const onSubmit = async (data) => {
    setLoading(true); // 로딩 상태 true로 변경
    console.log(data);

    // 서버에 데이터 전송 등의 추가 로직 작성
    // 여기에 데이터를 전송하고 로딩 상태를 false로 변경하는 로직을 추가하세요.
    setTimeout(() => {
      setLoading(false); // 로딩 상태를 false로 변경
    }, 2000); // 예시로 2초 후에 로딩 종료
    alert("전송버튼클릭");
=======
  const router = useRouter();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    setLoading(true);
    const { email, password } = data;
    const isSignUpSuccess = await signUp(data);

    if (isSignUpSuccess) {
      await login({ email, password });
      router.push("/");
      return;
    }
    setLoading(false);
    alert("회원가입 실패");
>>>>>>> Stashed changes
  };
  const validatePassword = (value) => {
    const regex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/; // 숫자, 영문, 특수문자 포함 및 최소 8자
    if (!regex.test(value)) {
      return "비밀번호는 숫자, 영문, 특수문자를 포함해야 합니다."; // 에러 메시지
    }
    return true; // 유효성 통과
  };

  const passwordValue = watch("password");
  const [showPassword, setShowPassword] = useState(false);
<<<<<<< Updated upstream
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
=======
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
>>>>>>> Stashed changes

  return (
    <div className="mt-[200px] max-w-[640px] text-white p-3 mx-auto">
      <div className="flex justify-center">
        <Link href="/" className="inline-block py-10">
          <Image width={200} src={Logo} alt="로고 이미지" />
        </Link>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <label className="block pb-1">이메일</label>
          <input
            type="text"
            className={`bg-brand-black-medium w-full rounded-xl border-solid ${
              errors.email ? "border-red-500" : "border-brand-black-light"
            } py-4 px-6 text-brand-gray-dark focus:outline-blue-gradation`}
            placeholder="이메일을 입력해주세요"
            {...register("email", {
              required: "이메일은 필수 입력입니다.",
              pattern: {
<<<<<<< Updated upstream
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
=======
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
>>>>>>> Stashed changes
                message: "이메일 형식으로 작성해 주세요.",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-5">
          <label className="block pb-1">닉네임</label>
          <input
            type="text"
            className={`bg-brand-black-medium w-full rounded-xl border-solid ${
              errors.nickname ? "border-red-500" : "border-brand-black-light"
            } py-4 px-6 text-brand-gray-dark focus:outline-blue-gradation`}
            placeholder="닉네임을 입력해주세요"
            {...register("nickname", {
              required: "닉네임은 필수 입력입니다.",
              maxLength: {
                value: 20,
                message: "닉네임은 최대 20자까지 입력 가능합니다.",
              },
            })}
          />
          {errors.nickname && (
            <p className="text-red-500 text-sm mt-2">
              {errors.nickname.message}
            </p>
          )}
        </div>
        <div className="mb-5">
          <label className="block pb-1">비밀번호</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className={`bg-brand-black-medium w-full rounded-xl border-solid ${
                errors.password ? "border-red-500" : "border-brand-black-light"
              } py-4 px-6 text-brand-gray-dark focus:outline-blue-gradation`}
              placeholder="비밀번호는 필수 입력입니다."
              {...register("password", {
                required: "비밀번호는 필수 항목입니다.",
                minLength: {
                  value: 8,
                  message: "비밀번호는 최소 8자 이상이어야 합니다.",
                },
                validate: validatePassword,
              })}
            />
            <button
              type="button"
              className="absolute right-5 top-4"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보이기"}
            >
              <Image
                width={25}
                src={showPassword ? EyesShowIcon : EyesHiddenIcon}
                alt={
                  showPassword
                    ? "비밀번호 숨기기 아이콘"
                    : "비밀번호 보이기 아이콘"
                }
              />
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-2">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="mb-5">
          <label className="block pb-1">비밀번호 확인</label>
          <div className="relative">
            <input
<<<<<<< Updated upstream
              type={showPasswordConfirm ? "text" : "password"}
              className={`bg-brand-black-medium w-full rounded-xl border-solid ${
                errors.passwordConfirm
=======
              type={showPasswordConfirmation ? "text" : "password"}
              className={`bg-brand-black-medium w-full rounded-xl border-solid ${
                errors.passwordConfirmation
>>>>>>> Stashed changes
                  ? "border-red-500"
                  : "border-brand-black-light"
              } py-4 px-6 text-brand-gray-dark focus:outline-blue-gradation`}
              placeholder="비밀번호를 다시 입력해주세요"
<<<<<<< Updated upstream
              {...register("passwordConfirm", {
=======
              {...register("passwordConfirmation", {
>>>>>>> Stashed changes
                required: "비밀번호 확인을 입력해주세요.",
                validate: (value) =>
                  value === passwordValue || "비밀번호가 일치하지 않습니다.",
              })}
            />
            <button
              type="button"
              className="absolute right-5 top-4"
<<<<<<< Updated upstream
              onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
              aria-label={
                showPasswordConfirm ? "비밀번호 숨기기" : "비밀번호 보이기"
=======
              onClick={() =>
                setShowPasswordConfirmation(!showPasswordConfirmation)
              }
              aria-label={
                showPasswordConfirmation ? "비밀번호 숨기기" : "비밀번호 보이기"
>>>>>>> Stashed changes
              }
            >
              <Image
                width={25}
<<<<<<< Updated upstream
                src={showPasswordConfirm ? EyesShowIcon : EyesHiddenIcon}
                alt={
                  showPasswordConfirm
=======
                src={showPasswordConfirmation ? EyesShowIcon : EyesHiddenIcon}
                alt={
                  showPasswordConfirmation
>>>>>>> Stashed changes
                    ? "비밀번호 숨기기 아이콘"
                    : "비밀번호 보이기 아이콘"
                }
              />
            </button>
          </div>
<<<<<<< Updated upstream
          {errors.passwordConfirm && (
            <p className="text-red-500 text-sm mt-2">
              {errors.passwordConfirm.message}
=======
          {errors.passwordConfirmation && (
            <p className="text-red-500 text-sm mt-2">
              {errors.passwordConfirmation.message}
>>>>>>> Stashed changes
            </p>
          )}
        </div>
        <div className="pt-2">
          <PrimaryButton
            type="submit"
            onClick={() => {}}
            active={true}
            disabled={!isValid}
          >
            {loading ? (
              <Spinner aria-label="로딩 중..." size="md" />
            ) : (
              "가입하기"
            )}
          </PrimaryButton>
        </div>
      </form>

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
