"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { GlassCard } from "@/components/shared/GlassCard";
import { Mail, Linkedin, Github, Send, Phone } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

const socialLinks = [
  {
    icon: Mail,
    label: "Email",
    href: "mailto:evrenkeskin0998@gmail.com",
    text: "evrenkeskin0998@gmail.com",
  },
  {
    icon: Phone,
    label: "Telefon",
    href: "tel:+905071102287",
    text: "+90 507 110 22 87",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/evren-keskin-099065127",
    text: "linkedin.com/in/evren-keskin-099065127",
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/keskinEvren",
    text: "github.com/keskinEvren",
  },
];

export function CTA() {
  const t = useTranslations('CTA');

  return (
    <SectionWrapper id="contact" className="relative">
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

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard className="p-8 h-full">
            <h3 className="text-2xl font-semibold text-white mb-6">
              {t('contact_info')}
            </h3>
            <div className="space-y-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <social.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-white/50">
                      {social.label === "Email" ? t('email_label') : 
                       social.label === "Telefon" ? t('phone_label') : 
                       social.label === "LinkedIn" ? t('linkedin_label') : 
                       t('github_label')}
                    </p>
                    <p className="text-white/90">{social.text}</p>
                  </div>
                </Link>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard className="p-8 h-full">
            <h3 className="text-2xl font-semibold text-white mb-6">
              {t('send_message')}
            </h3>
            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder={t('name_placeholder')}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder={t('email_placeholder')}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder={t('phone_placeholder')}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
              <div>
                <textarea
                  placeholder={t('message_placeholder')}
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:border-white/30 transition-colors resize-none"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full rounded-full px-8 py-6 bg-white text-black hover:bg-white/90 font-medium text-base group"
              >
                {t('submit_btn')}
                <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </GlassCard>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
