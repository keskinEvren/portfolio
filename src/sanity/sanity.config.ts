import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder-id";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "default",
  title: "Portfolio CMS Studio",

  projectId: projectId,
  dataset: dataset,
  basePath: "/studio", // Sets unified base route across locales

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
