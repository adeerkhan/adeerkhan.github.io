import { GlitchText } from "@/components/primitives/GlitchText";
import { SocialLink } from "@/components/primitives/SocialLink";
import { socialLinks } from "@/data/social";

export function ContactSection() {
	return (
		<div className="flex flex-col items-center text-center">
			<h2 className="font-mono text-[clamp(40px,7vw,96px)] font-bold leading-[0.9] text-terminal-text">
				<GlitchText>REACH OUT TO ME!</GlitchText>
			</h2>
			<p className="mt-8 max-w-xl font-mono text-sm uppercase leading-relaxed tracking-widest text-terminal-soft">
				Discuss a project or just want to say hi? Based in Islamabad,
				working remotely with teams worldwide.
			</p>
			<a
				href={socialLinks.email}
				className="mt-8 inline-flex border border-terminal-signal px-4 py-2 font-mono text-sm text-terminal-signal transition-colors hover:bg-terminal-signal hover:text-terminal-bg"
			>
				adeersafi@gmail.com
			</a>
			<div className="mt-6 flex flex-wrap justify-center gap-3">
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
	);
}
