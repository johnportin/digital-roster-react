'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Navbar
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <>
      <pre>{JSON.stringify(session?.user)}</pre>
      {/* <pre>{session?.id}</pre> */}
      <NavigationMenu>
        <NavigationMenuList>
          {session ? (
            <NavigationMenuItem>
              <Button variant="secondary" onClick={() => signOut()}>
                Log Out
              </Button>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem>
              <Button variant="secondary" onClick={() => signIn()}>
                Log In
              </Button>
            </NavigationMenuItem>
          )}
          <NavigationMenuItem>
            <Button onClick={() => router.push('/getting-started')}>
              Getting Started
            </Button>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Button onClick={() => router.push('/dashboard')}>Dashboard</Button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <main className="flex max-w-2xl m-auto min-h-screen flex-col items-center p-24 gap-4 text-center">
        <h1 className="text-7xl">Digital-Roster</h1>
        <h2 className="text-2xl">A modern solution for an acient problem</h2>
        <p className="text-md">
          Digi-Roster enables anyone to track attendance for school courses,
          event, or whatever you need!
        </p>
      </main>
    </>
  );
}
