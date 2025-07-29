import * as z from "zod";

export const ComponentsSchema = z.array(
  z.object({
    char: z.string().length(1),
    kana: z.string().min(1),
  })
);

export type Components = z.infer<typeof ComponentsSchema>;
