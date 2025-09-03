import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const review = await prisma.review.findUnique({ where: { id } });
  return NextResponse.json(review);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { content, rating } = await req.json();
  const id = parseInt(params.id);

  if (!id || isNaN(id)) {
    return NextResponse.json({ error: 'Invalid review ID' }, { status: 400 });
  }

  try {
    const review = await prisma.review.update({
      where: { id },
      data: { content, rating },
    });
    return NextResponse.json(review);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Failed to update review' }, { status: 404 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);

  if (!id || isNaN(id)) {
    return NextResponse.json({ error: 'Invalid review ID' }, { status: 400 });
  }

  try {
    await prisma.review.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 404 });
  }
}
