"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/shared/GlassCard";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { Briefcase, Calendar } from "lucide-react";

const experiences = [
  {
    company: "TNC Group",
    role: "Information Technology Intern",
    period: "Jun 2025 - Jul 2025",
    location: "Ataşehir/İstanbul",
    description:
      "Yoğun bir uygulamalı eğitim programı tamamladım: Excel, Photoshop, AutoCAD ve Python. Takım tabanlı bir ortamda gerçek hayat projelerinde çalışarak kodlama ve tasarım becerilerimi uyguladım.",
    technologies: ["Python", "Excel", "Photoshop", "AutoCAD"],
  },
  {
    company: "Rosecasa",
    role: "E-commerce & Web Content Assistant",
    period: "Oct 2024 - Apr 2025",
    location: "Üsküdar/İstanbul",
    description:
      "WordPress tabanlı e-ticaret web sitelerini sürdürdüm ve güncelledim. Trendyol, N11 ve Hepsiburada gibi platformlarda deneyim kazandım. Reklam operasyonları, görsel içerik oluşturma ve ürün listeleme konularında destek sağladım.",
    technologies: ["WordPress", "E-commerce", "Content Management"],
  },
  {
    company: "Rappider",
    role: "Frontend Developer Intern",
    period: "Jun 2023 - Sep 2023",
    location: "Levent/İstanbul",
    description:
      "Agile bir ortamda Angular kullanarak dinamik UI bileşenleri geliştirdim. Kullanıcı dostu ve görsel olarak çekici arayüzler oluşturmaya odaklandım.",
    technologies: ["Angular", "TypeScript", "UI/UX"],
  },
  {
    company: "Jotform",
    role: "UI Developer Intern",
    period: "Jun 2021 - Sep 2021",
    location: "Beytepe/Ankara",
    description:
      "React Native kullanarak mobil uygulama UI'ları oluşturdum ve UI/UX en iyi uygulamalarını uyguladım. Uygulama görsellerini birden fazla cihazda test ettim ve optimize ettim. Tasarımcılar ve geliştiricilerle yakın çalışarak tutarlılık ve kullanılabilirliği korudum.",
    technologies: ["React Native", "UI/UX", "Mobile Development"],
  },
];

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
  return (
    <SectionWrapper id="experience" className="relative">
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block text-sm text-white/50 uppercase tracking-widest mb-4"
        >
          Deneyim
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
        >
          İş Geçmişim
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/60 max-w-2xl mx-auto"
        >
          Kariyer yolculuğumda edindiğim deneyimler ve çalıştığım projeler
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
          {experiences.map((exp, index) => (
            <motion.div key={exp.company} variants={itemVariants}>
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

                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs rounded-full bg-white/10 text-white/70 border border-white/10"
                    >
                      {tech}
                    </span>
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

