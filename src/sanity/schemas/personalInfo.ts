export const personalInfo = {
  title: "Personal Info & Profile",
  name: "personalInfo",
  type: "document",
  fields: [
    { title: "Full Name", name: "name", type: "string" },
    { title: "Bilingual Title", name: "title", type: "localeString" },
    { title: "Bilingual Subtitle", name: "subtitle", type: "localeString" },
    { title: "Bilingual Biography", name: "description", type: "localeText" },
    { title: "Bilingual Location", name: "location", type: "localeString" },
    { title: "CV Download Link (Google Drive / PDF)", name: "cvLink", type: "url" },
    {
      title: "Social Links",
      name: "social",
      type: "object",
      fields: [
        { title: "GitHub URL", name: "github", type: "url" },
        { title: "LinkedIn URL", name: "linkedin", type: "url" },
        { title: "Twitter URL", name: "twitter", type: "url" },
      ],
    },
  ],
};
