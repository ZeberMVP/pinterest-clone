import { z } from "zod";

export const PinValidator = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be longer than 3 characters" })
    .max(280, { message: "Title must be less than 280 characters" }),
  description: z
    .string()
    .min(3, { message: "Description must be longer than 3 characters" })
    .max(8000, { message: "Description must be less than 8000 characters" }),
  image: z.string().url({ message: "Image must be a valid URL" }),
});

export type PinCreationRequest = z.infer<typeof PinValidator>;
