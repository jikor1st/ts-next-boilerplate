import type { NextPage } from 'next';
import { dehydrate, QueryClient } from 'react-query';

import Seo from '@/extendsComponents/Seo';
import { useExample, fetchExample, EXAMPLE_QUERY } from '@/hooks/api';

const Home: NextPage = () => {
  const { isLoading, error, data } = useExample();
  if (isLoading) return <div>Loading</div>;
  if (error) return <div>An Error has occurred</div>;
  return (
    <>
      <Seo
        siteName="Home"
        description="Next Js Boilerplates Site"
        keywords={['next js', 'boilerplates']}
      />
      <div>
        <h1>Home</h1>
        <p>My name is {data?.name}</p>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(EXAMPLE_QUERY, fetchExample);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default Home;
