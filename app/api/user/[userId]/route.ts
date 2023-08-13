'use server';

import { prisma } from '@/prisma/db';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  console.log('HIT /api/user/[userId]/route.ts GET');
  const userId = params.userId;
  console.log('params: ', params);
  console.log('userId: ', userId);

  try {
    const res = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        courses: {
          select: {
            id: true,
            name: true,
            code: true,
            description: true,
            User: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true,
              },
            },
          },
        },
      },
    });
    return NextResponse.json(res);
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}
