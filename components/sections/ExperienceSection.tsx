import { ExperienceCard } from "@/components/cards/ExperienceCard";
import { SectionTitle } from "@/components/primitives/SectionTitle";
import { experience } from "@/data/experience";

export function ExperienceSection() {
  return (
    <div>
      <SectionTitle>EXPERIENCE.</SectionTitle>
      <div className="grid gap-4 md:grid-cols-2">
        {experience.map((item) => (
          <ExperienceCard key={`${item.company}-${item.role}`} {...item} />
        ))}
      </div>
    </div>
  );
}
