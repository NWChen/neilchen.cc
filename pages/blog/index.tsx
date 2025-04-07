import { Container, Typography } from "@mui/material";
import { GetStaticProps } from "next/types";
import React from "react";
import Header from "../../components/Header";
import Posts from "../../components/Posts";
import { PostProps } from "../../lib/post";
import { getMarkdownPosts } from '../../lib/getMarkdownPosts';

export default function Blog({ posts }: { posts: PostProps[] }) {
  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h1" gutterBottom>
          Latest Posts
        </Typography>
        <Posts posts={posts} />
      </Container>
    </>
  );
}

export const getStaticProps = (async () => {
  const posts = await getMarkdownPosts({ preview: true });
  return {
    props: { posts: posts.filter((post) => post.metadata?.slug != 'about') }
  }
}) satisfies GetStaticProps<{ posts: PostProps[] }>;
