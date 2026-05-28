export const localeString = {
  title: "Localized String",
  name: "localeString",
  type: "object",
  fields: [
    { title: "Turkish (TR)", name: "tr", type: "string" },
    { title: "English (EN)", name: "en", type: "string" },
  ],
};

export const localeText = {
  title: "Localized Text",
  name: "localeText",
  type: "object",
  fields: [
    { title: "Turkish (TR)", name: "tr", type: "text", rows: 4 },
    { title: "English (EN)", name: "en", type: "text", rows: 4 },
  ],
};

export const localeArray = {
  title: "Localized Array of Strings",
  name: "localeArray",
  type: "object",
  fields: [
    {
      title: "Turkish (TR)",
      name: "tr",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      title: "English (EN)",
      name: "en",
      type: "array",
      of: [{ type: "string" }],
    },
  ],
};
