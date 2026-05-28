export const project = {
  title: "Projects & PM Case Studies",
  name: "project",
  type: "document",
  fields: [
    { title: "Project Title", name: "title", type: "string" },
    { title: "Bilingual Short Summary", name: "description", type: "localeText" },
    {
      title: "Technologies Used",
      name: "technologies",
      type: "array",
      of: [{ type: "string" }],
    },
    { title: "GitHub URL", name: "github", type: "string", description: "Set empty or '#' if not available" },
    { title: "Live Demo URL", name: "live", type: "string", description: "Set empty or '#' if not available" },
    {
      title: "Display Order",
      name: "order",
      type: "number",
      description: "Order value for dynamic galleries (e.g. 1, 2, 3)",
    },
    {
      title: "Enable PM Case Study Details?",
      name: "hasPmDetails",
      type: "boolean",
      initialValue: true,
    },
    {
      title: "PM Retrospective Details",
      name: "pmDetails",
      type: "object",
      hidden: ({ document }: any) => !document?.hasPmDetails,
      fields: [
        { title: "Bilingual PM Role", name: "role", type: "localeString" },
        { title: "Bilingual PM Timeline", name: "timeline", type: "localeString" },
        { title: "Bilingual Problem Statement", name: "problem", type: "localeText" },
        { title: "Bilingual Solution Summary", name: "solution", type: "localeText" },
        { title: "Bilingual Achievements & Metrics", name: "metrics", type: "localeArray" },
        {
          title: "PM Deliverables & Work Products",
          name: "deliverables",
          type: "array",
          of: [
            {
              title: "PM Deliverable Document",
              name: "deliverable",
              type: "object",
              fields: [
                { title: "Bilingual Name", name: "name", type: "localeString" },
                {
                  title: "Document Type",
                  name: "type",
                  type: "string",
                  options: {
                    list: [
                      { title: "Product Requirements Document (PRD)", value: "prd" },
                      { title: "SaaS Wireframe / Mockup", value: "wireframe" },
                      { title: "Product Roadmap", value: "roadmap" },
                      { title: "User / Data Flow Diagram", value: "flow" },
                      { title: "Market & UX Research Spec", value: "research" },
                      { title: "Slides / Presentation", value: "presentation" },
                      { title: "General Document / Link", value: "link" },
                    ],
                  },
                },
                { title: "Bilingual Description", name: "description", type: "localeText" },
                { title: "Document URL (Google Drive / Figma / Miro)", name: "url", type: "url" },
              ],
            },
          ],
        },
      ],
    },
  ],
};
