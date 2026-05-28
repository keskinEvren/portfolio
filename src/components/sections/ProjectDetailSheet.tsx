"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import {
  FileText,
  Layout,
  Calendar,
  Network,
  BookOpen,
  Presentation,
  Link as LinkIcon,
  Award,
  Clock,
  Briefcase,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  FileDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PMDeliverable {
  name: string;
  type: string;
  description: string;
  url: string;
}

interface PMDetails {
  role: string;
  timeline: string;
  problem: string;
  solution: string;
  metrics: string[];
  deliverables: PMDeliverable[];
}

interface ProjectDetailSheetProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    pmDetails?: PMDetails;
  } | null;
}

const getDeliverableIcon = (type: string) => {
  switch (type) {
    case "prd":
      return <FileText className="w-5 h-5 text-white/70" />;
    case "wireframe":
      return <Layout className="w-5 h-5 text-white/70" />;
    case "roadmap":
      return <Calendar className="w-5 h-5 text-white/70" />;
    case "flow":
      return <Network className="w-5 h-5 text-white/70" />;
    case "research":
      return <BookOpen className="w-5 h-5 text-white/70" />;
    case "presentation":
      return <Presentation className="w-5 h-5 text-white/70" />;
    default:
      return <LinkIcon className="w-5 h-5 text-white/50" />;
  }
};

