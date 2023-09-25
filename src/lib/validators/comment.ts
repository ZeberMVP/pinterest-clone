import { z } from "zod";

export const CommentValidator = z.object({
  text: z.string().nonempty({ message: "Comment must not be empty" }),
  pinId: z.string().nonempty({ message: "Pin ID must not be empty" }),
});

export type PinCreationRequest = z.infer<typeof CommentValidator>;
