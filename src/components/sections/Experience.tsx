"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/shared/GlassCard";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { Briefcase, Calendar } from "lucide-react";
import { useTranslations } from "next-intl";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 },
  },
};

export function Experience() {
  const t = useTranslations('Experience');
  // Re-creating the jobs array from translation array structure
  const jobs: any[] = t.raw('jobs');

  return (
    <SectionWrapper id="experience" className="relative">
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

      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-6"
        >
          {jobs.map((exp: any, index: number) => (
            <motion.div key={index} variants={itemVariants}>
              <GlassCard className="p-6 md:p-8 relative">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                        <Briefcase className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          {exp.role}
                        </h3>
                        <p className="text-white/70">{exp.company}</p>
                        {exp.location && (
                          <p className="text-white/50 text-sm">{exp.location}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-white/50 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <p className="text-white/70 mb-4 leading-relaxed">
                  {exp.description}
                </p>

                {/* Tags structure based on roles */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                  {index === 0 && ["Product Management", "Backlog Prioritization", "Delivery"].map(tech => (
                      <span key={tech} className="px-3 py-1 text-xs rounded-full bg-white/10 text-white/70 border border-white/10">{tech}</span>
                  ))}
                  {index === 1 && ["WordPress", "E-commerce", "Trendyol"].map(tech => (
                      <span key={tech} className="px-3 py-1 text-xs rounded-full bg-white/10 text-white/70 border border-white/10">{tech}</span>
                  ))}
                  {index === 2 && ["Angular", "TypeScript", "UI Components"].map(tech => (
                      <span key={tech} className="px-3 py-1 text-xs rounded-full bg-white/10 text-white/70 border border-white/10">{tech}</span>
                  ))}
                  {index === 3 && ["React Native", "UI/UX", "Mobile"].map(tech => (
                      <span key={tech} className="px-3 py-1 text-xs rounded-full bg-white/10 text-white/70 border border-white/10">{tech}</span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
