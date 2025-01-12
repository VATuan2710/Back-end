import { z } from "zod";

const categorySchema = z.object({
  title: z.string().min(6, "Khong du ky tu"),
  description: z.string().optional(),
  slug: z.string().optional(),
});

export default categorySchema;
