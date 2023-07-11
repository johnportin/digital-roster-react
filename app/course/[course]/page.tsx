interface PageProps {
  params: {
    course: string;
  };
}

const Page: React.FC<PageProps> = ({
  params,
}: {
  params: { course: string };
}) => {
  console.log(params);
  return <div>course: {params.course}</div>;
};

export default Page;
