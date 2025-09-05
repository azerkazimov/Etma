"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ReviewWithId } from "../../../(withoutnav)/dashboard/reviews/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function ReviewsIdPage() {
  const { id } = useParams();
  const router = useRouter();
  const [review, setReview] = useState<ReviewWithId | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReview = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const response = await fetch(`/api/reviews/${id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            setError("Review not found");
          } else {
            setError("Failed to fetch review");
          }
          return;
        }
        
        const data = await response.json();
        setReview(data);
      } catch (error) {
        console.error("Error fetching review:", error);
        setError("Failed to load review");
      } finally {
        setLoading(false);
      }
    };

    fetchReview();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-center items-center h-64">
          <p className="text-lg text-muted-foreground">Loading review...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <p className="text-lg text-red-600">{error}</p>
          <Button onClick={() => router.back()} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  if (!review) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <p className="text-lg text-muted-foreground">Review not found</p>
          <Button onClick={() => router.back()} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Button onClick={() => router.back()} variant="outline" size="sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Reviews
        </Button>
      </div>
      
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Review #{review.id}</span>
            <div className="flex items-center">
              <span className="text-yellow-500 text-xl">★</span>
              <span className="ml-1 text-lg font-semibold">{review.rating}</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-sm text-muted-foreground mb-2">Review Content:</h3>
              <p className="text-base leading-relaxed">{review.content}</p>
            </div>
            
            {review.createdAt && (
              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  Created: {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
