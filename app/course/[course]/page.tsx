'use server';

import { getBaseUrl } from '@/lib/utils';
import { prisma } from '@/prisma/db';
import { Course } from '@prisma/client';

interface PageProps {
  params: {
    courseSlug: string;
  };
}

async function getData(courseSlug: string) {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/course/${courseSlug}`);

  if (!res.ok) {
    console.log('failed to fetch data');
    throw new Error('failed to fetch data');
  }
  return res.json();
}

const Page: React.FC<PageProps> = async ({
  params,
}: {
  params: { courseSlug: string };
}) => {
  const { courseSlug } = params;

  console.log(params);
  const course = await getData(courseSlug);
  console.log(course);

  return course ? (
    <div>
      <div key={course.id}>
        <div>name: {course.name}</div>
        <div>description: {course.description}</div>
        <div>slug: {course.slug}</div>
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
  // const courses = await prisma.course.findMany();
  const courses = await fetch(`${baseUrl}/api/course/`).then((res) =>
    res.json()
  );
  console.log('***courses:', courses);
  return courses.map((course: Course) => ({
    courseSlug: course.slug,
  }));
}

export default Page;
