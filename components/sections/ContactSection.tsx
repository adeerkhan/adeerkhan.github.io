import Image from "next/image";

import { SectionLabel } from "@/components/primitives/SectionLabel";
import { SocialLink } from "@/components/primitives/SocialLink";
import { socialLinks } from "@/data/social";

export interface GithubProfile {
	avatar_url: string;
	bio: string | null;
	location: string | null;
	html_url: string;
	login: string;
}

interface ContactSectionProps {
	github: GithubProfile;
}

export function ContactSection({ github }: ContactSectionProps) {
	return (
		<div>
			<SectionLabel num="08" />
			<div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(180px,0.45fr)] md:items-start md:gap-12">
				<div>
					<h2 className="font-mono text-[clamp(40px,7vw,96px)] font-bold leading-[0.9] text-terminal-text">
						REACH OUT TO ME!
					</h2>
					<p className="mt-8 max-w-xl font-mono text-sm uppercase leading-relaxed tracking-widest text-terminal-soft">
						Discuss a project or just want to say hi? My inbox is
						open for all.
					</p>
					<a
						href={socialLinks.email}
						className="mt-8 inline-flex border border-terminal-signal px-4 py-2 font-mono text-sm text-terminal-signal transition-colors hover:bg-terminal-signal hover:text-terminal-bg"
					>
						adeersafi@gmail.com
					</a>
					<div className="mt-6 flex flex-wrap gap-3">
						<SocialLink
							href={socialLinks.github}
							icon="mdi:github"
							label="GITHUB"
							showLabel
						/>
						<SocialLink
							href={socialLinks.linkedin}
							icon="mdi:linkedin"
							label="LINKEDIN"
							showLabel
						/>
						<SocialLink
							href={socialLinks.instagram}
							icon="mdi:instagram"
							label="INSTAGRAM"
							showLabel
						/>
					</div>
				</div>
				<div className="relative mx-auto aspect-square w-40 shrink-0 overflow-hidden border border-terminal-border bg-terminal-surface sm:w-48 md:ml-auto md:mr-0 md:w-56 lg:w-64">
					<Image
						src={github.avatar_url}
						alt={`${github.login} avatar`}
						fill
						className="object-cover"
						sizes="(min-width: 1024px) 256px, (min-width: 768px) 224px, (min-width: 640px) 192px, 160px"
					/>
				</div>
			</div>
		</div>
	);
}
