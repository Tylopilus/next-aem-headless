import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { HeroModel } from '../components/HeroMode';
import { TextModel } from '../components/TextModel';
import { landingPageQuery } from '../queries/landingpagequery';
import { graphQLClient } from '../utils/graphqlClient';

const Home: NextPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log(data);
  return (
    <>
      {data.sections.map((section: any) => {
        return <SectionResolver section={section} key={section._path} />;
      })}
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  console.log(context.resolvedUrl);
  const data = await graphQLClient.request(landingPageQuery);
  return {
    props: {
      data:
        data.landingpageList &&
        data.landingpageList.items.find((item: any) => item.slug === '/'),
    },
  };
};

export const SectionResolver = ({ section }: { section: any }) => {
  switch (section.__typename) {
    case 'HeroModel':
      return <HeroModel section={section} />;
    case 'TextModel':
      return <TextModel section={section} />;
    default:
      return <div>{section.__typename}</div>;
  }
};
