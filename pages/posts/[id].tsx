import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Head from 'next/head';
import DateComponent from '../../components/date'; // Renamed Date to DateComponent to avoid conflict with built-in Date
import utilStyles from '../../styles/utils.module.css';

interface PostProps {
  postData: {
    title: string;
    date: string;
    contentHtml: string;
  };
}

export default function Post({ postData }: PostProps) {
  return (
    <Layout home={""}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <DateComponent dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
