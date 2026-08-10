"use client";

import Image from "next/image";
import { useState } from "react";

const IMAGES = ["/img/profile.jpg", "/img/profile-2.jpg"];

export function HeroProfile() {
  const [index, setIndex] = useState(0);

  return (
    <div className="profile-glitch shrink-0 translate-x-[10%]">
      <Image
        src={IMAGES[index]}
        alt="Adeer Khan"
        width={900}
        height={1200}
        priority
        className="aspect-[3/4] w-40 border-2 border-terminal-border object-cover sm:w-48 md:w-56"
        onMouseEnter={() => setIndex((current) => (current + 1) % IMAGES.length)}
      />
    </div>
  );
}
