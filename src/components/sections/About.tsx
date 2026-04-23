"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/shared/GlassCard";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { Code, Heart, Rocket, Target } from "lucide-react";
import { useTranslations } from "next-intl";

export function About() {
  const t = useTranslations('About');

  return (
    <SectionWrapper id="about" className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-sm text-white/50 uppercase tracking-widest mb-4">
            {t('section_title')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {t('greeting')}{" "}
            <span className="text-gradient bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              Evren Keskin
            </span>
          </h2>
          <p className="text-lg text-white/70 mb-6 leading-relaxed">
            {t('description_1')}
          </p>
          <p className="text-lg text-white/70 mb-8 leading-relaxed">
            {t('description_2')}
          </p>
          <div className="flex flex-wrap gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
            >
              <Target className="w-4 h-4 text-white" />
              <span className="text-sm text-white/90">{t('metric_1')}</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
            >
              <Rocket className="w-4 h-4 text-white" />
              <span className="text-sm text-white/90">{t('metric_2')}</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
            >
              <Heart className="w-4 h-4 text-white" />
              <span className="text-sm text-white/90">{t('metric_3')}</span>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard className="p-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {t('interests_title')}
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-white/60 mt-2 flex-shrink-0" />
                    <p className="text-white/70">
                      {t('interest_1')}
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-white/60 mt-2 flex-shrink-0" />
                    <p className="text-white/70">
                      {t('interest_2')}
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-white/60 mt-2 flex-shrink-0" />
                    <p className="text-white/70">
                      {t('interest_3')}
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-white/60 mt-2 flex-shrink-0" />
                    <p className="text-white/70">
                      {t('interest_4')}
                    </p>
                  </li>
                </ul>
              </div>
              <div className="pt-6 border-t border-white/10">
                <h3 className="text-xl font-semibold text-white mb-4">
                  {t('education_title')}
                </h3>
                <p className="text-white/70 mb-4">
                  {t('education_school')}
                  <br />
                  <span className="text-white/50 text-sm">{t('education_degree')}</span>
                </p>
                <div className="pt-4 border-t border-white/10">
                  <h4 className="text-sm font-semibold text-white/90 mb-2">{t('location_title')}</h4>
                  <p className="text-white/70 text-sm">{t('location')}</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
