import { getBaseUrl } from '@/lib/utils';
import { Course } from '@prisma/client';

interface PageProps {
  params: {
    course: string;
  };
}

async function getData(courseSlug: string) {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/course/${courseSlug}`);

  if (!res.ok) {
    console.log('failed to fetch data');
    return { message: 'failed to fetch data' };
  }
  return res.json();
}

export async function generateStaticParams() {
  const baseUrl = getBaseUrl();
  const courses = await fetch(`${baseUrl}/api/course`).then((res) =>
    res.json()
  );

  return courses.map((course: Course) => ({
    slug: course.slug,
  }));
}

const Page: React.FC<PageProps> = async ({
  params,
}: {
  params: { course: string };
}) => {
  console.log(params);
  const course = await getData(params.course);
  console.log(course);

  return course ? (
    <div>
      <div>param: {params.course}</div>
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

export default Page;
