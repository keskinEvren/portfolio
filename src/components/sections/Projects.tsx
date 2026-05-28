"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/shared/GlassCard";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { projectsConfig } from "@/lib/projects";
import { ProjectDetailSheet } from "./ProjectDetailSheet";

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
  const t = useTranslations("Projects");
  const fallbackItems: any[] = t.raw("items");

  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Maps static metadata with translated text from next-intl (including pmDetails)
  const projects = fallbackItems.map((item, index) => {
    const config = projectsConfig[index] || {
      id: `project-${index}`,
      technologies: [],
      github: "#",
      live: "#",
      hasPmDetails: false,
    };
    return {
      ...item,
      id: config.id,
      technologies: config.technologies,
      github: config.github || "#",
      live: config.live || "#",
      hasPmDetails: config.hasPmDetails,
    };
  });

  const handleOpenSheet = (project: any) => {
    setSelectedProject(project);
    setIsSheetOpen(true);
  };

  return (
    <SectionWrapper id="projects" className="relative">
      {/* Visual Ambient Light Blobs */}
      <div className="absolute top-1/4 left-1/10 w-[400px] h-[400px] bg-white/[0.01] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-[400px] h-[400px] bg-white/[0.01] rounded-full blur-[120px] pointer-events-none" />

      <div className="text-center mb-16 relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block text-sm text-white/50 uppercase tracking-widest mb-4 font-mono"
        >
          {t("section_title")}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight"
        >
          {t("heading")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/60 max-w-2xl mx-auto font-light leading-relaxed text-sm md:text-base"
        >
          {t("subheading")}
        </motion.p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10"
      >
        {projects.map((project, idx) => (
          <motion.div key={idx} variants={itemVariants} className="h-full">
            <GlassCard
              className={cn(
                "p-6 md:p-8 h-full flex flex-col relative group bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.06] transition-all duration-500 overflow-hidden"
              )}
            >
              {/* Card Ambient Glow on Hover */}
              <div className="absolute top-0 left-0 w-full h-full bg-white/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="mb-6 relative z-10">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-white transition-colors duration-300 tracking-tight">
                  {project.title}
                </h3>
                <p className="text-xs md:text-sm text-white/50 leading-relaxed font-light mb-4">
                  {project.description}
                </p>
              </div>

              {/* Technologies Tag List */}
              <div className="flex flex-wrap gap-1.5 mb-8 mt-auto relative z-10">
                {project.technologies?.map((tech: string) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-3xs font-medium rounded-full bg-white/5 text-white/60 border border-white/10 group-hover:border-white/20 group-hover:bg-white/10 group-hover:text-white/90 transition-all duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-col gap-2.5 mt-auto relative z-10">
                {project.hasPmDetails && (
                  <Button
                    onClick={() => handleOpenSheet(project)}
                    className="w-full flex items-center justify-center rounded-full py-2 bg-white/5 border border-white/20 hover:bg-white/10 text-white/90 hover:border-white/30 text-xs font-medium group/btn cursor-pointer transition-all duration-300"
                  >
                    <BookOpen className="w-3.5 h-3.5 mr-1.5 group-hover/btn:scale-110 transition-transform" />
                    {t("pm_case_study_btn")}
                  </Button>
                )}
                
                <div className="flex gap-2.5 w-full">
                  {project.github !== "#" && project.github !== "" && (
                    <Button
                      className="flex-1 rounded-full py-2 bg-white/5 hover:bg-white/10 text-white/80 border border-white/10 text-xs transition-colors duration-300"
                      asChild
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-3.5 h-3.5 mr-1.5" />
                        {t("github_btn")}
                      </a>
                    </Button>
                  )}
                  {project.live !== "#" && project.live !== "" && (
                    <Button
                      className="flex-1 rounded-full py-2 bg-white text-black hover:bg-white/90 text-xs font-semibold shadow-sm transition-colors duration-300"
                      asChild
                    >
                      <a href={project.live} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                        {t("live_demo_btn")}
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>

      {/* Case Study Details Sheet Component */}
      <ProjectDetailSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        project={selectedProject}
      />
    </SectionWrapper>
  );
}
