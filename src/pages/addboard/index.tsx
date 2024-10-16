import HeaderSection from "@/components/addboard/HeaderSection";
import ContentSection from "@/components/addboard/ContentSection";
import {useForm} from "react-hook-form";

export default function AddBoardsPage() {
  const {
    handleSubmit,
    register,
  } = useForm();

  return (
    <div className="relative mx-4 md:6 xl:mx-auto xl:w-[1200px] py-[100px]">
      <HeaderSection handleSubmit={handleSubmit} />
      <ContentSection register={register} />
    </div>
  );
}
