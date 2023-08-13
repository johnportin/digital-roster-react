'use server';

import { getBaseUrl } from '@/lib/utils';
import { prisma } from '@/prisma/db';
import { Course, User } from '@prisma/client';

interface PageProps {
  params: {
    course: string;
  };
}

async function getData(courseSlug: string) {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/course/${courseSlug}`);

  if (!res?.ok) {
    console.log('failed to fetch data');
    throw new Error('failed to fetch data');
  }
  return res.json();
}

const Page: React.FC<PageProps> = async ({
  params,
}: {
  params: { course: string };
}) => {
  const { course } = params;
  console.log('***params:', params);
  const currentCourse = await getData(course);
  console.log('currentCourse:', currentCourse);

  return currentCourse ? (
    <div>
      <div key={currentCourse.id}>
        <div>name: {currentCourse.name}</div>
        <div>description: {currentCourse.description}</div>
        <div>slug: {currentCourse.slug}</div>
        {currentCourse?.User?.map((user: User) => {
          return (
            <div key={user.id}>
              <div>name: {user.name}</div>
            </div>
          );
        })}
      </div>
      {}
    </div>
  ) : (
    <div>failed to fetch data</div>
  );
};

export async function generateStaticParams() {
  const baseUrl = getBaseUrl();
  console.log('***baseURL:', baseUrl);
  const courses = await fetch(`${baseUrl}/api/course/`).then((res) =>
    res.json()
  );
  console.log('***courses:', courses);
  return courses.map((course: Course) => ({
    courseSlug: course.slug,
  }));
}

export default Page;
