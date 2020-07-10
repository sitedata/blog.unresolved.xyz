import React from 'react';
import Head from 'next/head';
import { getPosts } from '../lib/contentful';
import { PostDetail } from '../components/PostDetail';

export default function Slug({ post }) {
  return (
    <div className="container">
      <Head>
        <title>
          {post.title}
          {' '}
          - blog.unresolved.xyz
        </title>
        <meta name="description" content={post.body} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <PostDetail post={post} />
      </main>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const post = (await getPosts({ 'fields.slug': params.slug }))[0];

  return { props: { post: post.fields } };
}

export async function getStaticPaths() {
  const posts = await getPosts();
  const paths = posts.map((post) => ({ params: { slug: post.fields.slug } }));

  return {
    paths,
    fallback: false,
  };
}
