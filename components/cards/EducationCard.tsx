interface EducationCardProps {
  schoolName: string;
  subHeader: string;
  duration: string;
  grade?: string;
  desc?: string;
  descBullets?: string[];
}

export function EducationCard({
  schoolName,
  subHeader,
  duration,
  grade,
  desc,
  descBullets,
}: EducationCardProps) {
  return (
    <article className="border border-terminal-border bg-terminal-surface p-6 transition-colors duration-300 hover:border-terminal-signal">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <h3 className="font-mono text-xl font-bold uppercase text-terminal-text">
            {schoolName}
          </h3>
          <p className="mt-2 text-sm text-terminal-soft">{subHeader}</p>
        </div>
        {grade ? (
          <span className="w-fit border border-terminal-signal px-2 py-0.5 font-body text-xs uppercase text-terminal-signal">
            {grade}
          </span>
        ) : null}
      </div>
      <p className="mt-3 font-mono text-xs uppercase tracking-widest text-terminal-amber">
        {duration}
      </p>
      {desc || descBullets?.length ? (
        <div className="mt-4 border-l-2 border-terminal-signal pl-4 text-sm text-terminal-soft">
          {desc ? <p>{desc}</p> : null}
          {descBullets?.length ? (
            <ul className="mt-3 space-y-1">
              {descBullets.map((bullet) => (
                <li key={bullet} className="flex gap-2">
                  <span className="text-terminal-signal">-</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
