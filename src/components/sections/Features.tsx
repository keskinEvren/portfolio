"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/shared/GlassCard";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { Code, Database, Smartphone, Palette, Globe, Server } from "lucide-react";

const skills = [
  {
    icon: Code,
    title: "Programming Languages",
    description:
      "Python, C# ve JavaScript ile güçlü programlama temelleri. Temiz ve ölçeklenebilir kod yazma konusunda deneyimliyim.",
  },
  {
    icon: Server,
    title: "Web Frameworks",
    description:
      "ASP.NET Core ve React.js ile modern web uygulamaları geliştiriyorum. Backend ve frontend entegrasyonu konusunda deneyimliyim.",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description:
      "React Native ile mobil uygulama geliştirme deneyimim var. UI/UX best practices uygulayarak kullanıcı dostu arayüzler oluşturuyorum.",
  },
  {
    icon: Database,
    title: "Database & Data",
    description:
      "PostgreSQL ile veritabanı yönetimi. NumPy ve Pandas ile veri analizi ve işleme konularında deneyimliyim.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Kullanıcı odaklı tasarım prensipleriyle modern ve kullanışlı arayüzler tasarlıyorum. Responsive ve erişilebilir tasarımlar oluşturuyorum.",
  },
  {
    icon: Globe,
    title: "Full Stack Development",
    description:
      ".NET ve React ile end-to-end web uygulama geliştirme. Frontend ve backend entegrasyonu konusunda kapsamlı deneyime sahibim.",
  },
];

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

export function Features() {
  return (
    <SectionWrapper id="skills" className="relative">
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block text-sm text-white/50 uppercase tracking-widest mb-4"
        >
          Yetenekler
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
        >
          Teknoloji Stack'im
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/60 max-w-2xl mx-auto"
        >
          Modern teknolojilerle güçlü ve ölçeklenebilir çözümler üretiyorum
        </motion.p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {skills.map((skill, index) => (
          <motion.div key={skill.title} variants={itemVariants}>
            <GlassCard className="p-6 h-full group cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors">
                <skill.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {skill.title}
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">
                {skill.description}
              </p>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
