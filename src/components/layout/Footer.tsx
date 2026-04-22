"use client";

import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations('Footer');
  
  return (
    <footer id="contact" className="relative border-t border-white/10 bg-black/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} Evren Keskin
          </p>
          <p className="text-sm text-white/40">
            {t('title')}
          </p>
        </div>
      </div>
    </footer>
  );
}
