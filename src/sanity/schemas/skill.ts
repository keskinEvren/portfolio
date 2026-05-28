export const skill = {
  title: "Tech Capabilities & Skills",
  name: "skill",
  type: "document",
  fields: [
    { title: "Skill / Competency Title", name: "title", type: "string" },
    { title: "Bilingual Description", name: "description", type: "localeText" },
    {
      title: "Display Order",
      name: "order",
      type: "number",
      description: "Order value for lists (e.g. 1, 2, 3)",
    },
  ],
};
