import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";

export async function POST(req: Request) {
  const { content, rating } = await req.json();

  const review = await prisma.review.create({
    data: { content, rating },
  });

  return NextResponse.json(review);
}

export async function GET() {
    const reviews = await prisma.review.findMany();

    return NextResponse.json(reviews);
}