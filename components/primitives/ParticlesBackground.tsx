const particles = Array.from({ length: 60 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  top: `${(index * 61) % 100}%`,
  delay: `${(index % 10) * 0.35}s`,
  duration: `${7 + (index % 8)}s`,
}));

export function ParticlesBackground() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="absolute h-px w-px bg-terminal-signal opacity-30"
          style={{
            left: particle.left,
            top: particle.top,
            animation: `particle-drift ${particle.duration} linear ${particle.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}
