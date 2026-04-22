"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Globe,
  Layout,
  Server,
  Smartphone,
  Terminal,
  Layers,
  Box,
  PenTool,
  GitGraph,
} from "lucide-react";
import { useTranslations } from "next-intl";

const technologies = [
  { name: "React", icon: AtomIcon },
  { name: "Next.js", icon: Layers },
  { name: ".NET", icon: Terminal },
  { name: "TypeScript", icon: Code2 },
  { name: "PostgreSQL", icon: Database },
  { name: "Figma", icon: PenTool },
  { name: "Git", icon: GitGraph },
  { name: "WordPress", icon: Globe },
];

const DOUBLE_TECHNOLOGIES = [...technologies, ...technologies];

// Custom Atom icon for React since Lucide doesn't have it exactly named 'React'
function AtomIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
      <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
    </svg>
  );
}

export function TechStack() {
  const t = useTranslations('TechStack');

  return (
    <section className="py-10 border-y border-white/5 bg-white/5 backdrop-blur-sm overflow-hidden">
      <div className="flex">
        <motion.div
          className="flex gap-12 md:gap-24 px-12 min-w-full"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {DOUBLE_TECHNOLOGIES.map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="flex items-center gap-3 flex-shrink-0 group"
            >
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-white/20 group-hover:bg-white/10 transition-colors">
                <tech.icon className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
              </div>
              <span className="text-lg font-medium text-white/50 group-hover:text-white transition-colors">
                {tech.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
