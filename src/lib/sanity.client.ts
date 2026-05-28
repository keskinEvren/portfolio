import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = "2024-03-01";

// Create client conditionally; if Project ID is not present, we disable CMS queries safely
export const sanityClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false, // Ensures fresh content is loaded
    })
  : null;

// Helper to safely execute queries
async function runQuery<T>(query: string, params: Record<string, any>): Promise<T | null> {
  if (!sanityClient) return null;
  try {
    return await sanityClient.fetch<T>(query, params);
  } catch (error) {
    console.warn("Sanity fetch failed, falling back to local files:", error);
    return null;
  }
}

export interface LocalizedPersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  description: string;
  location: string;
  cvLink: string;
  social?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export interface LocalizedExperience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  tags?: string[];
}

export interface LocalizedPMDeliverable {
  name: string;
  type: string;
  description: string;
  url: string;
}

export interface LocalizedPMDetails {
  role: string;
  timeline: string;
  problem: string;
  solution: string;
  metrics: string[];
  deliverables: LocalizedPMDeliverable[];
}

export interface LocalizedProject {
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  live?: string;
  hasPmDetails: boolean;
  pmDetails?: LocalizedPMDetails;
}

export interface LocalizedSkill {
  title: string;
  description: string;
}

export async function getPersonalInfo(locale: string): Promise<LocalizedPersonalInfo | null> {
  const query = `*[_type == "personalInfo"][0] {
    name,
    cvLink,
    "title": title[$locale],
    "subtitle": subtitle[$locale],
    "description": description[$locale],
    "location": location[$locale],
    social
  }`;
  return runQuery<LocalizedPersonalInfo>(query, { locale });
}

export async function getExperienceList(locale: string): Promise<LocalizedExperience[] | null> {
  const query = `*[_type == "experience"] | order(order asc) {
    company,
    tags,
    "role": role[$locale],
    "period": period[$locale],
    "location": location[$locale],
    "description": description[$locale]
  }`;
  return runQuery<LocalizedExperience[]>(query, { locale });
}

export async function getProjectsList(locale: string): Promise<LocalizedProject[] | null> {
  const query = `*[_type == "project"] | order(order asc) {
    title,
    technologies,
    github,
    live,
    hasPmDetails,
    "description": description[$locale],
    "pmDetails": pmDetails {
      "role": role[$locale],
      "timeline": timeline[$locale],
      "problem": problem[$locale],
      "solution": solution[$locale],
      "metrics": metrics[$locale],
      "deliverables": deliverables[].deliverable {
        "name": name[$locale],
        "description": description[$locale],
        type,
        url
      }
    }
  }`;
  return runQuery<LocalizedProject[]>(query, { locale });
}

export async function getSkillsList(locale: string): Promise<LocalizedSkill[] | null> {
  const query = `*[_type == "skill"] | order(order asc) {
    title,
    "description": description[$locale]
  }`;
  return runQuery<LocalizedSkill[]>(query, { locale });
}
