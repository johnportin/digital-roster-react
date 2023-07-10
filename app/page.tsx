'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex max-w-2xl m-auto min-h-screen flex-col items-center p-24 gap-4 text-center">
      <h1 className="text-7xl">Digi-Roster</h1>
      <h2 className="text-2xl">A modern solution for an acient problem</h2>
      <p className="text-md">
        Digi-Roster enables anyone to track attendance for school courses,
        event, or whatever you need!
      </p>
      <div className="flex flex-row gap-4">
        <Button onClick={() => router.push('/getting-started')}>
          Getting Started
        </Button>
        <Button onClick={() => router.push('/dashboard')}>Dashboard</Button>
      </div>
    </main>
  );
}
