export default {
  type: "object",
  properties: {
    title: { type: "string", minLength: 3, maxLength: 255 },
    description: { type: "string", minLength: 3, maxLength: 1024 },
    price: { type: "number" },
    count: { type: "number" },
  },
  required: ["title", "description", "price", "count"],
} as const;
