"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { GlassCard } from "@/components/shared/GlassCard";
import { Mail, Linkedin, Github, Send, Phone, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

const FORMSPREE_URL = "https://formspree.io/f/xnjkvnog";

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

type FormStatus = "idle" | "submitting" | "success" | "error";

export function CTA() {
  const t = useTranslations('CTA');
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        const data = await response.json();
        const msg = data?.errors?.map((err: { message: string }) => err.message).join(", ") || t("form_error_generic");
        setErrorMessage(msg);
        setStatus("error");
      }
    } catch {
      setErrorMessage(t("form_error_network"));
      setStatus("error");
    }
  };

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

            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-12 space-y-4"
              >
                <div className="p-3 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <CheckCircle className="w-8 h-8 text-emerald-400" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-white">{t("form_success_title")}</p>
                  <p className="text-sm text-white/50 mt-1">{t("form_success_desc")}</p>
                </div>
                <Button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-4 rounded-full px-6 py-2 bg-white/10 border border-white/20 text-white hover:bg-white/20 text-sm cursor-pointer"
                >
                  {t("form_send_another")}
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot spam protection */}
                <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

                <div>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder={t('name_placeholder')}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder={t('email_placeholder')}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder={t('phone_placeholder')}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    required
                    placeholder={t('message_placeholder')}
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:border-white/30 transition-colors resize-none"
                  />
                </div>

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </motion.div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  disabled={status === "submitting"}
                  className="w-full rounded-full px-8 py-6 bg-white text-black hover:bg-white/90 font-medium text-base group disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                      {t("form_submitting")}
                    </>
                  ) : (
                    <>
                      {t('submit_btn')}
                      <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </GlassCard>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
