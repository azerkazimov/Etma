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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ReviewSchema>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      content: "",
      rating: 1,
    },
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setError(null);
      const response = await fetch("/api/reviews");
      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }
      const reviewsData = await response.json();
      setReviews(reviewsData);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setError("Failed to load reviews. Please try again.");
    }
  };

  const deleteReview = async (id: number) => {
    try {
      setError(null);
      setSuccess(null);
      const response = await fetch(`/api/reviews/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setReviews(reviews.filter((review) => review.id !== id));
        setSuccess("Review deleted successfully!");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to delete review");
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      setError("Failed to delete review. Please try again.");
    }
  };

  const onSubmit = async (data: ReviewSchema) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

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
        setSuccess(editingReview ? "Review updated successfully!" : "Review created successfully!");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to save review");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to save review. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const editReview = (review: ReviewWithId) => {
    setEditingReview(review);
    setValue("content", review.content);
    setValue("rating", Number(review.rating));
  };

  const cancelEdit = () => {
    setEditingReview(null);
    reset();
  };

  return (
    <div>
      <h1>Dashboard Reviews</h1>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded">
          {success}
        </div>
      )}
      
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
          <Input type="number" id="rating" min="1" max="5" {...register("rating", { valueAsNumber: true })} />
          {errors.rating && (
            <span className="text-red-500">{errors.rating.message}</span>
          )}
        </div>
        <div className="flex gap-2 mt-4">
          <Button type="submit" className="cursor-pointer" disabled={isLoading}>
            {isLoading ? "Loading..." : editingReview ? "Update" : "Create"}
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
