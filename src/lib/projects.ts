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
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Drizzle ORM", "tRPC"],
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
