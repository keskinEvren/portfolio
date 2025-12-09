"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/shared/GlassCard";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { cn } from "@/lib/utils";

const projects = [
  {
    title: "Kariyer Takip Portali",
    description:
      "Lisans öğrencilerinin staj süreçlerini daha organize, şeffaf ve verimli bir şekilde yönetmek için geliştirilmiş web tabanlı bir staj ve kariyer takip platformu.",
    technologies: [".NET", "Razor Pages", "PostgreSQL"],
    github: "https://github.com/keskinEvren",
    live: "https://github.com/keskinEvren",
    featured: true,
  },
  {
    title: "Online Trading App",
    description:
      "Kullanıcıların portföylerini yönetebileceği, hisse alıp satabileceği ve işlem geçmişini görüntüleyebileceği bir online trading uygulaması simülasyonu.",
    technologies: [".NET", "React", "PostgreSQL"],
    github: "https://github.com/keskinEvren",
    live: "https://github.com/keskinEvren",
    featured: false,
  },
  {
    title: "E-Commerce Dashboard",
    description:
      "WordPress tabanlı e-ticaret siteleri için geliştirilmiş yönetim paneli. Ürün yönetimi, sipariş takibi ve analitik özellikleri içeren kapsamlı bir dashboard.",
    technologies: ["WordPress", "PHP", "JavaScript", "MySQL"],
    github: "https://github.com/keskinEvren",
    live: "https://github.com/keskinEvren",
    featured: false,
  },
  {
    title: "Task Management System",
    description:
      "Takım çalışması için tasarlanmış görev yönetim sistemi. Real-time güncellemeler, dosya paylaşımı ve proje takibi özellikleri ile verimli iş akışı sağlıyor.",
    technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
    github: "https://github.com/keskinEvren",
    live: "https://github.com/keskinEvren",
    featured: false,
  },
  {
    title: "Weather Forecast App",
    description:
      "Hava durumu tahmin uygulaması. API entegrasyonu ile gerçek zamanlı veri çekme, detaylı hava durumu bilgileri ve konum bazlı tahminler sunuyor.",
    technologies: ["React", "JavaScript", "OpenWeather API", "Chart.js"],
    github: "https://github.com/keskinEvren",
    live: "https://github.com/keskinEvren",
    featured: false,
  },
  {
    title: "Portfolio Website",
    description:
      "Glassmorphism tasarımı ile modern portfolio web sitesi. Next.js, TypeScript ve Framer Motion kullanılarak geliştirilmiş responsive ve animasyonlu bir site.",
    technologies: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    github: "https://github.com/keskinEvren",
    live: "https://github.com/keskinEvren",
    featured: false,
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function Projects() {
  return (
    <SectionWrapper id="projects" className="relative">
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block text-sm text-white/50 uppercase tracking-widest mb-4"
        >
          Portfolio
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
        >
          Projelerim
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/60 max-w-2xl mx-auto"
        >
          Son dönemde geliştirdiğim projeler ve kullandığım teknolojiler
        </motion.p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {projects.map((project) => (
          <motion.div key={project.title} variants={itemVariants}>
            <GlassCard
              className={cn(
                "p-6 h-full flex flex-col relative group",
                project.featured &&
                  "bg-white/10 border-white/30 md:col-span-2 lg:col-span-1"
              )}
            >
              {project.featured && (
                <div className="absolute -top-3 left-6">
                  <span className="px-3 py-1 text-xs font-medium bg-white text-black rounded-full">
                    Featured
                  </span>
                </div>
              )}

              <div className="mb-4">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed mb-4">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs rounded-full bg-white/10 text-white/70 border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 mt-auto">
                <Button
                  className="flex-1 rounded-full py-2 bg-white/10 text-white border border-white/20 hover:bg-white/20 text-sm"
                  asChild
                >
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </a>
                </Button>
                <Button
                  className="flex-1 rounded-full py-2 bg-white text-black hover:bg-white/90 text-sm"
                  asChild
                >
                  <a href={project.live} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </a>
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}

