import { z } from "zod";

// Schema for creating/updating reviews (without id)
export const reviewSchema = z.object({
    content: z.string().min(1, { message: "Content is required" }),
    rating: z.number().min(1, { message: "Rating must be at least 1" }).max(5, { message: "Rating must be at most 5" }),
});

// Schema for review with id (used for display)
export const reviewWithIdSchema = reviewSchema.extend({
    id: z.number(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
});

export type ReviewSchema = z.infer<typeof reviewSchema>;
export type ReviewWithId = z.infer<typeof reviewWithIdSchema>;