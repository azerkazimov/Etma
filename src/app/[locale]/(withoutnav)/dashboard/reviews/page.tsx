"use client";

import { useForm } from "react-hook-form";
import { reviewSchema, ReviewSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function DashboardReviews() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewSchema>({
    resolver: zodResolver(reviewSchema),
  });

  const onSubmit = async (data: ReviewSchema) => {
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const review = await response.json();
      console.log(review);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Dashboard Reviews</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="content">Content</label>
          <Input type="text" id="content" {...register("content")} />
          {errors.content && <span className="text-red-500">{errors.content.message}</span>}
        </div>
        <div>
          <label htmlFor="rating">Rating</label>
          <Input type="string" id="rating" {...register("rating")} />
          {errors.rating && <span className="text-red-500">{errors.rating.message}</span>}
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
