"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Download } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations('Hero');

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-32 pb-24 -mt-16"
    >
      <div className="text-center max-w-4xl mx-auto w-full relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight"
        >
          {t('greeting')}{" "}
          <span className="text-gradient bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            {t('name')}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl text-white/70 mb-6 max-w-2xl mx-auto leading-relaxed"
        >
          <span className="font-semibold text-white/90">{t('title')}</span>
          <br />
          <span className="text-sm text-white/60">{t('subtitle')}</span>
          <br /><br />
          {t('description')}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="text-base text-white/50 mb-10"
        >
          📍 {t('location')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="#projects">
            <Button
              size="lg"
              className="rounded-full px-8 py-6 bg-white text-black hover:bg-white/90 font-medium text-base group"
            >
              {t('cta_projects')}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="#contact">
            <Button
              size="lg"
              variant="ghost"
              className="rounded-full px-8 py-6 bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 font-medium text-base"
            >
              {t('cta_contact')}
            </Button>
          </Link>
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              variant="ghost"
              className="rounded-full px-8 py-6 bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 font-medium text-base"
            >
              <Download className="mr-2 w-4 h-4" />
              {t('cta_download_cv')}
            </Button>
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-xs text-white/50 tracking-[0.3em] uppercase">
          {t('scroll')}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
