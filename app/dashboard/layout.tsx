'use client';

import { getBaseUrl } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import { Course } from '@prisma/client';

async function getUserData(userId: string) {
  const baseURL = getBaseUrl();
  const res = await fetch(`${baseURL}/api/user/${userId}`);

  if (!res?.ok) {
    console.log('failed to fetch data');
    throw new Error('failed to fetch data');
  }
  return res.json();
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  return (
    <section className="flex flex-row h-full">
      <div className="w-48 h-full border-solid border-2">
        <SideBar />
      </div>
      {children}
    </section>
  );
}

function SideBar() {
  const { data: session, status } = useSession();
  const { data, error, isLoading } = useSWR(
    // `/api/user/${session?.user?.id}`,
    // '/api/user',
    '/api/user/353dffd5-8a67-481e-92bf-45622f4bb0c1',
    fetcher
  );
  console.log(data);
  return (
    <div>
      {data?.courses?.map((course: Course) => {
        return (
          <div key={course.id}>
            <p>{course.name}</p>
          </div>
        );
      })}
    </div>
  );
}
