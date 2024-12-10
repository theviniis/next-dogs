import { z } from "zod";
import { fileSchema, usernameSchema } from "./common.schema";

export const photoPostSchema = z.object({
  nome: usernameSchema,
  peso: z.string().transform((val) => parseFloat(val)),
  idade: z.string().transform((val) => parseFloat(val)),
  img: fileSchema,
});

export type PhotoPostSchema = z.infer<typeof photoPostSchema>;
