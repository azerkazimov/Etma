"use client";

import { useForm } from "react-hook-form";
import { reviewSchema, ReviewSchema, ReviewWithId } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function DashboardReviews() {
  const [reviews, setReviews] = useState<ReviewWithId[]>([]);
  const [editingReview, setEditingReview] = useState<ReviewWithId | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ReviewSchema>({
    resolver: zodResolver(reviewSchema),
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch("/api/reviews");
      const reviewsData = await response.json();
      setReviews(reviewsData);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const deleteReview = async (id: number) => {
    try {
      const response = await fetch(`/api/reviews/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setReviews(reviews.filter((review) => review.id !== id));
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const onSubmit = async (data: ReviewSchema) => {

    try {
      const method = editingReview ? "PUT" : "POST";
              const url = editingReview 
          ? `/api/reviews/${editingReview.id}`
          : "/api/reviews";
        const body = data;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        
        // Refresh reviews list
        await fetchReviews();
        
        // Reset form and editing state
        reset();
        setEditingReview(null);
      } else {
        console.error("Error submitting review");
      }
    } catch (error) {
      console.error("Error:", error);
    } 
  };

  const editReview = (review: ReviewWithId) => {
    setEditingReview(review);
    setValue("content", review.content);
    setValue("rating", review.rating);
  };

  const cancelEdit = () => {
    setEditingReview(null);
    reset();
  };

  return (
    <div>
      <h1>Dashboard Reviews</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="content">Content</label>
          <Input type="text" id="content" {...register("content")} />
          {errors.content && (
            <span className="text-red-500">{errors.content.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="rating">Rating</label>
          <Input type="text" id="rating" {...register("rating")} />
          {errors.rating && (
            <span className="text-red-500">{errors.rating.message}</span>
          )}
        </div>
        <div className="flex gap-2 mt-4">
          <Button type="submit">
            {editingReview ? "Update" : "Create"}
          </Button>
          {editingReview && (
            <Button type="button" variant="outline" onClick={cancelEdit}>
              Cancel
            </Button>
          )}
        </div>
      </form>

      <div className="mt-4">
        {reviews.map((review) => (
          <div key={review.id} className="mb-4 p-4 border rounded">
            <p><strong>Content:</strong> {review.content}</p>
            <p><strong>Rating:</strong> {review.rating}</p>
            <div className="flex gap-2 mt-2">
              <Button 
                onClick={() => editReview(review)}
                variant="outline"
                size="sm"
              >
                Edit
              </Button>
              <Button 
                onClick={() => deleteReview(review.id)}
                variant="destructive"
                size="sm"
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
