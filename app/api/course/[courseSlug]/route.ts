import { prisma } from '@/prisma/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { courseSlug: string } }
) {
  const courseSlug = params.courseSlug;
  console.log('slug: ', courseSlug);

  try {
    const data = await prisma.course.findUnique({
      where: {
        slug: courseSlug,
      },
      select: {
        id: true,
        name: true,
        description: true,
        slug: true,
        User: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}
