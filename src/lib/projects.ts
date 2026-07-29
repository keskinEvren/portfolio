// NOTE: Localized deliverables (including name, description, and URLs pointing to local /docs/*.md files)
// are defined in translation files: src/messages/tr.json and src/messages/en.json
export interface PMDeliverable {
  name: string;
  type: "prd" | "wireframe" | "roadmap" | "flow" | "research" | "link" | "presentation";
  description: string;
  url: string;
}

export interface PMDetails {
  role: string;
  timeline: string;
  problem: string;
  solution: string;
  metrics: string[];
  deliverables: PMDeliverable[];
}

export interface ProjectStaticConfig {
  id: string;
  technologies: string[];
  github?: string;
  live?: string;
  hasPmDetails: boolean;
  coverImage?: string;
  screenshots?: string[];
}

export const projectsConfig: ProjectStaticConfig[] = [
  {
    id: "watchpath",
    technologies: ["Next.js 16 (App Router)", "React 19", "AI (Gemini)", "Supabase", "React Flow"],
    github: "https://github.com/keskinEvren/watchpath",
    live: "https://watchpath-two.vercel.app",
    hasPmDetails: true,
    coverImage: "/screenshots/watchpath/cover.png",
    screenshots: [
      "/screenshots/watchpath/screen-1.png",
      "/screenshots/watchpath/screen-2.png",
      "/screenshots/watchpath/screen-3.png",
    ],
  },
  {
    id: "kariyer-takip",
    technologies: [".NET", "Razor Pages", "PostgreSQL", "RBAC"],
    github: "https://github.com/keskinEvren/kariyer-takip-portali",
    hasPmDetails: true,
    coverImage: "/screenshots/kariyer-takip/cover.png",
    screenshots: [
      "/screenshots/kariyer-takip/screen-1.png",
      "/screenshots/kariyer-takip/screen-2.png",
    ],
  },
  {
    id: "apartman-plus",
    technologies: ["Next.js 15", "React 19", "TypeScript", "tRPC v11", "PostgreSQL", "Drizzle ORM", "Tailwind CSS"],
    github: "https://github.com/keskinEvren/apartman-plus-resident-ops",
    live: "https://www.komsu.site/",
    hasPmDetails: true,
    coverImage: "/screenshots/apartman-plus/cover.png",
    screenshots: [
      "/screenshots/apartman-plus/screen-1.png",
      "/screenshots/apartman-plus/screen-2.png",
      "/screenshots/apartman-plus/screen-3.png",
    ],
  },
  {
    id: "hizir-global",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "next-intl", "Node.js"],
    live: "https://hizirglobal.com.tr/tr",
    hasPmDetails: true,
    coverImage: "/screenshots/hizir-global/cover.png",
    screenshots: [
      "/screenshots/hizir-global/screen-1.png",
      "/screenshots/hizir-global/screen-2.png",
    ],
  },
  {
    id: "sherlith",
    technologies: ["Next.js", "React", "Three.js", "Tailwind CSS", "WPGraphQL", "Zustand"],
    live: "https://sherlith.com",
    hasPmDetails: true,
    coverImage: "/screenshots/sherlith/cover.png",
    screenshots: [
      "/screenshots/sherlith/screen-1.png",
      "/screenshots/sherlith/screen-2.png",
      "/screenshots/sherlith/screen-3.png",
    ],
  },
];
