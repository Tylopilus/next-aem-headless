import type { InferGetServerSidePropsType } from 'next';
import { SectionResolver } from '../components/SectionResolver';
import { landingPageQuery } from '../queries/landingpagequery';
import { graphQLClient } from '../utils/graphqlClient';
import { LandingPageQuery } from '../utils/types';

const Home = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (!data || !data.sections) {
    return <div>error while getting Data</div>;
  }
  return (
    <>
      {data.sections.map((section) => {
        return <SectionResolver section={section} key={section._path} />;
      })}
    </>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const data = await graphQLClient.request<LandingPageQuery>(landingPageQuery);
  if (data) {
    return { props: { data: data.landingpageList.items[1] } };
  }
  return { props: { data: null } };
};
