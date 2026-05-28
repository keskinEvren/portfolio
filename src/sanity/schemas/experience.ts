export const experience = {
  title: "Professional Experience",
  name: "experience",
  type: "document",
  fields: [
    { title: "Company Name", name: "company", type: "string" },
    { title: "Bilingual Job Role", name: "role", type: "localeString" },
    { title: "Bilingual Duration Period", name: "period", type: "localeString" },
    { title: "Bilingual Location", name: "location", type: "localeString" },
    { title: "Bilingual Description", name: "description", type: "localeText" },
    {
      title: "Skills / Tags",
      name: "tags",
      type: "array",
      of: [{ type: "string" }],
      description: "Technology or capability tags (e.g. Product Management, Agile, SQL)",
    },
    {
      title: "Display Order",
      name: "order",
      type: "number",
      description: "Order value for lists (lower numbers display first, e.g. 1, 2, 3)",
    },
  ],
};
