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
}

export const projectsConfig: ProjectStaticConfig[] = [
  {
    id: "kariyer-takip",
    technologies: [".NET", "Razor Pages", "PostgreSQL", "RBAC"],
    github: "https://github.com/keskinEvren/kariyer-takip-portali",
    hasPmDetails: true,
  },
  {
    id: "apartman-plus",
    technologies: ["Next.js 15", "React 19", "TypeScript", "tRPC v11", "PostgreSQL", "Drizzle ORM", "Tailwind CSS"],
    github: "https://github.com/keskinEvren/apartman-plus-resident-ops",
    live: "https://www.komsu.site/",
    hasPmDetails: true,
  },
  {
    id: "hizir-global",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "next-intl", "Node.js"],
    live: "https://hizirglobal.com.tr/tr",
    hasPmDetails: true,
  },
  {
    id: "sherlith",
    technologies: ["Next.js", "React", "Three.js", "Tailwind CSS", "WPGraphQL", "Zustand"],
    live: "https://sherlith.com",
    hasPmDetails: true,
  },
];
