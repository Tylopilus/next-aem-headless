import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { HeroModel } from '../components/HeroModel';
import { TextModel } from '../components/TextModel';
import { landingPageQuery } from '../queries/landingpagequery';
import { graphQLClient } from '../utils/graphqlClient';
import { AllFragmentModels, LandingpageModel, QueryType } from '../utils/types';

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
  const data = await graphQLClient.request<QueryType>(landingPageQuery);
  if (data) {
    return { props: { data: data.landingpageList.items[1] } };
  }
  return { props: { data: null } };
};

export const SectionResolver = ({
  section,
}: {
  section: AllFragmentModels;
}) => {
  switch (section.__typename) {
    case 'HeroModel':
      return <HeroModel section={section} />;
    case 'TextModel':
      return <TextModel section={section} />;
    default:
      return <div>{section.__typename}</div>;
  }
};
