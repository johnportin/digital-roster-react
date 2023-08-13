'use server';

import { prisma } from '@/prisma/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  console.log('HIT /api/user/route.ts GET');
  const res = await prisma.user.findMany();
  return NextResponse.json(res);
}