export function ProjectDetailSheet({
  isOpen,
  onClose,
  project,
}: ProjectDetailSheetProps) {
  const t = useTranslations("Projects");
  const [activeTab, setActiveTab] = useState<"overview" | "deliverables">("overview");

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).lenis) {
      if (isOpen) {
        (window as any).lenis.stop();
      } else {
        (window as any).lenis.start();
      }
    }
    return () => {
      if (typeof window !== "undefined" && (window as any).lenis) {
        (window as any).lenis.start();
      }
    };
  }, [isOpen]);

  if (!project || !project.pmDetails) return null;

  const { pmDetails } = project;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        className={cn(
          "w-full sm:max-w-2xl h-full border-l border-white/10 bg-black/40 backdrop-blur-3xl text-white",
          "p-0 flex flex-col focus:outline-none pointer-events-auto"
        )}
        side="right"
      >
        {/* Glow Effects in Sheet Background */}
        <div className="absolute top-[-10%] right-[-10%] w-[350px] h-[350px] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[350px] h-[350px] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none" />

        {/* Scrollable Container */}
        <div
          className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8"
          style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-y" }}
          data-lenis-prevent
        >
          {/* Header */}
          <SheetHeader className="mb-6 text-left relative z-10">
            <div className="flex flex-wrap gap-2 mb-3">
              {project.technologies.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-3xs font-medium rounded-full bg-white/5 border border-white/10 text-white/60"
                >
                  {tech}
                </span>
              ))}
            </div>
            <SheetTitle className="text-2xl md:text-3xl font-bold text-white tracking-tight pr-8">
              {project.title}
            </SheetTitle>
            <SheetDescription className="text-white/40 text-xs md:text-sm mt-1">
              {t("pm_sheet_subtitle")}
            </SheetDescription>
          </SheetHeader>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10">
              <div className="p-2 rounded-lg bg-white/10 text-white/70">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <p className="text-3xs text-white/40 uppercase tracking-wider">
                  {t("pm_role_label")}
                </p>
                <p className="text-xs font-semibold text-white/90 line-clamp-1">
                  {pmDetails.role}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10">
              <div className="p-2 rounded-lg bg-white/10 text-white/70">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-3xs text-white/40 uppercase tracking-wider">
                  {t("pm_timeline_label")}
                </p>
                <p className="text-xs font-semibold text-white/90">
                  {pmDetails.timeline}
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex border-b border-white/10 mb-8 relative z-10">
            <button
              onClick={() => setActiveTab("overview")}
              className={cn(
                "flex-1 py-3 text-sm font-medium border-b-2 transition-all outline-none",
                activeTab === "overview"
                  ? "border-white text-white"
                  : "border-transparent text-white/40 hover:text-white/70"
              )}
            >
              {t("pm_tab_overview")}
            </button>
            <button
              onClick={() => setActiveTab("deliverables")}
              className={cn(
                "flex-1 py-3 text-sm font-medium border-b-2 transition-all outline-none",
                activeTab === "deliverables"
                  ? "border-white text-white"
                  : "border-transparent text-white/40 hover:text-white/70"
              )}
            >
              {t("pm_tab_deliverables")} ({pmDetails.deliverables?.length || 0})
            </button>
          </div>

          {/* Tab Contents */}
          <AnimatePresence mode="wait">
            {activeTab === "overview" ? (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="space-y-8 relative z-10"
              >
                {/* Problem Statement */}
                <div className="space-y-3">
                  <h4 className="text-xs uppercase tracking-widest text-white/45 mb-3 block font-mono">
                    {t("pm_problem_title")}
                  </h4>
                  <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 leading-relaxed text-sm text-white/70 font-light shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                    {pmDetails.problem}
                  </div>
                </div>

                {/* Solution Statement */}
                <div className="space-y-3">
                  <h4 className="text-xs uppercase tracking-widest text-white/45 mb-3 block font-mono">
                    {t("pm_solution_title")}
                  </h4>
                  <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 leading-relaxed text-sm text-white/70 font-light shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                    {pmDetails.solution}
                  </div>
                </div>

                {/* Key Metrics / Outcomes */}
                {pmDetails.metrics && pmDetails.metrics.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-xs uppercase tracking-widest text-white/45 mb-3 block font-mono">
                      {t("pm_metrics_title")}
                    </h4>
                    <ul className="space-y-3">
                      {pmDetails.metrics.map((metric, index) => (
                        <motion.li
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          key={index}
                          className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all"
                        >
                          <div className="p-1 rounded-md bg-white/10 text-white/70 mt-0.5">
                            <Award className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-sm text-white/85 font-light leading-relaxed">
                            {metric}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="deliverables"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="space-y-6 relative z-10"
              >
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-xs uppercase tracking-widest text-white/45 mb-3 block font-mono">
                    {t("pm_deliverables_title")}
                  </h4>
                </div>

                {pmDetails.deliverables && pmDetails.deliverables.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {pmDetails.deliverables.map((doc, index) => (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        key={index}
                        className="group flex flex-col p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all relative overflow-hidden"
                      >
                        {/* Interactive glow inside the deliverable card */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.01] rounded-full blur-xl group-hover:bg-white/[0.03] transition-all pointer-events-none" />

                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-white shadow-md">
                              {getDeliverableIcon(doc.type)}
                            </div>
                            <div>
                              <span className="px-2 py-0.5 text-3xs font-semibold uppercase tracking-wider rounded-full bg-white/10 text-white/70 border border-white/5 mb-1 inline-block">
                                {doc.type}
                              </span>
                              <h5 className="text-sm font-semibold text-white transition-colors">
                                {doc.name}
                              </h5>
                            </div>
                          </div>
                        </div>

                        <p className="text-xs text-white/50 leading-relaxed font-light mb-4 pl-0">
                          {doc.description}
                        </p>

                        <Button
                          className={cn(
                            "w-full rounded-xl py-2 bg-white text-black hover:bg-white/90 transition-all text-xs font-medium flex items-center justify-center gap-2"
                          )}
                          asChild
                        >
                          <a href={doc.url} target="_blank" rel="noopener noreferrer">
                            {t("pm_view_doc_btn")}
                            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </a>
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 p-6 rounded-2xl border border-dashed border-white/10 bg-white/[0.02]">
                    <FileText className="w-10 h-10 text-white/20 mx-auto mb-3" />
                    <p className="text-sm text-white/40">{t("pm_no_deliverables")}</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </SheetContent>
    </Sheet>
  );
}
