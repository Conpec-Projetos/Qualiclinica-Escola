import { useRouter } from "next/navigation";
import Button from "../ui/button-quali";

export default function CourseModel({
  name,
  instructors,
  description,
  type = "normal",
}: {
  name: string;
  instructors: string;
  description: string;
  type?: string;
  }) {
  const router = useRouter();
  return (
    <section
      className={`flex flex-row bg-rosa-claro rounded-[5px] p-[1.375rem] gap-y-[0.5rem] ${
        type === "normal" ? "w-[848px]" : "w-[407px]"
      } h-[300px]`}
    >
      <div className={`${type === "normal" ? "w-[50%]" : "w-full"}`}>
        <div className="flex flex-col h-full items-start justify-between">
          <div className="flex flex-col gap-y-[0.5rem]">
            <h4 className="font-semibold text-magenta">{name}</h4>
            <p className="text-text text-[0.9375rem] font-normal">
              <b>Instrutores: </b> {instructors}
            </p>
          </div>
          <Button text="TENHO INTERESSE" fontSize="large" onClick={() => router.push("/contate-nos")} />
        </div>
      </div>
      {type === "normal" && (
        <div className="w-[50%] flex flex-col gap-y-[0.5rem]">
          <div className="w-[22.75rem] h-full overflow-y-auto text-text hover:bg-white">
            <p className="text-text text-[0.9375rem] font-medium">
              {description}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
