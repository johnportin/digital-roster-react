import { getBaseUrl } from '@/lib/utils';

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

const Page: React.FC<PageProps> = async ({
  params,
}: {
  params: { course: string };
}) => {
  console.log(params);
  const course = await getData(params.course);
  console.log(course);

  return (
    <div>
      <div>param: {params.course}</div>
      <div key={course.id}>
        <div>name: {course.name}</div>
        <div>description: {course.description}</div>
        <div>slug: {course.slug}</div>
      </div>
      {}
    </div>
  );
};

export default Page;
