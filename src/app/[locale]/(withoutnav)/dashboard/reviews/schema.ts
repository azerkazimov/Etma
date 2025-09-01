import { z } from "zod";

export const reviewSchema = z.object({
    content: z.string().min(1, { message: "Content is required" }),
    rating: z.string().min(1, { message: "Rating is required" }),
});

export type ReviewSchema = z.infer<typeof reviewSchema>;