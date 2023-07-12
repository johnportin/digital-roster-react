import { prisma } from '@/prisma/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const res = await prisma.course.findMany();
  return NextResponse.json(res);
}
