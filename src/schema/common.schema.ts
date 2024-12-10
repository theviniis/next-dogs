import { z } from "zod";
import refiner from "./refiners/file-weight.refiner";

export const emailSchema = z.string().email();

export type Email = z.infer<typeof emailSchema>;

export const usernameSchema = z.string().min(3).max(40);

export type Username = z.infer<typeof usernameSchema>;

export const passwordSchema = z.string().min(3);

export type Password = z.infer<typeof passwordSchema>;

export const fileSchema = z.instanceof(File).refine(refiner.handler, refiner.message);

export type FileSchema = z.infer<typeof fileSchema>;
