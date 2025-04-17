import Checkbox from "@/components/ui/checkbox";
import EditButton from "@/components/ui/edit-button";

export interface Professional {
  id: string;
  name: string;
  identification: string;
  occupation: string;
  career: string;
  area: string;
}

interface ProfessionalCardProps {
  course: Professional;
  selected: boolean;
  onCheckboxChange: (postId: string, checked: boolean) => void;
}

export default function CourseCard({
  course,
  selected,
  onCheckboxChange,
}: ProfessionalCardProps) {
  return (
    <div className="flex w-full max-w-[911px]">
      <div className="flex flex-col gap-4">
        <Checkbox
          checked={selected}
          onChange={(checked) => onCheckboxChange(course.id, checked)}
        />
        <EditButton path="profissionais" type="professional" id={course.id} />
      </div>
      <div className="flex grow bg-white p-6 ml-4 rounded-[5px] max-h-[200px] mx-w-[738px] overflow-y-auto text-lg">
        <div className="w-full">
          <p className="mb-1">
            Nome: <span className="font-light">{course.name}</span>
          </p>
          <p className="mb-1">
            Identificação: <span className="font-light">{course.identification}</span>
          </p>
          <p className="mb-1">
            Ocupação: <span className="font-light">{course.occupation}</span>
          </p>
          <p className="mb-1">
            Carreira: <span className="font-light">{course.career}</span>
          </p>
        </div>
      </div>
    </div>
  );
}