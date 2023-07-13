import { prisma } from '@/prisma/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { courseSlug: string } }
) {
  const courseSlug = params.courseSlug; // 'a', 'b', or 'c'
  console.log('slug: ', courseSlug);

  try {
    const data = await prisma.course.findUnique({
      where: {
        slug: courseSlug,
      },
      select: {
        name: true,
        description: true,
        slug: true,
        code: true,
      },
    });
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}
