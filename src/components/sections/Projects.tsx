"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/shared/GlassCard";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function Projects() {
  const t = useTranslations('Projects');
  const items: any[] = t.raw('items');

  // Map to the translation items and add tech stack & links
  const projects = items.map((item, index) => {
    if (index === 0) {
      return {
        ...item,
        technologies: [".NET", "Razor Pages", "PostgreSQL", "RBAC"],
        github: "https://github.com/keskinEvren/kariyer-takip-portali",
        live: "#",
        featured: true,
      };
    } else {
      return {
        ...item,
        technologies: ["Next.js", "TypeScript", "PostgreSQL", "Drizzle ORM", "tRPC"],
        github: "#",
        live: "#",
        featured: true,
      };
    }
  });

  return (
    <SectionWrapper id="projects" className="relative">
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block text-sm text-white/50 uppercase tracking-widest mb-4"
        >
          {t('section_title')}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
        >
          {t('heading')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/60 max-w-2xl mx-auto"
        >
          {t('subheading')}
        </motion.p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {projects.map((project, idx) => (
          <motion.div key={idx} variants={itemVariants}>
            <GlassCard
              className={cn(
                "p-6 h-full flex flex-col relative group bg-white/10 border-white/30"
              )}
            >
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed mb-4">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech: string) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs rounded-full bg-white/10 text-white/70 border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 mt-auto">
                {project.github !== "#" && (
                  <Button
                    className="flex-1 rounded-full py-2 bg-white/10 text-white border border-white/20 hover:bg-white/20 text-sm"
                    asChild
                  >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      {t('github_btn')}
                    </a>
                  </Button>
                )}
                {/* 
                <Button
                  className="flex-1 rounded-full py-2 bg-white text-black hover:bg-white/90 text-sm"
                  asChild
                >
                  <a href={project.live} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {t('live_demo_btn')}
                  </a>
                </Button> 
                */}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
