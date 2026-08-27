import Image from "next/image";
import { Icon } from "@/components/primitives/Icon";
import { ExternalLink } from "lucide-react";

import { BrutalCard } from "@/components/primitives/BrutalCard";
import { GlitchText } from "@/components/primitives/GlitchText";
import { ProjectVideo } from "@/components/primitives/ProjectVideo";

interface ProjectCardProps {
  name: string;
  desc: string;
  image?: string;
  github?: string;
  link?: string;
  index: number;
}

export function ProjectCard({
  name,
  desc,
  image,
  github,
  link,
  index,
}: ProjectCardProps) {
  const projectId = `[PROJ_${String(index + 1).padStart(3, "0")}]`;

  return (
    <BrutalCard className="flex h-full flex-col">
      {image ? (
        <div className="relative -m-6 mb-4 aspect-[16/10] w-[calc(100%+3rem)] overflow-hidden border-b border-terminal-border">
          {image.endsWith(".mp4") ? (
            <ProjectVideo src={image} name={name} />
          ) : (
            <Image
              src={image}
              alt={name}
              fill
              loading="lazy"
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          )}
        </div>
      ) : null}
      <p className="mb-3 font-mono text-xs text-terminal-signal">
        {projectId}
      </p>
      <h3 className="mb-1 font-mono text-xl font-bold text-terminal-text">
        <GlitchText>{name}</GlitchText>
      </h3>
      <div className="my-3 border-t border-terminal-border" />
      <p className="flex-1 text-sm leading-relaxed text-terminal-soft">
        {desc}
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        {github ? (
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 border border-terminal-border px-3 py-1.5 font-mono text-xs text-terminal-dim transition-colors hover:border-terminal-signal hover:text-terminal-signal"
          >
            <Icon icon="mdi:github" width={14} height={14} aria-hidden />
            GITHUB
          </a>
        ) : null}
        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 border border-terminal-border px-3 py-1.5 font-mono text-xs text-terminal-dim transition-colors hover:border-terminal-signal hover:text-terminal-signal"
          >
            <ExternalLink size={14} aria-hidden />
            LIVE DEMO
          </a>
        ) : null}
      </div>
    </BrutalCard>
  );
}
