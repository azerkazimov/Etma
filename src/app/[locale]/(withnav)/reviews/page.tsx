"use client";

import { Button } from "@/components/ui/button";
import { useCounter } from "@/features/store/use-counter";
import { useEffect, useState } from "react";
import { ReviewSchema } from "../../(withoutnav)/dashboard/reviews/schema";

export default function Reviews() {
  const { counter, increment, decrement } = useCounter();
  const [reviews, setReviews] = useState<ReviewSchema[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/reviews");
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className=" container mx-auto flex h-screen items-center justify-center gap-2">
      {reviews.map((review) => (
        <div key={review.rating}>
          <h3>{review.content}</h3>
          <p>{review.rating}</p>
        </div>
      ))}
      <Button onClick={decrement}>-</Button>
      <span>{counter}</span>
      <Button onClick={increment}>+</Button>
    </div>
  );
}
