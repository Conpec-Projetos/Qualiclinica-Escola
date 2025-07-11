import Checkbox from "@/components/ui/checkbox";
import EditButton from "@/components/ui/edit-button";

export interface Course {
  id: string;
  name: string;
  area: string;
  instructors: string;
  description: string;
}

interface CourseCardProps {
  course: Course;
  selected: boolean;
  onCheckboxChange: (postId: string, checked: boolean) => void;
}

export default function CourseCard({
  course,
  selected,
  onCheckboxChange
}: CourseCardProps) {
  return (
    <div className="flex w-full max-w-[911px]">
      <div className="flex flex-col gap-4">
        <Checkbox
          checked={selected}
          onChange={(checked) => onCheckboxChange(course.id, checked)}
        />
        <EditButton path="cursos" type="course" id={course.id} />
      </div>
      <div className="flex grow bg-white p-6 ml-4 rounded-[5px] text-lg">
        <div className="w-full">
          <p className="mb-1">
            Nome: <span className="font-light">{course.name}</span>
          </p>
          <p className="mb-1">
            Instrutores: <span className="font-light">{course.instructors}</span>
          </p>
          <p className="mb-1">
            Descrição: <span className="font-light whitespace-pre-wrap">{course.description}</span>
          </p>
        </div>
      </div>
    </div>
  );
}