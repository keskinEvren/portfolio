"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity/sanity.config";

export default function StudioPage() {
  return (
    <div className="fixed inset-0 z-9999 bg-black text-white pointer-events-auto">
      <NextStudio config={config} />
    </div>
  );
}
