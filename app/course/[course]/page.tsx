import { getBaseUrl } from '@/lib/utils';

interface PageProps {
  params: {
    course: string;
  };
}

async function getData() {
  const res = await fetch('../../api/course/');

  if (!res.ok) {
    throw new Error('Something went wrong');
  }

  return res.json();
}

const Page: React.FC<PageProps> = async ({
  params,
}: {
  params: { course: string };
}) => {
  const courses = await getData();
  console.log(params);
  console.log(courses);

  return (
    <div>
      <div>param: {params.course}</div>
      {courses.map((course: any) => {
        return (
          <div key={course.id}>
            <div>{course.name}</div>
            <div>{course.description}</div>
            <div>{course.slug}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Page;
