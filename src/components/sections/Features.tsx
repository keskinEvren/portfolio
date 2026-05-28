"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/shared/GlassCard";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { Code, Database, Smartphone, Palette, Globe, Server, Layers } from "lucide-react";
import { useTranslations } from "next-intl";
import { LocalizedSkill } from "@/lib/sanity.client";

interface FeaturesProps {
  data?: LocalizedSkill[] | null;
}

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const getIconForIndex = (index: number) => {
  const icons = [Code, Server, Smartphone, Database, Palette, Globe, Layers];
  return icons[index % icons.length];
};

export function Features({ data }: FeaturesProps) {
  const t = useTranslations("Features");
  const fallbackItems: any[] = t.raw("skills");

  // Load from Sanity, falling back to local files
  const items = data && data.length > 0 ? data : fallbackItems;

  return (
    <SectionWrapper id="skills" className="relative">
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block text-sm text-white/50 uppercase tracking-widest mb-4"
        >
          {t("section_title")}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
        >
          {t("heading")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/60 max-w-2xl mx-auto"
        >
          {t("subheading")}
        </motion.p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {items.map((skill, index) => {
          const SkillIcon = getIconForIndex(index);

          return (
            <motion.div key={skill.title} variants={itemVariants}>
              <GlassCard className="p-6 h-full group cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors">
                  <SkillIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {skill.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed font-light">
                  {skill.description}
                </p>
              </GlassCard>
            </motion.div>
          );
        })}
      </motion.div>
    </SectionWrapper>
  );
}
