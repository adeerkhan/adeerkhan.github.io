import { EducationCard } from "@/components/cards/EducationCard";
import { SectionTitle } from "@/components/primitives/SectionTitle";
import { education } from "@/data/education";

export function EducationSection() {
  return (
    <div>
      <SectionTitle>EDUCATION.</SectionTitle>
      <div className="grid gap-4">
        {education.map((item) => (
          <EducationCard key={item.schoolName} {...item} />
        ))}
      </div>
    </div>
  );
}
