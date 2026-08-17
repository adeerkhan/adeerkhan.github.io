export interface StackSkill {
  name: string;
  iconifyTag?: string;
}

export interface StackGroup {
  title: string;
  accent: string;
  note?: string;
  skills: StackSkill[];
}

export const stackGroups: StackGroup[] = [
  {
    title: "Languages",
    accent: "#F72585",
    skills: [
      { name: "Python", iconifyTag: "logos:python" },
      { name: "TypeScript", iconifyTag: "logos:typescript-icon" },
      { name: "C#", iconifyTag: "logos:c-sharp" },
    ],
  },
  {
    title: "Data & GIS",
    accent: "#4DABCF",
    skills: [
      { name: "QGIS", iconifyTag: "simple-icons:qgis" },
      { name: "pandas", iconifyTag: "devicon:pandas" },
      { name: "NumPy", iconifyTag: "logos:numpy" },
      { name: "scikit-learn", iconifyTag: "simple-icons:scikitlearn" },
    ],
  },
  {
    title: "Frontend",
    accent: "#00D8FF",
    skills: [
      { name: "React", iconifyTag: "logos:react" },
      { name: "Zustand", iconifyTag: "devicon:zustand" },
      { name: "Three.js", iconifyTag: "logos:threejs" },
    ],
  },
  {
    title: "CAD & BIM",
    accent: "#EA7600",
    skills: [
      { name: "AutoCAD", iconifyTag: "simple-icons:autocad" },
      { name: "SketchUp", iconifyTag: "simple-icons:sketchup" },
      { name: "Speckle" },
    ],
  },
  {
    title: "Video & 3D",
    accent: "#9B5DE5",
    skills: [
      { name: "CapCut", iconifyTag: "thesvg:capcut" },
      { name: "Blender", iconifyTag: "logos:blender" },
      { name: "Unity3D", iconifyTag: "simple-icons:unity" },
    ],
  },
  {
    title: "AI & Agents",
    accent: "#00FF41",
    skills: [
      { name: "Cursor", iconifyTag: "simple-icons:cursor" },
      { name: "OpenCode", iconifyTag: "simple-icons:opencode" },
      { name: "Hermes", iconifyTag: "simple-icons:hermes" },
      { name: "ComfyUI", iconifyTag: "thesvg:comfyui" },
    ],
  },
  {
    title: "Backend & Ops",
    accent: "#FFB800",
    skills: [
      { name: "FastAPI", iconifyTag: "simple-icons:fastapi" },
      { name: "Docker", iconifyTag: "simple-icons:docker" },
      { name: "AWS", iconifyTag: "logos:aws" },
      { name: "Linux", iconifyTag: "logos:linux-tux" },
      { name: "Cloudflare", iconifyTag: "simple-icons:cloudflare" },
      { name: "SQLite", iconifyTag: "simple-icons:sqlite" },
      { name: "CI/CD · DevOps", iconifyTag: "simple-icons:githubactions" },
    ],
  },
];
